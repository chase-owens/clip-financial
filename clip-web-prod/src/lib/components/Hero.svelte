<script lang="ts">
	import type { HeroContent } from '../../../../shared/types/RootContent';

	const { hero }: { hero: HeroContent } = $props();
</script>

<section class="overflow-hidden px-6 py-16">
	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
		<div>
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
				{hero.eyebrow}
			</p>

			<h1 class="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] text-slate-950 md:text-7xl">
				{hero.title}
			</h1>

			<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
				{hero.subtitle}
			</p>

			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href={hero.primaryCta.href}
					class="rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
				>
					{hero.primaryCta.label}
				</a>

				<a
					href={hero.secondaryCta.href}
					class="rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 hover:border-slate-400"
				>
					{hero.secondaryCta.label}
				</a>
			</div>
		</div>

		<div class="relative">
			<div class="absolute -inset-4 rounded-[2.5rem] bg-blue-600/10 blur-2xl"></div>

			<div class="relative rounded-4xl bg-slate-950 p-8 text-white shadow-2xl">
				<p class="font-bold text-blue-300">Common issues we fix</p>

				<ul class="mt-6 space-y-4 text-slate-200">
					{#each hero.commonIssues as point}
						<li class="flex gap-3">
							<span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400"></span>
							<span>{point}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
