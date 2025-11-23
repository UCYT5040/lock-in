import { serverClient } from '$lib/server/appwrite';
import { Users } from 'node-appwrite';

const users = new Users(serverClient);

export async function getUser(options: { userId: string }) {
	try {
		return await users.get({ userId: options.userId });
	} catch (error) {
		console.error(`Error fetching user ${options.userId}:`, error);
		throw error;
	}
}
