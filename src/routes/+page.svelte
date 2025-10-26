<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Document, LockClosed, UserGroup } from '@steeze-ui/heroicons';
</script>

<div class="h-screen w-full overflow-y-auto bg-gray-900 text-gray-200 antialiased">
	<header
		class="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-gray-900 to-gray-900 pt-12 pb-32"
	>
		<div class="container mx-auto max-w-5xl px-6 text-center">
			<div
				class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-500/20"
			>
				<Icon src={LockClosed} style="solid" class="h-20 w-20 text-indigo-300" />
			</div>

			<h1 class="text-6xl font-extrabold tracking-tight text-white md:text-8xl">LOCK IN</h1>
			<h2 class="mt-4 text-3xl font-semibold tracking-tight text-indigo-300 md:text-4xl">
				Winter Break 2025-2026
			</h2>
			<p class="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
				Join a student-run program to keep you sharp, focused, and motivated. Daily assignments,
				community, and prizes.
			</p>

			<div>
				<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
					This year, Lock In will be available for students attending <span
						class="font-semibold text-white">Wauconda High School</span
					> in Wauconda, IL.
				</p>

				<p class="text-md mx-auto mt-4 max-w-2xl leading-relaxed text-gray-400 md:text-lg">
					Interested in bringing Lock In to your school?<br /><span
						class="cursor-not-allowed text-gray-300 underline"
						>Contact us <span class="italic">(coming soon, check back later)</span>!</span
					>
				</p>
			</div>

			<div class="mt-12">
				<a
					href="#about"
					class="shadow-glow rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-500"
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
				The complete list of subjects has not yet been finalized, but we anticipate including, at the least, <span class="font-semibold text-white">European History</span> and <span class="font-semibold text-white">Psychology</span>.
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
	</main>

	<footer class="border-t border-gray-800 py-12 text-center">
		<h3 class="mb-4 text-2xl font-bold text-gray-300">Lock In</h3>
		<p class="text-gray-500">A student-run initiative for winter break study motivation.</p>
	</footer>
</div>
