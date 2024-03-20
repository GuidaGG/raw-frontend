<script lang="ts">
	import Button
	 from '$lib/components/Button.svelte';
	export let data
	import Page from '$lib/components/Page.svelte';
	import { currentView } from '$lib/store.js';

	let views = data.content.views

	currentView.set({title: '', url: ''});

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Page class="min-h-[calc(100vh-3.6rem)]">
	<div class="pb-10 max-w-screen-xl mx-auto ">
		<h1 class="text-center text-xl">Welcome to researchandwaves.net!</h1>
		<h2 class="text-center font-normal text-3xl md:text-4xl">Kindly let us know who you would like to be (today):</h2>
	</div>
	<div class="flex flex-col gap-10">
		{#each views as view}
		
				<Button margin link="/views/{view.slug}">
				
					{view.title}
				</Button>

		{/each}
	</div>
</Page>
