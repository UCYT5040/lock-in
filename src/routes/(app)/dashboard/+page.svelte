<script lang="ts">
	import DashboardCard from '$lib/components/DashboardCard.svelte';
	import DashboardGrid from '$lib/components/DashboardGrid.svelte';
</script>

<div class="px-8">
	<h1 class="preset-typo-headline mb-8">Dashboard</h1>

	<DashboardGrid>
		<DashboardCard
			title="Available Volunteer Tasks"
			description="Browse and sign up for volunteer tasks to contribute your time and skills."
			linkText="View Tasks"
			linkHref="/volunteer"
		/>
	</DashboardGrid>
</div>
