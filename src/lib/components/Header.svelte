<script lang="ts">
	import Logo from "./Logo.svelte";
	import Button from "./Button.svelte";
	import { currentView } from "$lib/store";
	import List from 'svelte-feathers/List.svelte';
	import User from 'svelte-feathers/Eye.svelte';

	let buttonView = { title: '', url: ''}
	
	currentView.subscribe((value) => {
		buttonView.title = value.title;
		buttonView.url = value.url;
	})

</script>


<header class="sticky top-0 be z-10 bg-gradient-to-b from-raw-white 30% via-raw-white text-base md:text-xl">

	<div class="flex md:grid justify-between grid-cols-3 items-center h-24  md:h-36 px-5 w-full ">
		<div class="max-w-24  sm:max-w-44"><a href="/"><Logo class="min-w-24 fill-raw-blue stroke-raw-blue hover:animate-spin"  /></a></div>	

		<div class="md:place-self-center">
	
				{#if buttonView.title}	
					<Button 
						invert
						link={`views/${buttonView.url}`}
						class="text-xs md:text-xl px-5">
						{buttonView.title}
						
					</Button>
				{/if}
		</div>
		<nav class=" sm:w-auto md:ml-auto list-none flex gap-2 justify-end md:justify-between items-center">
			{#if buttonView.url }
				<li class="border-r-2 border-raw-blue pr-3">
					<a href="/views/{buttonView.url}" class="h-8 w-8">
						<User tabindex="-1" class="h-8 w-8 focus:outline-none" />
					</a>
				</li>
			{/if}
			<li>
				<a href="/projects" class="h-8 w-8" >
					<List tabindex="-1" class="h-8 w-8 focus:outline-none" />
				</a>
			</li>

		</nav>
	</div>
</header>

