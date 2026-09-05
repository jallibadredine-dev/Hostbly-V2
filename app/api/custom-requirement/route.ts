import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { query } from '@/lib/pg';
import { sendEmail } from '@/lib/email';
import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export interface TaskItem {
    id: string;
    title: string;
    requirement: string;
    email?: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    tags: string[];
    progress: number;
    progressLabel: string;
    fileName?: string;
    fileUrl?: string;
    createdAt: string;
    updatedAt: string;
}

const REQUIRED_PASSWORD = 'Mounikai@123';

// In-memory store fallback for instant response / standalone environments
let inMemoryTasks: TaskItem[] = [];

async function ensureTable() {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS custom_tasks (
                id VARCHAR(255) PRIMARY KEY,
                title TEXT NOT NULL,
                requirement TEXT NOT NULL,
                email VARCHAR(255),
                status VARCHAR(50) NOT NULL DEFAULT 'To Do',
                tags JSONB DEFAULT '[]'::jsonb,
                progress INT DEFAULT 0,
                progress_label VARCHAR(100) DEFAULT 'Not started yet',
                file_name VARCHAR(255),
                file_url TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Add file_url column if not present
        await query("ALTER TABLE custom_tasks ADD COLUMN IF NOT EXISTS file_url TEXT;");

        // Delete pre-seeded demo tasks from DB if present
        await query("DELETE FROM custom_tasks WHERE id IN ('task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6', 'task-7', 'task-8')");
    } catch (e) {
        console.warn('[Custom Tasks DB Warning] Error ensuring custom_tasks table:', e);
    }
}

// GET: Return all tasks
export async function GET() {
    try {
        await ensureTable();
        const res = await query('SELECT * FROM custom_tasks ORDER BY created_at ASC');
        if (res && res.rows && res.rows.length > 0) {
            const tasks: TaskItem[] = res.rows.map((row: any) => ({
                id: row.id,
                title: row.title,
                requirement: row.requirement,
                email: row.email || undefined,
                status: row.status,
                tags: Array.isArray(row.tags) ? row.tags : (typeof row.tags === 'string' ? JSON.parse(row.tags) : []),
                progress: row.progress || 0,
                progressLabel: row.progress_label || 'Not started yet',
                fileName: row.file_name || undefined,
                fileUrl: row.file_url || undefined,
                createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : (row.created_at || new Date().toISOString()),
                updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : (row.updated_at || new Date().toISOString())
            }));
            inMemoryTasks = tasks;
            return NextResponse.json({ success: true, tasks });
        }
    } catch (e) {
        console.warn('[Custom Tasks API] DB query error, using in-memory store fallback:', e);
    }

    return NextResponse.json({ success: true, tasks: inMemoryTasks });
}

// POST: Create a new requirement task (Automatically in 'In Progress')
export async function POST(req: Request) {
    try {
        let title = '';
        let requirement = '';
        let email = '';
        let tags: string[] = ['CUSTOM REQ'];
        let fileName: string | undefined = undefined;

        const contentType = req.headers.get('content-type') || '';

        let fileUrl: string | undefined = undefined;

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            
            // Honeypot check
            const honeypot = formData.get('honeypot') as string;
            if (honeypot && honeypot.trim() !== '') {
                return NextResponse.json({ success: true, message: 'Task submitted.' });
            }

            requirement = (formData.get('requirement') as string) || '';
            title = (formData.get('title') as string) || (requirement.length > 50 ? requirement.slice(0, 50) + '...' : requirement) || 'New Custom Requirement';
            email = (formData.get('email') as string) || '';

            const tagsRaw = formData.get('tags');
            if (tagsRaw) {
                try {
                    tags = JSON.parse(tagsRaw as string);
                } catch {
                    tags = [tagsRaw as string];
                }
            }

            const inputUrl = (formData.get('fileUrl') as string) || (formData.get('attachmentUrl') as string);
            if (inputUrl && inputUrl.trim() !== '') {
                fileUrl = inputUrl.trim();
                fileName = (formData.get('fileName') as string) || fileUrl.split('/').pop()?.split('?')[0] || fileUrl;
            }

            const file = formData.get('file') as File | null;
            if (file && file.size > 0 && !fileUrl) {
                fileName = file.name;
                try {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    const mimeType = file.type || 'application/octet-stream';
                    fileUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
                } catch (e) {
                    console.warn('[Custom Tasks API] Error processing file buffer:', e);
                }
            }
        } else {
            const body = await req.json();
            title = body.title || (body.requirement ? body.requirement.slice(0, 50) + '...' : 'New Custom Requirement');
            requirement = body.requirement || '';
            email = body.email || '';
            if (Array.isArray(body.tags) && body.tags.length > 0) {
                tags = body.tags;
            }
            if (body.fileUrl || body.attachmentUrl) {
                fileUrl = (body.fileUrl || body.attachmentUrl).trim();
                fileName = body.fileName || fileUrl.split('/').pop()?.split('?')[0] || fileUrl;
            }
        }

        if (!requirement || requirement.trim().length < 5) {
            return NextResponse.json({ error: 'Requirement details must be provided.' }, { status: 400 });
        }

        const newTask: TaskItem = {
            id: `task-${Date.now()}-${uuidv4().slice(0, 6)}`,
            title: title.trim(),
            requirement: requirement.trim(),
            email: email.trim() || undefined,
            status: 'To Do',
            tags: tags.length > 0 ? tags : ['REQUIREMENT'],
            progress: 0,
            progressLabel: 'Not started yet',
            fileName,
            fileUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to DB
        try {
            await ensureTable();
            await query(`
                INSERT INTO custom_tasks (id, title, requirement, email, status, tags, progress, progress_label, file_name, file_url, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `, [
                newTask.id,
                newTask.title,
                newTask.requirement,
                newTask.email || null,
                newTask.status,
                JSON.stringify(newTask.tags),
                newTask.progress,
                newTask.progressLabel,
                newTask.fileName || null,
                newTask.fileUrl || null,
                newTask.createdAt,
                newTask.updatedAt
            ]);
        } catch (e) {
            console.warn('[Custom Tasks API] Error inserting into DB, updating in-memory:', e);
        }

        // Add to inMemory store
        inMemoryTasks.unshift(newTask);

        // Optional email alert to admin if email settings exist
        try {
            const settings = await db.getSettings();
            const adminEmail = settings.metadata?.smtp?.from || process.env.SMTP_FROM || settings.metadata?.smtp?.user;
            if (adminEmail) {
                sendEmail({
                    to: adminEmail,
                    subject: `[Kanban Task] New Requirement Submitted: ${newTask.title}`,
                    html: `<p>A new custom requirement task was added to <strong>In Progress</strong>.</p>
                           <p><strong>Title:</strong> ${newTask.title}</p>
                           <p><strong>Requirement:</strong> ${newTask.requirement}</p>
                           <p><strong>Client Email:</strong> ${newTask.email || 'Guest User'}</p>`
                }).catch(() => {});
            }
        } catch {}

        return NextResponse.json({ success: true, task: newTask });
    } catch (error: any) {
        console.error('[Custom Tasks API] POST Exception:', error);
        return NextResponse.json({ error: 'Failed to create task.' }, { status: 500 });
    }
}

