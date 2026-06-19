<script lang="ts">
	import type { WhyClipContent } from '../../../../shared/types/RootContent';

	const { whyClip }: { whyClip: WhyClipContent } = $props();
</script>

<section class="bg-slate-50 px-6 py-16">
	<div class="mx-auto max-w-7xl">
		<div class="max-w-3xl">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
				{whyClip.eyebrow}
			</p>

			<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
				{whyClip.title}
			</h2>

			<p class="mt-5 text-lg leading-8 text-slate-600">
				{whyClip.description}
			</p>
		</div>

		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each whyClip.items as clipItem}
				<article class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
					<p class="text-sm font-bold uppercase tracking-[0.14em] text-blue-600">01</p>

					<h3 class="mt-5 text-xl font-black text-slate-950">
						{clipItem.title}
					</h3>

					<p class="mt-4 leading-7 text-slate-600">
						{clipItem.description}
					</p>
				</article>
			{/each}
		</div>
	</div>
</section>
