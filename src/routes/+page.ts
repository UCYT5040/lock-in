import { getDonations, getOrganization } from "$lib/hcbAPI";

export async function load() {
    return {
        hcb: {
            organization: await getOrganization(),
            donations: await getDonations()
        }
    };
}