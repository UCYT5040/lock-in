import { createUserClient } from '$lib/server/appwrite';
import { appwriteConfig } from '$lib/server/appwriteConfig';
import { createRow, getRow } from '$lib/server/database';
import { Account, AppwriteException } from 'node-appwrite';
import type { User, FraudStatus } from '$lib/types/appwrite.d.ts';

// Does not apply to subpaths
const noAuthPaths = ['/', '/auth'];

// Applies to subpaths (for example, /admin/settings)
const adminPaths = ['/admin']; // Must have admin label

export async function handle({ event, resolve }) {
	try {
		const client = createUserClient();
		client.setSession(event.cookies.get('session') || '');
		const account = new Account(client);
		const user = await account.get();
		let userData: User;
		try {
			userData = await getRow({
				tableId: appwriteConfig.databases.main.tables.users,
				rowId: user.$id
			}) as unknown as User;
		} catch (e) {
			if (e instanceof AppwriteException && e.type == 'row_not_found') {
				// Create the missing user row
				try {
					userData = await createRow({
						tableId: appwriteConfig.databases.main.tables.users,
						data: {
							approved: false // Appwrite requires at least some data to be set. Other values will use defaults
						},
						rowId: user.$id
					}) as unknown as User;
				} catch (createError) {
					console.error('Error creating user row for new user:', createError);
					throw createError;
				}
			} else {
				console.error('Unexpected error fetching user row:', e);
				throw e;
			}
		}
		event.locals.user = {
			approved: userData.approved,
			fraudulent: userData.fraudStatus === "confirmed" as FraudStatus,
			data: userData,
			admin: user.labels.includes('admin'),
			name: user.name,
			id: user.$id,
			valid: false // (set below)
		};
		event.locals.user.valid = event.locals.user.approved && !event.locals.user.fraudulent;
	} catch (e) {
		if (!(e instanceof AppwriteException && e.type == 'general_unauthorized_scope')) {
			console.error('Unexpected error fetching user account:', e);
		}
		event.locals.user = undefined;
	}

	// For users that have been marked as fraudulent, send to '/fraud'
	if (event.locals.user?.fraudulent) {
		if (event.url.pathname != '/fraud') {
			return Response.redirect(new URL('/fraud', event.url), 303);
		} else {
			return resolve(event);
		}
	}
	

	// For users without the approved label, redirect to '/approval'
	if (event.url.pathname == '/approval') {
		if (event.locals.user?.approved) {
			return Response.redirect(new URL('/', event.url), 303);
		}
	} else {
		if (event.locals.user && !event.locals.user.approved) {
			return Response.redirect(new URL('/approval', event.url), 303);
		}
	}

	// Unless the path is in noAuthPaths, require authentication
	if (!noAuthPaths.includes(event.url.pathname)) {
		if (!event.locals.user) {
			return new Response('Unauthorized', { status: 401 });
		}
	}

	// If the user is authenticated and on '/auth', redirect to '/'
	if (event.url.pathname == '/auth' && event.locals.user) {
		return Response.redirect(new URL('/', event.url), 303);
	}

	// If the path is in adminPaths, require admin label
	if (adminPaths.some((path) => event.url.pathname.startsWith(path))) {
		if (!event.locals.user?.admin) {
			return new Response('Forbidden', { status: 403 });
		}
	}

	return resolve(event);
}
