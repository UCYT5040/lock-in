import { serverClient } from '$lib/server/appwrite';
import { Account, type Models } from 'node-appwrite';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createRow } from '$lib/server/database';
import { appwriteConfig } from '$lib/server/appwriteConfig';

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString().trim();
		if (!email || !password) {
			return fail(400, {
				action: 'login',
				success: false,
				message: 'Email and password are required.'
			});
		}

		const account = new Account(serverClient); // This may seem dangerous, but is necessary to create the initial
		// session (user clients can be used after login)
		let session;
		try {
			session = await account.createEmailPasswordSession({
				email: email,
				password: password
			});
		} catch (error) {
			console.error('Login error:', error);
			return fail(400, {
				action: 'login',
				success: false,
				message: 'Login failed. Please check your credentials.'
			});
		}
		console.log('Session secret: ' + session.secret);
		cookies.set('session', session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true, // Debugging only
			path: '/'
		});
		return redirect(303, '/dashboard');
	},
	register: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString().trim();
		const confirmPassword = formData.get('confirmPassword')?.toString().trim();
		const name = formData.get('name')?.toString().trim();
		const dateOfBirthRaw = formData.get('dob')?.toString().trim();
		const dateOfBirth = dateOfBirthRaw ? new Date(dateOfBirthRaw) : null;

		if (!email || !password || !confirmPassword || !name || !dateOfBirth) {
			return fail(400, {
				action: 'register',
				success: false,
				message: 'All fields are required.'
			});
		}
		if (password !== confirmPassword) {
			return fail(400, {
				action: 'register',
				success: false,
				message: 'Passwords do not match.'
			});
		}
		const account = new Account(serverClient);
		let user: Models.User;
		try {
			user = await account.create({
				userId: 'unique()',
				email: email,
				password: password,
				name: name
			});
		} catch (error) {
			console.error('Registration error:', error);
			return fail(400, {
				action: 'register',
				success: false,
				message: 'Registration failed. Please try again.'
			});
		}

		// Create a user row in the database with the DOB. Do not await: even if this fails, the user can still log in (TODO: ensure users have DOB set in a hook)
		(async () => {
			try {
				await createRow({
					tableId: appwriteConfig.databases.main.tables.users,
					data: {
						dateOfBirth: dateOfBirth
					},
					rowId: user.$id
				});
			} catch (error) {
				console.error('Error creating user row in database:', error);
			}
		})();

		// Return success, page will switch to login
		return {
			action: 'login',
			success: true,
			message: 'Registration successful. Please log in.'
		};
	}
} satisfies Actions;
