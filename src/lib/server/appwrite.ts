import { Client } from 'node-appwrite';
import { appwriteConfig } from './appwriteConfig';

export const serverClient = new Client()
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setKey(appwriteConfig.apiKey);

export function getUserClient(session: string) {
	return new Client()
		.setEndpoint(appwriteConfig.endpoint)
		.setProject(appwriteConfig.projectId)
		.setSession(session);
}

export function createUserClient() {
	return new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);
}
