<script lang="ts">
	let {
		imageSrc,
		imageAlt,
		title,
		hours
	}: {
		imageSrc: string;
		imageAlt: string;
		title: string;
		hours: number;
	} = $props();
</script>

<div class="flex w-64 flex-col overflow-hidden rounded-lg shadow-lg mx-4">
	<img src={imageSrc} alt={imageAlt} class="max-h-64 w-full object-cover" />
	<div class="bg-black/70 p-4 backdrop-blur-sm text-white">
		<h3 class="mb-1 text-center text-xl font-semibold">{title}</h3>
		<p class="text-center text-sm text-gray-300">~{hours} Hours Studying</p>
	</div>
</div>
