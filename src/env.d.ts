import type { User } from '$lib/types/appwrite';
import type { Models } from 'node-appwrite';

declare global {
	namespace App {
		interface Locals {
			user:
				| {
						approved: boolean;
						fraudulent: boolean;
						data: User;
						admin: boolean;
						name: string;
						id: string;
						valid: boolean;
			    }
				| undefined;
		}
	}
}

export {};
