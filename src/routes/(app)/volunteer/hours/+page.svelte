<script lang="ts">
	import { ReviewStatus } from '$lib/appwriteEnums';

	let { data } = $props();

	let totalHours = $state(0);
	let pendingHours = $state(0);

	$effect(() => {
		totalHours = 0;
		pendingHours = 0;
		for (const report of data.hourReports) {
			if (report.reviewStatus === ReviewStatus.APPROVED) {
				totalHours += report.totalHours;
			} else if (report.reviewStatus === ReviewStatus.UNDER_REVIEW) {
				pendingHours += report.totalHours;
			}
		}
	});
</script>

<div class="flex flex-col items-center justify-center">
	<p class="preset-typo-headline mb-4">
		<strong class="text-primary-300">{totalHours}</strong> Approved Volunteer Hours
	</p>
	{#if pendingHours > 0}
		<p class="mb-8 text-lg font-medium">
			<strong class="text-warning-300">{pendingHours}</strong> Hours Pending Review
		</p>
	{/if}
</div>

<div class="flex gap-12 px-8 py-6">
	<div class="flex-1">
		<h2 class="preset-typo-title">Volunteer Reports</h2>
		<div class="mt-4 space-y-4">
			{#if data.hourReports.length > 0}
				{#each data.hourReports as report}
					<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-6 shadow-lg">
						<div class="mb-4 flex items-start justify-between">
							<div class="flex-1">
								<div class="mb-2 flex items-center gap-3">
									<span
										class="text-2xl font-bold {report.reviewStatus === ReviewStatus.CANCELED
											? 'text-gray-500 line-through'
											: 'text-primary-300'}">{report.totalHours}h</span
									>
									{#if report.reviewStatus === ReviewStatus.APPROVED}
										<span
											class="rounded-full bg-success-500/20 px-3 py-1 text-sm font-semibold text-success-300"
										>
											Approved
										</span>
									{:else if report.reviewStatus === ReviewStatus.DENIED}
										<span
											class="rounded-full bg-error-500/20 px-3 py-1 text-sm font-semibold text-error-300"
										>
											Denied
										</span>
									{:else if report.reviewStatus === ReviewStatus.CANCELED}
										<span
											class="rounded-full bg-gray-500/20 px-3 py-1 text-sm font-semibold text-gray-300"
										>
											Canceled
										</span>
									{:else}
										<span
											class="rounded-full bg-warning-500/20 px-3 py-1 text-sm font-semibold text-warning-300"
										>
											Under Review
										</span>
									{/if}
								</div>
								<p class="text-sm text-gray-400">
									Submitted: {new Date(report.$createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit'
									})}
								</p>
								{#if report.$updatedAt !== report.$createdAt}
									<p class="text-sm text-gray-400">
										Last Updated: {new Date(report.$updatedAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit'
										})}
									</p>
								{/if}
							</div>
							{#if report.reviewStatus === ReviewStatus.UNDER_REVIEW}
								<form method="POST" action="?/cancelReport" class="ml-4">
									<input type="hidden" name="reportId" value={report.$id} />
									<button
										type="submit"
										class="rounded-md bg-error-500/20 px-3 py-1 text-sm font-semibold text-error-300 transition-colors hover:bg-error-500/30"
									>
										Cancel
									</button>
								</form>
							{/if}
						</div>

						<div class="mb-3">
							<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-400 uppercase">
								Description
							</h3>
							<p class="whitespace-pre-wrap text-gray-200">{report.description}</p>
						</div>

						{#if report.documents && report.documents.length > 0}
							<div class="mb-3">
								<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-400 uppercase">
									Supporting Documents
								</h3>
								<div class="flex flex-wrap gap-2">
									<!-- TODO: Use icon over emoji -->
									{#each report.documents as docId, index}
										<a
											href="/api/v1/volunteerReport/{report.$id}/attachment/{index}"
											target="_blank"
											class="rounded bg-indigo-600/30 px-3 py-1 text-sm text-indigo-300 hover:bg-indigo-600/50"
										>
											📎 Document
										</a>
									{/each}
								</div>
							</div>
						{/if}

						{#if report.reviewer}
							<div class="mt-4 border-t border-gray-700 pt-4">
								<h3 class="mb-2 text-sm font-semibold tracking-wide text-gray-400 uppercase">
									Review Information
								</h3>
								<p class="text-sm text-gray-300">
									Reviewed by: <span class="font-medium text-gray-100">
										{report.reviewer.name || `User ${report.reviewer.$id.slice(0, 8)}`}
									</span>
								</p>
								{#if report.reviewerComments}
									<div class="mt-2 rounded-md bg-gray-900/50 p-3">
										<p class="mb-1 text-sm font-semibold text-gray-400">Reviewer Comments:</p>
										<p class="text-sm whitespace-pre-wrap text-gray-200">
											{report.reviewerComments}
										</p>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			{:else}
				<div class="rounded-lg border border-dashed border-gray-700 bg-gray-800/30 p-8 text-center">
					<p class="text-gray-400">No volunteer hour reports submitted yet.</p>
					<p class="mt-2 text-sm text-gray-500">
						Submit your first report using the form on the right.
					</p>
				</div>
			{/if}
		</div>
	</div>
	<form class="flex-1" method="POST" action="?/submitReport" enctype="multipart/form-data">
		<h2 class="preset-typo-title">New Report</h2>
		<div class="mt-4 flex flex-col space-y-4">
			<label for="totalHours" class="font-medium">Total Hours</label>
			<input
				id="totalHours"
				name="totalHours"
				type="number"
				step="0.01"
				min="0.01"
				required
				class="rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			/>

			<label for="description" class="font-medium">Description</label>
			<textarea
				id="description"
				name="description"
				maxlength="2048"
				rows="6"
				required
				placeholder="Describe your volunteer activities..."
				class="resize-vertical rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
			></textarea>
			<p class="text-sm text-gray-400">Maximum 2048 characters</p>

			<label for="documents" class="font-medium">Supporting Documents (Optional)</label>
			<input
				id="documents"
				name="documents"
				type="file"
				multiple
				accept="image/*,.pdf,.doc,.docx"
				class="rounded-md bg-gray-800 px-3 py-2 text-gray-200 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
			/>
			<p class="text-sm text-gray-400">
				Upload up to 5 files. Max 5GB per file. Accepted: images, PDF, DOC
			</p>

			<button
				type="submit"
				class="mt-4 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none"
			>
				Submit Report
			</button>
		</div>
	</form>
</div>
