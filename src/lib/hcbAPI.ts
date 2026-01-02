import { PUBLIC_HCB_ORG_ID } from '$env/static/public';

const endpoint = 'https://hcb.hackclub.com/api/v3/';

export async function getOrganization() {
	const result = await fetch(`${endpoint}organizations/${PUBLIC_HCB_ORG_ID}`);
	if (!result.ok) {
		throw new Error(`Error fetching organization: ${result.statusText}`);
	}
	return await result.json();
}

export async function getDonations() {
	const result = await fetch(`${endpoint}organizations/${PUBLIC_HCB_ORG_ID}/donations`);
	if (!result.ok) {
		throw new Error(`Error fetching donations: ${result.statusText}`);
	}
	return await result.json();
}
