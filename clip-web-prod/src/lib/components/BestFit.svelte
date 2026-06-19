<script lang="ts">
	import type { BestFitContent } from '../../../../shared/types/RootContent';

	const { bestFit }: { bestFit: BestFitContent } = $props();
</script>

<section class="px-6 py-16">
	<div class="mx-auto max-w-7xl rounded-4xl bg-slate-950 p-8 text-white shadow-2xl md:p-12">
		<div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
			<div>
				<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
					{bestFit.eyebrow}
				</p>

				<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
					{bestFit.title}
				</h2>

				<p class="mt-6 text-lg leading-8 text-slate-300">
					{bestFit.description}
				</p>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				{#each bestFit.items as bestFitItem}
					<div class="rounded-3xl border border-white/10 bg-white/8 p-6">
						<p class="text-3xl font-black text-blue-300">01</p>
						<p class="mt-3 font-bold text-white">{bestFitItem.title}</p>
						<p class="mt-3 text-sm leading-6 text-slate-300">
							{bestFitItem.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
