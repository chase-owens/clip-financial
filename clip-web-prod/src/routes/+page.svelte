<script lang="ts">
	import BestFit from '$lib/components/BestFit.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Process from '$lib/components/Process.svelte';
	import Results from '$lib/components/Results.svelte';
	import Services from '$lib/components/Services.svelte';
	import WhatWeDo from '$lib/components/WhatWeDo.svelte';
	import WhyClip from '$lib/components/WhyClip.svelte';
	import type { RootContent } from '../../../shared/types/RootContent';

	const { data }: { data: RootContent } = $props();
</script>

<svelte:head>
	<title>Clip Financial</title>
	<meta
		name="description"
		content="Finance operations consulting for accountants, payment workflows, reconciliation, and reporting systems."
	/>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<Header />
	<main>
		<Hero hero={data.hero} />
		<Services services={data.services} />
		<WhatWeDo whatWeDo={data.whatWeDo} />
		<Process process={data.process} />
		<WhyClip whyClip={data.whyClip} />
		<BestFit bestFit={data.bestFit} />
		<Results results={data.results} />
		<ContactForm contact={data.contact} />
	</main>
	<Footer />
</div>
