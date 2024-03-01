<script lang="ts">
	import Button
	 from '$lib/components/Button.svelte';
	export let data
	import { currentView } from '$lib/store.js';

	let views = data.content.views

	currentView.set({title: '', url: ''});

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="">

	<div class="py-10">
		<h1 class="text-center text-6xl">Welcome to researchandwaves.net!</h1>
		<h2 class="text-center font-normal text-4xl">Kindly let us know who you would like to be (today):</h2>
	</div>
	<div class="flex flex-col gap-10">
		{#each views as view}
		
				<Button margin link="/views/{view.slug}">
				
					{view.title}
				</Button>

		{/each}
	</div>
</section>
