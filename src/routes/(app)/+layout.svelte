<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import icon from '$lib/assets/lock_in.svg';
</script>

<AppBar class="bg-gray-900 text-gray-200 shadow-md">
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
		</AppBar.Lead>
		<AppBar.Headline>
			<img src={icon} alt="Lock In" class="h-10 w-auto invert" />
		</AppBar.Headline>
		<AppBar.Trail>
			
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>

<div class="h-screen w-full bg-gray-950 text-gray-200 pt-12">
    <slot />
</div>