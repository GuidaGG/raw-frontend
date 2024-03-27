<script lang="ts">
	import Logo from "./Logo.svelte";
	import Button from "./Button.svelte";
	import { currentView } from "$lib/store";
	import List from 'svelte-feathers/List.svelte';
	import User from 'svelte-feathers/Eye.svelte';
	import Search from 'svelte-feathers/Search.svelte';
	import ShoppingBag from 'svelte-feathers/ShoppingBag.svelte';
	import { page } from "$app/stores";

	let buttonView = {}
	
	currentView.subscribe((value) => {
		buttonView.title = value.title;
		buttonView.url = value.url;
	})

	

</script>


<header class="fixed w-full top-0 z-10 bg-gradient-to-b from-raw-white 30% via-raw-white text-base md:text-xl">
	<div class="flex md:grid justify-between grid-cols-3 items-center h-24  md:h-32 px-5 w-full ">
		<div class="max-w-24  sm:max-w-40"><a href={`/views/${buttonView.url}`}><Logo class="min-w-24 fill-raw-blue stroke-raw-blue hover:animate-spin"  /></a></div>	

		<div class="md:place-self-center">
	
				{#if buttonView.title}	
					<Button 
						invert
						link="/"
						class="text-xs md:text-xl px-5">
						{buttonView.title}
						
					</Button>
				{/if}
		</div>
		<nav class=" sm:w-auto md:ml-auto list-none flex gap-2 justify-end md:justify-between items-center">
			<li class=" pr-3 border-raw-blue border-r">
				<a href="/projects" class="h-8 w-8"  >
					<List tabindex="-1" class="h-8 w-8 focus:outline-none " />
				</a>
			</li>
			<li class="border-r border-raw-blue pr-3 md:border-none">
				<a href="/catalog" class="h-8 w-8">
					<ShoppingBag tabindex="-1" class="h-7 w-7 focus:outline-none " />
				</a>
			</li>
			<li class="md:hidden ">
				<a href="/search" class="h-8 w-8" >
					<Search tabindex="-1" class="h-8 w-8 focus:outline-none" />
				</a>
			</li>

		</nav>
	</div>
</header>

