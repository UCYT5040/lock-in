import { serverClient } from '$lib/server/appwrite';
import { Storage } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

const storage = new Storage(serverClient);

export async function createFile(options: {
	bucketId: string;
	blob: Blob;
	filename: string;
}) {
	const file = InputFile.fromBuffer(options.blob, options.filename);
	try {
		return await storage.createFile({
			bucketId: options.bucketId,
			fileId: 'unique()',
			file: file
		});
	} catch (error) {
		console.error(`Error creating file in bucket ${options.bucketId}:`, error);
		throw error;
	}
}

export async function getFile(options: { bucketId: string; fileId: string }) {
	try {
		return await storage.getFile({
			bucketId: options.bucketId,
			fileId: options.fileId
		});
	} catch (error) {
		console.error(`Error fetching file ${options.fileId} from bucket ${options.bucketId}:`, error);
		throw error;
	}
}

export async function getFileForView(options: { bucketId: string; fileId: string }) {
	try {
		return await storage.getFileView({
			bucketId: options.bucketId,
			fileId: options.fileId
		});
	} catch (error) {
		console.error(`Error fetching file ${options.fileId} from bucket ${options.bucketId}:`, error);
		throw error;
	}
}
