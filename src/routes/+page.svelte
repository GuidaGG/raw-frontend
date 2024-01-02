<script lang="ts">
	import Button
	 from '$lib/components/Button.svelte';
	export let data

	let views = data.content.views

	const randomclass = () => {
		return ``
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="p-5">
	<div class="py-10">
		<h1 class="text-center">Welcome to researchandwaves.net!</h1>
		<h2 class="text-center">Kindly let us know who you would like to be (today):</h2>
	</div>
	<div class="flex flex-col gap-10">
		{#each views as view}
		
				<Button margin>
						<a href="/{view.slug}">
					{view.title}
					</a>
				</Button>

		{/each}
	</div>
</section>
