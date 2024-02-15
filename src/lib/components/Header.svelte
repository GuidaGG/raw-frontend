<script lang="ts">
	import logo  from "$lib/images/logo.png";
	import Button from "./Button.svelte";
	import { currentView } from "$lib/store";

	let buttonView = { title: '', url: ''}
	
	currentView.subscribe((value) => {
		buttonView.title = value.title;
		buttonView.url = value.url;
	})

</script>


<header class="sticky top-0 be z-10 bg-gradient-to-b from-raw-white  via-raw-white text-base md:text-xl">

	<div class="grid grid-cols-2 md:grid-cols-3 items-center h-40  md:h-40 px-5 w-full ">
		<div class="max-w-28 sm:max-w-56"><a href="/"><img alt="logo" src={logo} /></a></div>	

		<div class="md:place-self-center">
				{#if buttonView.title}	
					<Button 
						invert
						class="w-full md:w-auto text-center">
						{buttonView.title}
					</Button>
				{/if}
		</div>
		<nav class="col-span-2 sm:col-span-1  sm:w-auto md:ml-auto list-none flex gap-2 justify-between">
			{#if buttonView.url }
				<li><a href="/views/{buttonView.url}">Explore</a></li>
				<li>|</li>
			{/if}
			<li><a href="/projects">List</a></li>

		</nav>
	</div>
</header>

