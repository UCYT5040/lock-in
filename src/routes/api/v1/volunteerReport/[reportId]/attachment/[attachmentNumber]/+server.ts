import { appwriteConfig } from '$lib/server/appwriteConfig.js';
import { getRow } from '$lib/server/database.js';
import { getFile, getFileForView } from '$lib/server/storage.js';

export const GET = async ({ params, locals }) => {
    const { reportId, attachmentNumber } = params;

    // Validate parameters
    if (!reportId || !attachmentNumber) {
        return new Response('Missing reportId or attachmentNumber', { status: 400 });
    }

    // Ensure user either created the report or is an admin
    let report;
    try {
        report = await getRow({
            tableId: appwriteConfig.databases.main.tables.volunteerReports,
            rowId: reportId
        });
    } catch (error) {
        return new Response('Report not found', { status: 404 });
    }

    if (report.volunteer.$id !== locals.user?.id && !locals.user?.admin) {
        return new Response('Forbidden', { status: 403 });
    }

    // Retrieve the attachment URL
    const attachments = report.documents || [];
    const attachmentIndex = parseInt(attachmentNumber, 10);

    if (isNaN(attachmentIndex) || attachmentIndex < 0 || attachmentIndex >= attachments.length) {
        return new Response('Attachment not found', { status: 404 });
    }

    const attachmentID = attachments[attachmentIndex];

    let fileInfo;
    let data: ArrayBuffer;
    try {
        fileInfo = await getFile({
            bucketId: appwriteConfig.storage.volunteerDocuments,
            fileId: attachmentID
        });
        data = await getFileForView({
            bucketId: appwriteConfig.storage.volunteerDocuments,
            fileId: attachmentID
        });
    } catch (error) {
        return new Response('Error retrieving attachment', { status: 500 });
    }

    return new Response(data, {
        status: 200,
        headers: {
            'Content-Type': fileInfo.mimeType,
            'Content-Disposition': `attachment; filename="attachment_${attachmentNumber}_${fileInfo.name}"`
        }
    });
};