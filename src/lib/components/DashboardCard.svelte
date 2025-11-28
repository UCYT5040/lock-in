<script lang="ts">
	let { title, description, linkText, linkHref } = $props();
</script>

<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-6 shadow-lg">
	<h2 class="preset-typo-title mb-3">{title}</h2>
	<p class="mb-4 text-gray-400">
		{description}
	</p>
	<a
		href={linkHref}
		class="inline-block rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
	>
		{linkText}
	</a>
</div>
