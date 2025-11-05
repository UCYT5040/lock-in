<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Clock, Document, LockClosed, UserGroup } from '@steeze-ui/heroicons';

	let donateMenuOpen = $state(false);
	let pleaseDonateBoxClosed = $state(false);
	let scrollY: number = $state(0);
	let lastScrollY: number = $state(0);
	let isScrollingDown = $state(false);
	
	$effect(() => {
		if (scrollY > lastScrollY && scrollY > 100) {
			isScrollingDown = true;
		} else if (scrollY < lastScrollY) {
			isScrollingDown = false;
		}
		lastScrollY = scrollY;
	});
</script>

<svelte:window onscroll={(e) => scrollY = window.scrollY} />

{#if donateMenuOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="flex flex-col items-center gap-4">
			<iframe title="Donate to Lock In" src="https://hcb.hackclub.com/donations/start/lock-in" style="border:none;" name="donateFrame" scrolling="yes" frameborder="0" marginheight=0 marginwidth=0 height="512px" width="512px" allowfullscreen></iframe>
			<p class="mt-4 text-center text-white">
				Lock In is fiscally sponsored by The Hack Foundation (d.b.a. Hack Club), a 501(c)(3) nonprofit (EIN: 81-2908499).
				</p>
			<button
				class="mt-2 rounded-full bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-200 focus:outline-none"
				onclick={() => (donateMenuOpen = false)}
			>
				Close
			</button>
		</div>
	</div>
{/if}

{#if !pleaseDonateBoxClosed}
	<div
		class="fixed bottom-4 z-40 w-80 rounded-lg bg-primary-800 p-4 text-white shadow-lg transition-all duration-500 ease-in-out"
		style="right: {isScrollingDown ? '1rem' : '-21rem'};"
	>
		<div>
			<h4 class="text-lg font-bold">Support Lock In</h4>
			<p class="mt-1 text-sm">
				Your donations help us keep this program free and accessible for all students.
			</p>
			<p class="mt-1 text-sm">All donations are tax-deductible.</p>
		</div>
		<div class="mt-3 flex justify-end">
			<button
				class="rounded-full preset-filled-primary-500 px-4 py-2 focus:outline-none shadow-lg text-white font-semibold"
				onclick={() => (donateMenuOpen = true)}
			>
				Donate
			</button>
		</div>
		<button
			class="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
			onclick={() => (pleaseDonateBoxClosed = true)}
			aria-label="Close"
		>
			&times;
		</button>
	</div>
{/if}

<div class="w-full overflow-y-auto bg-gray-950 text-gray-200 antialiased">
	<header
		class="relative overflow-hidden bg-gradient-to-b from-surface-950 via-primary-950 to-primary-950 pt-12 pb-32"
	>
		<div class="container mx-auto max-w-5xl px-6 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-500/20"
			>
				<Icon src={LockClosed} style="solid" class="h-20 w-20 text-indigo-300" />
			</div>

			<h1 class="preset-typo-display-4 !text-white">LOCK IN</h1>
			<h2
				class="preset-typo-display-1 mt-4 flex items-center justify-center gap-4 !text-primary-contrast-light"
			>
				<Icon src={Clock} style="solid" class="h-12 w-12" />
				Winter Break 2025-2026
			</h2>
			<p class="preset-typo-body-1 mx-auto mt-8 max-w-2xl">
				Join a student-run program to keep you sharp, focused, and motivated. Daily assignments,
				community, and prizes.
			</p>

			<p class="preset-typo-body-2 mx-auto mt-4 max-w-2xl">
				Open or join a local chapter, or participate individually from anywhere in the world.
			</p>

			<div class="mt-12">
				<a
					href="#about"
					class="inline-block rounded-lg preset-filled-primary-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-primary-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
				>
					Learn More
				</a>
			</div>
		</div>
	</header>

	<main class="container mx-auto max-w-5xl space-y-24 px-6 py-20" id="about">
		<section class="grid auto-rows-fr grid-cols-1 items-center gap-12 md:grid-cols-2">
			<div class="h-full rounded-2xl bg-gray-800 p-8 shadow-xl">
				<Icon src={UserGroup} style="solid" class="mb-4 h-8 w-8 text-indigo-400" />
				<h3 class="mb-4 text-3xl font-bold text-white">Motivation</h3>
				<p class="text-lg leading-relaxed text-gray-300">
					This program is 100% student-designed and student-run. We're creating a community to hold
					each other accountable and make studying engaging.
				</p>
			</div>
			<div class="h-full rounded-2xl bg-gray-800 p-8 shadow-xl">
				<Icon src={Document} style="solid" class="mb-4 h-8 w-8 text-indigo-400" />
				<h3 class="mb-4 text-3xl font-bold text-white">Daily Missions</h3>
				<p class="text-lg leading-relaxed text-gray-300">
					Each day of the break, you'll receive a short, focused assignment (FRQs, doc analysis,
					etc.) to complete. Complete optional missions for extra points!
				</p>
			</div>
		</section>

		<section class="rounded-3xl bg-gray-800/50 p-10 text-center md:p-16" id="prizes">
			<h2 class="mb-6 text-4xl font-extrabold text-white">Win Awesome Prizes</h2>
			<p class="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300">
				We'll have prizes for both top performance and consistent participation.
			</p>

			<div class="mt-12">
				<p class="mb-8 text-xl font-semibold text-indigo-300">
					Earn <span class="text-white">points</span> for completing missions.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div class="rounded-xl bg-gray-700 p-6 shadow-lg">
					<h4 class="mb-4 text-2xl font-bold text-indigo-300">Spend Your Points</h4>
					<p class="text-gray-300">
						Use your points to enter raffles and win gift cards, merch, and other cool rewards.
					</p>
				</div>
				<div class="rounded-xl bg-gray-700 p-6 shadow-lg">
					<h4 class="mb-4 text-2xl font-bold text-indigo-300">Participation Badges</h4>
					<p class="text-gray-300">
						Every participant will receive a special badge recognizing their commitment to studying
						during the break.
					</p>
				</div>
			</div>

			<div class="mt-6">
				<p class="text-sm text-gray-500 italic">
					Prizes subject to change based on sponsorships, donations, and participant numbers.
				</p>
			</div>
		</section>

		<section class="text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-white">Subjects</h2>
			<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-300">
				Lock In will cover a variety of subjects to help you stay sharp over the break.
			</p>
			<p class="mx-auto max-w-2xl text-xl leading-relaxed text-gray-300">
				The complete list of subjects has not yet been finalized, but we anticipate including, at
				the least, <span class="font-semibold text-white">European History</span> and
				<span class="font-semibold text-white">Psychology</span>.
			</p>
		</section>

		<section class="text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-white">Are You Ready?</h2>
			<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-300">
				Full program details and sign-ups will be announced soon.
			</p>
			<div class="mx-auto max-w-lg rounded-xl bg-gray-800 p-8 shadow-xl">
				<h4 class="text-2xl font-bold text-indigo-300">Sign-Ups Opening Soon!</h4>
				<p class="mt-2 text-gray-400">Check back here for updates.</p>
			</div>
		</section>

		<section class="text-center">
			<h2 class="mb-6 text-4xl font-extrabold text-white">Volunteer Opportunities</h2>
			<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-300">
				We're always looking for passionate students, educators, and organizers to help make Lock In
				a success.
			</p>
			<p class="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-300">
				Lock In offers volunteer hour certificates for volunteers.
			</p>
			<div class="mx-auto max-w-lg rounded-xl bg-gray-800 p-8 shadow-xl">
				<h4 class="text-2xl font-bold text-indigo-300">Sign-Ups Opening Soon!</h4>
				<p class="mt-2 text-gray-400">Check back here for updates.</p>
			</div>
		</section>
	</main>

	<footer class="border-t border-gray-800 py-12 text-center">
		<h3 class="mb-4 text-2xl font-bold text-gray-300">Lock In</h3>
		<p class="text-gray-500">A student-run initiative for winter break study motivation.</p>
	</footer>
</div>
