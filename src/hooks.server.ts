import { createUserClient } from '$lib/server/appwrite';
import { Account, AppwriteException } from 'node-appwrite';

// Does not apply to subpaths
const noAuthPaths = ['/', '/auth'];

// Applies to subpaths (for example, /admin/settings)
const adminPaths = ['/admin']; // Must have admin label
const lessonDesignerPaths = ['/lab']; // Must have lesson-designer label

export async function handle({ event, resolve }) {
	try {
		const client = createUserClient();
		client.setSession(event.cookies.get('session') || '');
		const account = new Account(client);
		const user = await account.get();
		event.locals.user = {
			approved: user.labels.includes('approved'),
			denied: user.labels.includes('denied'),
			lessonDesigner: user.labels.includes('lesson-designer'),
			admin: user.labels.includes('admin'),
			name: user.name,
			id: user.$id
		};
	} catch (e) {
		if (!(e instanceof AppwriteException && e.type == 'general_unauthorized_scope')) {
			console.error('Unexpected error fetching user account:', e);
		}
		event.locals.user = undefined;
	}

	// For users with the denied label, redirect to '/denied'
	if (event.url.pathname == '/denied') {
		if (!event.locals.user?.denied) {
			return Response.redirect(new URL('/', event.url), 303);
		}
	} else {
		if (event.locals.user?.denied) {
			return Response.redirect(new URL('/denied', event.url), 303);
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

	// If the path is in lessonDesignerPaths, require lesson-designer label
	if (lessonDesignerPaths.some((path) => event.url.pathname.startsWith(path))) {
		if (!event.locals.user?.lessonDesigner) {
			return new Response('Forbidden', { status: 403 });
		}
	}

	return resolve(event);
}