// PUT: Update task status (Requires password for In Progress, Review, Done)
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { taskId, newStatus, password } = body;

        if (!taskId || !newStatus) {
            return NextResponse.json({ error: 'taskId and newStatus are required.' }, { status: 400 });
        }

        const validStatuses: TaskItem['status'][] = ['To Do', 'In Progress', 'Review', 'Done'];
        if (!validStatuses.includes(newStatus)) {
            return NextResponse.json({ error: 'Invalid status provided.' }, { status: 400 });
        }

        // Password requirement check for status changes to 'In Progress', 'Review', 'Done'
        const protectedStatuses = ['In Progress', 'Review', 'Done'];
        if (protectedStatuses.includes(newStatus)) {
            if (password !== REQUIRED_PASSWORD) {
                return NextResponse.json({ 
                    error: 'Incorrect password. The task was not moved.' 
                }, { status: 401 });
            }
        }

        // Calculate standard progress metrics based on status
        let progress = 0;
        let progressLabel = 'Not started yet';
        if (newStatus === 'In Progress') {
            progress = 50;
            progressLabel = '50% completed';
        } else if (newStatus === 'Review') {
            progress = 85;
            progressLabel = 'Under Review';
        } else if (newStatus === 'Done') {
            progress = 100;
            progressLabel = 'Task finished';
        }

        const updatedAt = new Date().toISOString();

        // Update DB
        try {
            await ensureTable();
            await query(`
                UPDATE custom_tasks
                SET status = $1, progress = $2, progress_label = $3, updated_at = $4
                WHERE id = $5
            `, [newStatus, progress, progressLabel, updatedAt, taskId]);
        } catch (e) {
            console.warn('[Custom Tasks API] Error updating DB:', e);
        }

        // Update in-memory
        const idx = inMemoryTasks.findIndex(t => t.id === taskId);
        if (idx !== -1) {
            inMemoryTasks[idx] = {
                ...inMemoryTasks[idx],
                status: newStatus,
                progress,
                progressLabel,
                updatedAt
            };
        }

        return NextResponse.json({ 
            success: true, 
            task: idx !== -1 ? inMemoryTasks[idx] : { id: taskId, status: newStatus, progress, progressLabel } 
        });

    } catch (error: any) {
        console.error('[Custom Tasks API] PUT Exception:', error);
        return NextResponse.json({ error: 'Failed to update task status.' }, { status: 500 });
    }
}

// DELETE: Delete a task (Requires password Mounikai@123)
export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { taskId, password } = body;

        if (!taskId) {
            return NextResponse.json({ error: 'taskId is required.' }, { status: 400 });
        }

        if (password !== REQUIRED_PASSWORD) {
            return NextResponse.json({ 
                error: 'Incorrect password. Task was not deleted.' 
            }, { status: 401 });
        }

        // Delete from DB
        try {
            await ensureTable();
            await query('DELETE FROM custom_tasks WHERE id = $1', [taskId]);
        } catch (e) {
            console.warn('[Custom Tasks API] Error deleting from DB:', e);
        }

        // Delete from in-memory store
        inMemoryTasks = inMemoryTasks.filter(t => t.id !== taskId);

        return NextResponse.json({ success: true, message: 'Task deleted successfully.' });
    } catch (error: any) {
        console.error('[Custom Tasks API] DELETE Exception:', error);
        return NextResponse.json({ error: 'Failed to delete task.' }, { status: 500 });
    }
}
