import { appwriteConfig } from "$lib/server/appwriteConfig";
import { updateRow } from "$lib/server/database";
import { createFile } from "$lib/server/storage";
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    return {
        needsDocument: !(locals.user?.data.approvalDocumentFile)
    }
}

const documentSizeLimitMB = 10;

export const actions = {
    default: async ({ request, locals }) => {
        if (!locals.user || locals.user.approved || locals.user.data.approvalDocumentFile) {
            return {
                success: false,
                message: 'You have already submitted a document or do not have permission to submit one.'
            }
        }
        const formData = await request.formData();
        const file = formData.get('approvalDocument');
        if (!file || !(file instanceof File)) {
            return {
                success: false,
                message: 'No file uploaded.'
            }
        }
        if (file.size > documentSizeLimitMB * 1024 * 1024) {
            return {
                success: false,
                message: `File size exceeds the ${documentSizeLimitMB} MB limit.`
            }
        }
        
        try {
            const uploadedFile = await createFile({
                bucketId: appwriteConfig.storage.approvalDocuments,
                blob: file,
                filename: `${locals.user.id}-${Date.now()}-${file.name}`
            });

            // Update user's approvalDocumentFile field
            await updateRow({
                tableId: appwriteConfig.databases.main.tables.users,
                rowId: locals.user.id,
                data: {
                    approvalDocumentFile: uploadedFile.$id
                }
            });

            return {
                success: true,
                message: 'Document uploaded successfully.'
            };
        } catch (error) {
            console.error('Error during document upload or database update:', error);
            return {
                success: false,
                message: 'An error occurred while uploading the document. Please try again later.'
            };
        }
    }
} satisfies Actions;