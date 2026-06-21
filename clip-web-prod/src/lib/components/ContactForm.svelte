<script lang="ts">
	import type { ContactContent } from '../../../../shared/types/RootContent';
	import { createInquiry } from '$lib/api/inquiries';

	const { contact }: { contact: ContactContent } = $props();

	let name = $state('');
  let lastName = $state('')
	let email = $state('');
	let company = $state('');
	let software = $state('');
	let message = $state('');

	let isSubmitting = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	async function handleSubmit() {
		isSubmitting = true;
		successMessage = '';
		errorMessage = '';

		try {
			await createInquiry({
				name,
        lastName,
				email,
				company,
				software,
				message
			});

			name = '';
      lastName = '';
			email = '';
			company = '';
			software = '';
			message = '';

			successMessage = 'Thanks — your request was sent.';
		} catch (error) {
			console.error(error);
			errorMessage = 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section id="contact" class="bg-white px-6 py-16">
	<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
		<div>
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">{contact.eyebrow}</p>
			<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
				{contact.title}
			</h2>
			<p class="mt-5 text-lg leading-8 text-slate-600">
				{contact.description}
			</p>
		</div>

		<form
			class="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6"
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<div class="grid gap-4 sm:grid-cols-2">
				<input
					required
					bind:value={name}
					class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
					placeholder="Name"
				/>
        <input name='lastName' hidden
					bind:value={lastName}/>
				<input
					required
					bind:value={email}
					class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
					placeholder="Email"
				/>
			</div>

			<input
				bind:value={company}
				class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
				placeholder="Company"
			/>

			<input
				bind:value={software}
				class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
				placeholder="Accounting software / payment processor"
			/>

			<textarea
				bind:value={message}
				required
				class="min-h-36 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
				placeholder="What is tedious, manual, or broken right now?"></textarea>

			<button
				type="submit"
				class="w-fit rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : contact.primaryCta}
			</button>
			{#if successMessage || errorMessage}
				<div
					class="rounded-vintage border p-4"
					style:background-color={successMessage
						? 'var(--color-success-background)'
						: 'var(--color-error-background)'}
				>
					{#if successMessage}
						<p class="font-semibold" style:color="var(--color-success)">
							{successMessage}
						</p>
					{/if}

					{#if errorMessage}
						<p class="font-semibold" style:color="var(--color-error)">
							{errorMessage}
						</p>
					{/if}
				</div>
			{/if}
		</form>
	</div>
</section>
