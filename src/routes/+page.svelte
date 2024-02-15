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

<section class="p-5">

	<div class="pb-16">
		<h1 class="text-center normal-case">Welcome to researchandwaves.net!</h1>
		<h2 class="text-center normal-case">Kindly let us know who you would like to be (today):</h2>
	</div>
	<div class="flex flex-col gap-10">
		{#each views as view}
		
				<Button margin>
						<a  href="/views/{view.slug}">
					{view.title}
					</a>
				</Button>

		{/each}
	</div>
</section>
