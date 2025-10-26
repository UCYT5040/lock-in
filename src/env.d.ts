import type { Models } from "node-appwrite";

declare global {
    namespace App {
        interface Locals {
            user: {
                approved: boolean,
                denied: boolean,
                lessonDesigner: boolean,
                admin: boolean,
                name: string,
                id: string
            } | undefined;
        }
    }
}

export {};