<script lang="ts">
	import { enhance } from "$app/forms";
	import icon from '$lib/assets/lock_in.svg';

	let {form} = $props();

	type FormAction = 'login' | 'register';
	let action: FormAction = $state(form?.action as FormAction || 'login');

	// Registration form state
	let password = $state('');
	let confirmPassword = $state('');
	let dateOfBirth = $state('');
</script>

<div
	class="flex h-screen w-full flex-col items-center justify-center bg-gray-950 px-6 text-gray-200"
>
	<img src={icon} alt="Lock In" class="h-20 mb-6 w-auto invert" />

	<div class="flex">
		<button
			class:bg-indigo-600={action === 'login'}
			class:bg-gray-800={action !== 'login'}
			class="rounded-l-lg px-6 py-3 font-semibold focus:outline-none"
			onclick={() => (action = 'login')}
		>
			Login
		</button>
		<button
			class:bg-indigo-600={action === 'register'}
			class:bg-gray-800={action !== 'register'}
			class="rounded-r-lg px-6 py-3 font-semibold focus:outline-none"
			onclick={() => (action = 'register')}
		>
			Register
		</button>
	</div>

	<div>
		{#if action === 'login'}
			<form class="mt-8 w-80 space-y-6" method="POST" action="?/login" use:enhance>
				<div>
					<label for="email" class="sr-only">Email address</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Email address"
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Password"
					/>
				</div>
				<div>
					<button
						type="submit"
						class="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					>
						Login
					</button>
				</div>
			</form>
		{:else}
			<form class="mt-8 w-80 space-y-4" method="POST" action="?/register" use:enhance>
				<div>
					<label for="reg-name" class="sr-only">Full name</label>
					<input
						id="reg-name"
						name="name"
						type="text"
						required
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Full name"
					/>
				</div>

				<div>
					<label for="reg-email" class="sr-only">Email address</label>
					<input
						id="reg-email"
						name="email"
						type="email"
						required
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Email address"
					/>
				</div>

				<div>
					<label for="reg-password" class="sr-only">Password</label>
					<input
						id="reg-password"
						name="password"
						type="password"
						bind:value={password}
						required
						minlength="8"
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Password (min 8 chars)"
					/>
				</div>

				<div>
					<label for="reg-confirm" class="sr-only">Confirm password</label>
					<input
						id="reg-confirm"
						name="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						required
						minlength="8"
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Confirm password"
					/>
				</div>

				{#if confirmPassword && password !== confirmPassword}
					<p class="text-sm text-red-400">Passwords do not match.</p>
				{/if}

				<div>
					<label for="reg-dob" class="sr-only">Date of birth</label>
					<input
						id="reg-dob"
						name="dob"
						type="date"
						bind:value={dateOfBirth}
						required
						class="w-full rounded-md bg-gray-800 px-3 py-2 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="Date of birth"
					/>
				</div>

				<!-- Must be at least 13. Must be 21 or younger to earn prizes -->
				{#if dateOfBirth}
					{#if new Date().getFullYear() - new Date(dateOfBirth).getFullYear() < 13}
						<p class="text-sm text-red-400">You must be at least 13 years old to register.</p>
					{:else if new Date().getFullYear() - new Date(dateOfBirth).getFullYear() > 21}
						<p class="text-sm text-yellow-400">
							Only high school students who are 21 or younger can earn prizes. Access to certain
							features may be restricted.
						</p>
					{/if}
				{/if}

				<div>
					<button
						type="submit"
						class="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					>
						Register
					</button>
				</div>
			</form>
		{/if}
	</div>

	{#if form?.message}
		<p
			class="mt-4 text-center text-sm"
			class:text-green-400={form.success}
			class:text-red-400={!form.success}
		>
			{form.message}
		</p>
	{/if}
</div>
