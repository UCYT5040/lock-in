import { error, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { createRow, listRows } from "$lib/server/database"
import { appwriteConfig } from "$lib/server/appwriteConfig"
import { Query } from "node-appwrite"
import type { VolunteerReport } from "$lib/types/appwrite"
import { createFile } from "$lib/server/storage"
import { ReviewStatus } from "$lib/appwriteEnums"

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user?.valid) {
        return error(403, 'You do not have permission to view this page.');
    }

    let hourReports = await listRows({
        tableId: appwriteConfig.databases.main.tables.volunteerReports,
        queries: [
            Query.equal('volunteer', locals.user.id),
            Query.select(['*', 'reviewer.*', 'volunteer.*']),
            Query.orderDesc('$updatedAt')
        ]
    }) as unknown as VolunteerReport[];


    return {
        hourReports
    };
}

export const actions = {
    submitReport: async ({ request, locals }) => {
        if (!locals.user?.valid) {
            return error(403, 'You do not have permission to perform this action.');
        }

        const data = await request.formData();
        const hours = data.get('totalHours');
        const description = data.get('description');
        const documents = data.getAll('documents');

        if (!hours || isNaN(Number(hours)) || Number(hours) <= 0) {
            return { success: false, message: 'Please enter a valid number of hours.' }
        }

        // Convert and round hours to two decimal places
        const roundedHours = Math.round(Number(hours) * 100) / 100;
        if (roundedHours > 24) {
            return { success: false, message: 'You cannot report more than 24 hours in a single report.' }
        }

        if (!description || description.toString().trim().length === 0) {
            return { success: false, message: 'Please enter a description of your volunteer work.' }
        }

        // If supporting documents are provided, upload them
        // Only accept 5 documents max
        let documentIds: string[] = [];
        if (documents.length > 0) {
            const docsToUpload = documents.slice(0, 5);
            // TODO: Perform multiple uploads in parallel
            for (const doc of docsToUpload) {
                if (doc && doc instanceof File) {
                    const uploadedFile = await createFile({
                        bucketId: appwriteConfig.storage.volunteerDocuments,
                        blob: doc,
                        filename: `${locals.user.id}-${Date.now()}-${doc.name}`
                    });
                    documentIds.push(uploadedFile.$id);
                }
            }
        }

        // Create the volunteer report entry
        await createRow({
            tableId: appwriteConfig.databases.main.tables.volunteerReports,
            data: {
                volunteer: locals.user.id,
                totalHours: roundedHours,
                description,
                documents: documentIds,
                reviewStatus: ReviewStatus.UNDER_REVIEW
            }
        });

        return { success: true, message: 'Volunteer hours reported successfully.' }
    }
} satisfies Actions;