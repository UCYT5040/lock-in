<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		AcademicCap,
		UserGroup,
		Gift,
		CurrencyDollar,
		ArrowRight,
		CheckCircle,
		BookOpen,
		ChartBar
	} from '@steeze-ui/heroicons';
	import lockInLogo from '$lib/assets/lock_in.svg';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	// --- Form State ---
	let formData = $state({
		email: '',
		role: '',
		gradYear: '',
		classes: '',
		struggles: ''
	});

	// Reactive check for student/parent role to show extra fields
	let showAcademicFields = $derived(formData.role === 'student' || formData.role === 'parent');

	// --- Donation Configuration ---
	const donationBaseUrl = 'https://hcb.hackclub.com/donations/start/lock-in';
	const utmParams = '?utm_source=website&utm_medium=landing_page';
	const donationLink = `${donationBaseUrl}${utmParams}`;

	let { data, form } = $props();

	const finances = $derived({
		raised: data.hcb.organization.balances.total_raised / 100,
		donors: data.hcb.donations.length
	});
</script>

<svelte:head><script src="https://js.hcaptcha.com/1/api.js" async defer></script></svelte:head>

<!-- Layout Wrapper -->
<div class="min-h-screen bg-indigo-50 font-sans dark:bg-surface-900">
	<!-- Navigation -->
	<nav class="sticky top-0 z-50 bg-white/70 shadow-md backdrop-blur-md dark:bg-surface-900/70">
		<div class="container mx-auto flex items-center justify-between p-4">
			<img src={lockInLogo} alt="Lock In Logo" class="h-12 w-auto" />
			<a
				href={donationLink}
				target="_blank"
				class="btn rounded-xl bg-rose-500 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-rose-600"
			>
				Donate Now
			</a>
		</div>
	</nav>

	<!-- Hero Section -->
	<header
		class="relative container mx-auto flex flex-col items-center gap-8 px-4 py-20 text-center md:py-32"
	>
		<!-- Animated background orbs -->
		<div
			class="animate-float absolute top-20 left-10 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl"
		></div>
		<div
			class="animate-float absolute top-40 right-10 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl"
			style="animation-delay: 1s;"
		></div>
		<div
			class="animate-float absolute bottom-20 left-1/2 h-80 w-80 rounded-full bg-lime-400/10 blur-3xl"
			style="animation-delay: 2s;"
		></div>

		<div class="relative z-10 flex flex-col items-center gap-8">
			<h1
				class="max-w-4xl h1 font-bold tracking-tight text-gray-900 dark:text-white"
				style="font-family: system-ui, -apple-system, sans-serif;"
			>
				Your study group, <br class="md:hidden" />
				<span class="bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
					upgraded.
				</span>
			</h1>
			<p class="max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300">
				Study together, go deeper than your textbooks, and earn real rewards for showing up.
			</p>
			<div class="mt-4 flex flex-col gap-4 sm:flex-row">
				<a
					href="#survey"
					class="btn rounded-2xl bg-indigo-600 btn-lg text-white shadow-xl shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-700"
				>
					Join the Waitlist
					<Icon src={ArrowRight} class="ml-2 h-5 w-5" />
				</a>
				<a
					href="#about"
					class="btn rounded-2xl border-2 border-indigo-600 bg-white btn-lg text-indigo-600 transition-all hover:bg-indigo-50 dark:bg-surface-800 dark:text-indigo-400 dark:hover:bg-surface-700"
				>
					Learn More
				</a>
			</div>
		</div>
	</header>

	<!-- Features Grid -->
	<section id="about" class="container mx-auto px-4 py-20">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Feature 1 -->
			<div
				class="flex flex-col gap-4 card rounded-2xl border-l-4 border-indigo-600 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:bg-surface-800"
			>
				<div class="w-fit rounded-xl bg-indigo-600 p-4 text-white shadow-lg">
					<Icon src={BookOpen} class="h-10 w-10" />
				</div>
				<h3 class="h3 font-bold text-gray-900 dark:text-white">Deep Learning</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Forget generic LMS interfaces. Our proprietary software is designed for mastery, offering
					depth that Google Classroom and Canvas simply can't match.
				</p>
			</div>

			<!-- Feature 2 -->
			<div
				class="flex flex-col gap-4 card rounded-2xl border-l-4 border-rose-500 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:bg-surface-800"
			>
				<div class="w-fit rounded-xl bg-rose-500 p-4 text-white shadow-lg">
					<Icon src={Gift} class="h-10 w-10" />
				</div>
				<h3 class="h3 font-bold text-gray-900 dark:text-white">Real Rewards</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Motivation matters. Earn points for study streaks and collaboration. Redeem them for gift
					cards, textbooks, electronics, and essential school supplies.
				</p>
			</div>

			<!-- Feature 3 -->
			<div
				class="flex flex-col gap-4 card rounded-2xl border-l-4 border-lime-500 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:bg-surface-800"
			>
				<div class="w-fit rounded-xl bg-lime-600 p-4 text-white shadow-lg">
					<Icon src={UserGroup} class="h-10 w-10" />
				</div>
				<h3 class="h3 font-bold text-gray-900 dark:text-white">Community Chapters</h3>
				<p class="text-gray-600 dark:text-gray-300">
					Don't study alone. Join a local chapter at your school or connect with our national
					network to build a study group that actually works.
				</p>
			</div>
		</div>
	</section>

	<!-- Social Proof / Chapters -->
	<section class="bg-white py-20 dark:bg-surface-800">
		<div class="container mx-auto px-4 text-center">
			<h2 class="mb-8 h2 font-bold text-gray-900 dark:text-white">Join the Movement</h2>
			<div class="mb-12 flex flex-wrap justify-center gap-4">
				<div class="chip rounded-xl bg-indigo-600 px-6 py-3 text-white shadow-md">
					📍 National Chapter
				</div>
				<div class="chip rounded-xl bg-rose-500 px-6 py-3 text-white shadow-md">
					📚 Northern Illinois Chapter
				</div>
				<div
					class="chip rounded-xl border-2 border-lime-500 bg-lime-50 px-6 py-3 text-lime-700 shadow-md transition-all hover:border-lime-600 hover:shadow-lg dark:border-lime-400 dark:bg-lime-900/30 dark:text-lime-300 dark:hover:border-lime-300"
				>
					+ Start Your Own
				</div>
			</div>
			<div
				class="mx-auto max-w-3xl card rounded-2xl border-4 border-green-300 bg-white p-8 shadow-xl dark:border-green-700 dark:bg-surface-800"
			>
				<div class="flex items-start gap-4">
					<Icon src={CheckCircle} class="h-10 w-10 shrink-0 text-green-500" />
					<div class="text-left">
						<h4 class="h4 font-bold text-gray-900 dark:text-white">Why 501(c)(3)?</h4>
						<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
							Lock In is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3)
							nonprofit (EIN: 81-2908499). This means your donations are tax-deductible and our
							operations are held to the highest standard of transparency.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Transparency Section -->
	<section class="container mx-auto px-4 py-20">
		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			<div class="space-y-6">
				<h2 class="flex items-center gap-3 h2 font-bold text-gray-900 dark:text-white">
					<Icon src={ChartBar} class="h-10 w-10 text-indigo-600" />
					Transparent Finances
				</h2>
				<p class="text-lg text-gray-700 dark:text-gray-300">
					We believe non-profits should operate in the open. You can view every dollar raised and
					spent in real-time on HCB.
				</p>

				<!-- Financial Stats Mockup -->
				<div class="grid grid-cols-2 gap-4">
					<div
						class="card rounded-2xl border-4 border-green-500 bg-green-50 p-6 text-center shadow-lg dark:border-green-600 dark:bg-green-900/30"
					>
						<div class="text-4xl font-bold text-green-600 dark:text-green-400">
							${finances.raised.toLocaleString()}
						</div>
						<div
							class="mt-2 text-sm font-semibold tracking-wider text-green-700 uppercase dark:text-green-300"
						>
							Raised
						</div>
					</div>
					<div
						class="card rounded-2xl border-4 border-indigo-500 bg-indigo-50 p-6 text-center shadow-lg dark:border-indigo-600 dark:bg-indigo-900/30"
					>
						<div class="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
							{finances.donors}
						</div>
						<div
							class="mt-2 text-sm font-semibold tracking-wider text-indigo-700 uppercase dark:text-indigo-300"
						>
							Donors
						</div>
					</div>
				</div>

				<a
					href="https://hcb.hackclub.com/lock-in/"
					target="_blank"
					class="btn w-full rounded-xl border-2 border-indigo-600 bg-white text-indigo-600 shadow-lg transition-all hover:bg-indigo-50 md:w-auto dark:bg-surface-800 dark:text-indigo-400 dark:hover:bg-surface-700"
				>
					View Live Finances on HCB
					<Icon src={ArrowRight} class="ml-2 h-4 w-4" />
				</a>
			</div>

			<!-- Donation Call to Action -->
			<div class="space-y-6 card rounded-3xl bg-rose-500 p-10 text-center text-white shadow-2xl">
				<Icon src={CurrencyDollar} class="mx-auto h-20 w-20 drop-shadow-lg" />
				<h3 class="h3 font-bold">Support Student Success</h3>
				<p class="text-white/90">
					Your contribution funds textbook scholarships, server costs for our platform, and prizes
					that motivate students to keep learning.
				</p>
				<a
					href={donationLink}
					target="_blank"
					class="btn w-full rounded-2xl bg-white text-lg font-bold text-rose-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
				>
					Donate via HCB
				</a>
				<p class="text-xs text-white/75">Secure processing via The Hack Foundation.</p>
			</div>
		</div>
	</section>

	<!-- Interest Survey Section -->
	<section id="survey" class="bg-indigo-50 py-20 dark:bg-surface-900">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-2xl space-y-8">
				<div class="space-y-4 text-center">
					<h2 class="h2 font-bold text-gray-900 dark:text-white">Get Notified</h2>
					<p class="text-gray-700 dark:text-gray-300">
						Join the waiting list for launch. Tell us a bit about yourself so we can tailor the
						experience.
					</p>
				</div>

				{#if form?.success}
					<!-- Success Message -->
					<div
						class="space-y-6 card rounded-3xl border-4 border-green-500 bg-white p-10 text-center shadow-2xl dark:border-green-600 dark:bg-surface-800"
					>
						<Icon src={CheckCircle} class="mx-auto h-20 w-20 text-green-500" />
						<h3 class="h3 font-bold text-gray-900 dark:text-white">You're on the list!</h3>
						<p class="text-gray-700 dark:text-gray-300">
							{form.message}
						</p>
						<a
							href="#about"
							class="btn rounded-2xl border-2 border-indigo-600 bg-white text-indigo-600 transition-all hover:bg-indigo-50 dark:bg-surface-800 dark:text-indigo-400 dark:hover:bg-surface-700"
						>
							Learn More About Lock In
						</a>
					</div>
				{:else}
					<!-- Form -->
					<form
						method="POST"
						class="space-y-6 card rounded-3xl border-4 border-indigo-300 bg-white p-10 shadow-2xl dark:border-indigo-600 dark:bg-surface-800"
						use:enhance
					>
						<!-- Email -->
						<label class="label">
							<span>Email Address</span>
							<input
								class="input border-2 border-gray-300 dark:border-surface-600"
								type="email"
								name="email"
								bind:value={formData.email}
								placeholder="you@example.com"
								required
							/>
						</label>

						<!-- Role Selection -->
						<label class="label">
							<span>I am a...</span>
							<select
								class="select border-2 border-gray-300 dark:border-surface-600"
								name="role"
								bind:value={formData.role}
								required
							>
								<option value="" disabled selected>Select your role</option>
								<option value="student">High School Student</option>
								<option value="parent">Parent</option>
								<option value="educator">Educator</option>
								<option value="other">Other</option>
							</select>
						</label>

						<!-- Conditional Fields -->
						{#if showAcademicFields}
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2" transition:slide|local>
								<label class="label">
									<span>Graduation Year</span>
									<select
										class="select border-2 border-gray-300 dark:border-surface-600"
										name="gradYear"
										bind:value={formData.gradYear}
									>
										<option value="2027">2027</option>
										<option value="2028">2028</option>
										<option value="2029">2029</option>
										<option value="2030">2030</option>
										<option value="other">Other</option>
									</select>
								</label>

								<label class="label">
									<span>Course Level</span>
									<select
										class="select border-2 border-gray-300 dark:border-surface-600"
										name="classes"
										bind:value={formData.classes}
									>
										<option value="" disabled selected>Typical course load</option>
										<option value="remedial">Remedial / Support</option>
										<option value="regular">Regular / College Prep</option>
										<option value="honors">Honors / AP / IB / Dual</option>
									</select>
								</label>
							</div>

							<label class="label" transition:slide|local>
								<span>What subject is toughest for you? (Optional)</span>
								<input
									class="input border-2 border-gray-300 dark:border-surface-600"
									type="text"
									name="struggles"
									bind:value={formData.struggles}
									placeholder="e.g., Calculus, Physics, History..."
								/>
							</label>
						{/if}

						<div>
							<div class="h-captcha" data-sitekey="9c305eb8-9e1e-4b14-83a6-0a7abe1468f2"></div>
							{#if form?.errors?.captcha}
								<p class="mt-2 text-sm text-red-600 dark:text-red-400">{form.errors.captcha}</p>
							{/if}
						</div>

						<button
							type="submit"
							class="btn w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-indigo-700"
						>
							Lock In
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 py-16 text-white">
		<div class="container mx-auto space-y-6 px-4 text-center">
			<img src={lockInLogo} alt="Lock In Logo" class="mx-auto h-8 w-auto invert" />
			<div class="flex justify-center gap-6 text-sm font-medium">
				<button type="button" class="transition-colors hover:text-indigo-400">Privacy</button>
				<button type="button" class="transition-colors hover:text-rose-400">Terms</button>
				<a href="mailto:team@golockin.org" class="transition-colors hover:text-lime-400">Contact</a>
			</div>
			<p class="mx-auto max-w-2xl text-xs leading-relaxed text-gray-300">
				Lock In is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3)
				nonprofit.
				<br />&copy; 2026 Lock In. All rights reserved.
			</p>
		</div>
	</footer>
</div>
