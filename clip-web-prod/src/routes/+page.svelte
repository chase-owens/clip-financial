<script lang="ts">
	import type { RootContent } from "../../../shared/types/RootContent";

const {data}: {data: RootContent} = $props();
</script>

<svelte:head>
	<title>Clip Financial</title>
	<meta
		name="description"
		content="Finance operations consulting for accountants, payment workflows, reconciliation, and reporting systems."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
			<a href="/" class="text-xl font-black tracking-tight text-slate-950">Clip Financial</a>

			<nav class="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
				<a href="#services" class="hover:text-slate-950">Services</a>
				<a href="#process" class="hover:text-slate-950">Process</a>
				<a href="#contact" class="hover:text-slate-950">Contact</a>
			</nav>

			<a
				href="#contact"
				class="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white md:inline-flex"
			>
				Book Review
			</a>
		</div>
	</header>

	<main>
		<section class="overflow-hidden px-6 py-16 ">
			<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
				<div>
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
						{data.hero.eyebrow}
					</p>

					<h1 class="mt-5 max-w-5xl text-5xl font-black tracking-[-0.06em] text-slate-950 md:text-7xl">
						{data.hero.title}
					</h1>

					<p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
						{data.hero.subtitle}
					</p>

					<div class="mt-8 flex flex-wrap gap-4">
						<a
							href={data.hero.primaryCta.href}
							class="rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
						>
						{data.hero.primaryCta.label}
						</a>

						<a
							href={data.hero.secondaryCta.href}
							class="rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 hover:border-slate-400"
						>
							{data.hero.secondaryCta.label}
						</a>
					</div>
				</div>

				<div class="relative">
					<div class="absolute -inset-4 rounded-[2.5rem] bg-blue-600/10 blur-2xl"></div>

					<div class="relative rounded-4xl bg-slate-950 p-8 text-white shadow-2xl">
						<p class="font-bold text-blue-300">Common issues we fix</p>

						<ul class="mt-6 space-y-4 text-slate-200">
							{#each data.hero.commonIssues as point}
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

		<section id="services" class="px-6 py-16">
			<div class="mx-auto max-w-7xl">
				<div class="max-w-3xl">
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">{data.services.eyebrow}</p>
					<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
						{data.services.title}
					</h2>
					<p class="mt-5 text-lg leading-8 text-slate-600">
						{data.services.description}
					</p>
				</div>

				<div class="mt-10 grid gap-5 md:grid-cols-3">
					{#each data.services.items as service}
						<article class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
							<h3 class="text-xl font-black text-slate-950">{service.title}</h3>
							<p class="mt-4 leading-7 text-slate-600">{service.description}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

    <section class="bg-white px-6 py-16">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {data.whatWeDo.eyebrow}
          </p>

          <h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {data.whatWeDo.title}
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-600">
						{data.whatWeDo.description}
					</p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          {#each data.whatWeDo.items as item}
            <article class="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white">
                →
              </div>

              <h3 class="text-xl font-black text-slate-950">{item.title}</h3>

              <p class="mt-4 leading-7 text-slate-600">{item.description}</p>
            </article>
          {/each}
        </div>
      </div>
    </section>

		<section id="process" class="bg-white px-6 py-20">
      <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {data.process.eyebrow}
          </p>

          <h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {data.process.title}
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-600">
            {data.process.description}
          </p>
        </div>

        <ol class="grid gap-4">
          {#each data.process.steps as step, index}
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


     <section class="bg-slate-50 px-6 py-16">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {data.whyClip.eyebrow}
          </p>

          <h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {data.whyClip.title}
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-600">
           {data.whyClip.description}
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
        {#each data.whyClip.items as clipItem}
          <article class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p class="text-sm font-bold uppercase tracking-[0.14em] text-blue-600">
              01
            </p>

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

    <section class="px-6 py-16">
      <div class="mx-auto max-w-7xl rounded-4xl bg-slate-950 p-8 text-white shadow-2xl md:p-12">
        <div class="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-300">
              {data.bestFit.eyebrow}
            </p>

            <h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">
              {data.bestFit.title}
            </h2>

            <p class="mt-6 text-lg leading-8 text-slate-300">
              {data.bestFit.description}
            </p>
          </div>


          <div class="grid gap-4 sm:grid-cols-2">
          {#each data.bestFit.items as bestFitItem}
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

    <section class="bg-slate-50 px-6 py-16">
      <div class="mx-auto max-w-7xl">
        <div class="max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {data.results.eyebrow}
          </p>

          <h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
            {data.results.title}
          </h2>

          <p class="mt-5 text-lg leading-8 text-slate-600">
            {data.results.description}
          </p>
        </div>

        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <div class="rounded-4xl border border-red-100 bg-white p-8 shadow-sm">
            <p class="text-sm font-bold uppercase tracking-[0.12em] text-red-500">
              Before
            </p>

            <ul class="mt-6 space-y-4">
            {#each data.results.before as beforeStateLabel}
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
            <p class="text-sm font-bold uppercase tracking-[0.12em] text-green-600">
              After
            </p>

            <ul class="mt-6 space-y-4">
             {#each data.results.after as afterStateLabel}
              <li class="flex gap-3">
                <span class="font-bold text-red-500">×</span>
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

		<section id="contact" class="bg-white px-6 py-16">
			<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
				<div>
					<p class="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">{data.contact.eyebrow}</p>
					<h2 class="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 md:text-5xl">
						{data.contact.title}
					</h2>
					<p class="mt-5 text-lg leading-8 text-slate-600">
						{data.contact.description}
					</p>
				</div>

				<form class="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
					<div class="grid gap-4 sm:grid-cols-2">
						<input
							class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
							placeholder="Name"
						/>
						<input
							class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
							placeholder="Email"
						/>
					</div>

					<input
						class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
						placeholder="Company"
					/>

					<input
						class="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
						placeholder="Accounting software / payment processor"
					/>

					<textarea
						class="min-h-36 rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
						placeholder="What is tedious, manual, or broken right now?"
					></textarea>

					<button
						type="button"
						class="w-fit rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
					>
						{data.contact.primaryCta}
					</button>
				</form>
			</div>
		</section>
	</main>

	<footer class="border-t border-slate-200 bg-white px-6 py-8">
		<div class="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
			<p>© 2026 Clip Financial</p>
			<p>Finance workflows · Reconciliation · Reporting systems</p>
		</div>
	</footer>
</div>