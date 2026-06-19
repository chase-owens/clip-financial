<script lang="ts">
	import type { WhatWeDoContent } from '../../../../shared/types/RootContent';

	const { whatWeDo }: { whatWeDo: WhatWeDoContent } = $props();
</script>

<section class="bg-white px-6 py-16">
	<div class="mx-auto max-w-7xl">
		<div class="max-w-3xl">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
				{whatWeDo.eyebrow}
			</p>

			<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
				{whatWeDo.title}
			</h2>

			<p class="mt-5 text-lg leading-8 text-slate-600">
				{whatWeDo.description}
			</p>
		</div>

		<div class="mt-10 grid gap-5 md:grid-cols-3">
			{#each whatWeDo.items as item}
				<article class="rounded-3xl border border-slate-200 bg-slate-50 p-7">
					<div
						class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white"
					>
						→
					</div>

					<h3 class="text-xl font-black text-slate-950">{item.title}</h3>

					<p class="mt-4 leading-7 text-slate-600">{item.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>
