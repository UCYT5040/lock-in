<script lang="ts">
	import DashboardCard from '$lib/components/DashboardCard.svelte';
	import DashboardGrid from '$lib/components/DashboardGrid.svelte';
</script>

<div class="px-8">
	<h1 class="preset-typo-headline mb-8">Volunteer Dashboard</h1>

	<DashboardGrid>
		<DashboardCard
			title="Volunteer Hours"
			description="Track and manage your volunteer hours."
			linkText="View Hours"
			linkHref="/volunteer/hours"
		/>
	</DashboardGrid>
</div>
