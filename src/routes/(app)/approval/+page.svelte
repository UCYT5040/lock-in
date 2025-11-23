<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, Wrench, QuestionMarkCircle } from '@steeze-ui/heroicons';

	let {data, form} = $props();
</script>

{#if data.needsDocument && !form?.success}
	<div
		class="flex h-screen w-full flex-col items-center justify-center bg-gray-950 px-6 text-gray-200"
	>
		<Icon
			src={Wrench}
			style="solid"
			class="mb-6 h-20 w-20 text-yellow-400"
		/>
		<span class="chip preset-filled-warning-500">Action Required</span>
		<h1 class="mb-4 text-4xl font-bold">Submit Approval Document</h1>
		<p class="max-w-xl text-center text-lg leading-relaxed text-gray-300">
			Please submit a photo of your most recent student or government-issued ID to complete
			the approval process.
		</p>
		{#if !form?.success && form?.message}
			<p class="mt-4 max-w-xl text-center text-lg leading-relaxed text-red-400 font-semibold">
				{form.message}
			</p>
		{/if}
		<form class="mt-8 w-full max-w-md space-y-6 rounded-lg bg-gray-900 p-8 shadow-xl border border-gray-800" method="POST" enctype="multipart/form-data">
			<div>
				<label for="approvalDocument" class="block text-sm font-medium text-gray-300 mb-2">
					Upload Document
				</label>
				<input
					id="approvalDocument"
					type="file"
					name="approvalDocument"
					accept="image/*,.pdf"
					required
					class="block w-full rounded-lg border-2 border-gray-700 bg-gray-800 px-4 py-3 text-gray-200 transition-colors duration-200 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
				/>
				<p class="mt-3 text-sm text-gray-400">
					Accepted formats: Images (JPG, PNG) or PDF
				</p>
			</div>
			<button
				type="submit"
				class="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
			>
				Submit Document
			</button>
		</form>
		<p class="mt-6 max-w-md text-center text-sm text-gray-400 bg-gray-900 rounded-md px-4 py-3 border border-gray-800">
			<strong class="text-gray-300">Required:</strong> Your document must include your name, grade/date of birth, and a date/year of issue/expiration
		</p>
		<details class="mt-6 w-full max-w-md rounded-lg bg-gray-900 border border-gray-800 overflow-hidden">
			<summary class="cursor-pointer px-6 py-4 font-semibold text-gray-200 hover:bg-gray-800 transition-colors duration-200 list-none flex items-center justify-between">
				<span>Why do I need to submit a document?</span>
				<Icon src={QuestionMarkCircle} class="h-6 w-6 text-gray-400" />
			</summary>
			<div class="px-6 py-4 text-gray-300 bg-gray-800/50 border-t border-gray-700 leading-relaxed">
				Lock In is only available to teenagers (ages 13-19) or high school students younger than 21. To verify eligibility, we require a valid student or government-issued ID. This helps us maintain a safe and appropriate environment for all participants.
			</div>
		</details>
		<p class="mt-6 max-w-xl text-center text-lg leading-relaxed text-gray-300">
			Having issues? Reach out to us at
			<a href="mailto:approvals@golockin.org" class="text-indigo-400 underline"
				>approvals@golockin.org</a
			>.
		</p>
	</div>
{:else}
	<div
		class="flex h-screen w-full flex-col items-center justify-center bg-gray-950 px-6 text-gray-200"
	>
		<Icon src={CheckCircle} style="solid" class="mb-6 h-20 w-20 text-violet-400" />
		<h1 class="mb-4 text-4xl font-bold">Approval Pending</h1>
	<p class="max-w-xl text-center text-lg leading-relaxed text-gray-300">
		Thank you for registering for Lock In! Your registration is currently pending approval.
	</p>
	<p class="mt-4 max-w-xl text-center text-lg leading-relaxed text-gray-300">
		Having issues? Reach out to us at
		<a href="mailto:approvals@golockin.org" class="text-indigo-400 underline"
			>approvals@golockin.org</a
		>.
	</p>
</div>
{/if}