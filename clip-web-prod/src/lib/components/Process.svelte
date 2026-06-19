<script lang="ts">
	import type { ProcessContent } from '../../../../shared/types/RootContent';

	const { process }: { process: ProcessContent } = $props();
</script>

<section id="process" class="bg-white px-6 py-20">
	<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
		<div>
			<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
				{process.eyebrow}
			</p>

			<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
				{process.title}
			</h2>

			<p class="mt-5 text-lg leading-8 text-slate-600">
				{process.description}
			</p>
		</div>

		<ol class="grid gap-4">
			{#each process.steps as step, index}
				<li class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
					<div class="flex gap-5">
						<span
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-black text-white"
						>
							{index + 1}
						</span>

						<div>
							<h3 class="font-black text-slate-950">{step.title}</h3>
							<p class="mt-2 leading-7 text-slate-600">{step.description}</p>
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
