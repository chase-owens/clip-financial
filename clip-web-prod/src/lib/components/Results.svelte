<script lang="ts">
	import type { ResultsContent } from '../../../../shared/types/RootContent';

	const { results }: { results: ResultsContent } = $props();
</script>

<section class="bg-slate-50 px-6 py-16">
	<div class="mx-auto max-w-7xl">
		<div class="max-w-3xl">
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
				{results.eyebrow}
			</p>

			<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
				{results.title}
			</h2>

			<p class="mt-5 text-lg leading-8 text-slate-600">
				{results.description}
			</p>
		</div>

		<div class="mt-12 grid gap-8 lg:grid-cols-2">
			<div class="rounded-4xl border border-red-100 bg-white p-8 shadow-sm">
				<p class="text-sm font-bold uppercase tracking-[0.12em] text-red-500">Before</p>

				<ul class="mt-6 space-y-4">
					{#each results.before as beforeStateLabel}
						<li class="flex gap-3">
							<span class="font-bold text-red-500">×</span>
							<span class="text-slate-700">
								{beforeStateLabel}
							</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="rounded-4xl border border-green-100 bg-white p-8 shadow-sm">
				<p class="text-sm font-bold uppercase tracking-[0.12em] text-green-600">After</p>

				<ul class="mt-6 space-y-4">
					{#each results.after as afterStateLabel}
						<li class="flex gap-3">
							<span class="text-success">✓</span>
							<span class="text-slate-700">
								{afterStateLabel}
							</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
