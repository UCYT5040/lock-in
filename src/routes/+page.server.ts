import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createRow } from '$lib/server/database';
import { appwriteConfig } from '$lib/server/appwriteConfig';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const role = data.get('role');
		const gradYear = data.get('gradYear');
		const classes = data.get('classes');
		const struggles = data.get('struggles');

		// Validation errors object
		const errors: Record<string, string> = {};

		// Validate email
		if (!email || typeof email !== 'string') {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
		}

		// Validate role
		const validRoles = ['student', 'parent', 'educator', 'other'];
		if (!role || typeof role !== 'string') {
			errors.role = 'Please select your role';
		} else if (!validRoles.includes(role)) {
			errors.role = 'Invalid role selected';
		}

		// Validate conditional fields for students and parents
		if (role === 'student' || role === 'parent') {
			// Validate graduation year
			const validGradYears = ['2027', '2028', '2029', '2030', 'other'];
			if (!gradYear || typeof gradYear !== 'string') {
				errors.gradYear = 'Graduation year is required for students and parents';
			} else if (!validGradYears.includes(gradYear)) {
				errors.gradYear = 'Invalid graduation year';
			}

			// Validate course level
			const validCourseLevels = ['remedial', 'regular', 'honors'];
			if (!classes || typeof classes !== 'string') {
				errors.classes = 'Course level is required for students and parents';
			} else if (!validCourseLevels.includes(classes)) {
				errors.classes = 'Invalid course level';
			}

			// Struggles is optional, but validate if provided
			if (struggles && typeof struggles === 'string' && struggles.length > 200) {
				errors.struggles = 'Please keep your response under 200 characters';
			}
		}

		// If there are validation errors, return them
		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				data: {
					email: typeof email === 'string' ? email : '',
					role: typeof role === 'string' ? role : '',
					gradYear: typeof gradYear === 'string' ? gradYear : '',
					classes: typeof classes === 'string' ? classes : '',
					struggles: typeof struggles === 'string' ? struggles : ''
				}
			});
		}

        try {
            await createRow({
                tableId: appwriteConfig.databases.main.tables.interestSurveryResponses,
                data: {
                    email: email as string,
                    role: role as string,
                    gradYear: gradYear as string | null,
                    classes: classes as string | null,
                    struggles: struggles as string | null
                }
            });
        } catch (error) {
            console.error('Error creating interest survey response:', error);
            return fail(500, {
                errors: { general: 'An error occurred while submitting your response. Please try again later.' },
            });
        }
		

		// Return success
		return {
			success: true,
			message: 'Thanks for your interest in Lock In! We will be in touch.'
		};
	}
} satisfies Actions;
