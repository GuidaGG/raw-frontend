<script lang="ts">
	import Logo from "./Logo.svelte";
	import Button from "./Button.svelte";
	import { currentView } from "$lib/store";
	import List from 'svelte-feathers/List.svelte';
	import User from 'svelte-feathers/Eye.svelte';
	import Search from 'svelte-feathers/Search.svelte';
	import ShoppingBag from 'svelte-feathers/ShoppingBag.svelte';
	import { page } from "$app/stores";

	let buttonView = { title: '', url: '' };
	
	currentView.subscribe((value) => {
		buttonView.title = value.title;
		buttonView.url = value.url;
	})

	let active = "underline";
	$: currentPage = $page.route.id

	

</script>


<header class="fixed w-full top-0 z-10 bg-gradient-to-b from-raw-white 30% via-raw-white text-base md:text-xl">
	<div class="flex md:grid justify-between grid-cols-3 items-center h-24  md:h-32 px-2 w-full ">
		<div class="max-w-24  sm:max-w-40"><a href={`/views/${buttonView.url}`} aria-label="Go to your view"><Logo class="min-w-24 fill-raw-blue stroke-raw-blue hover:animate-spin"  /></a></div>	

		<div class="block md:place-self-center">
	
				{#if buttonView.title}	
					<Button 
						invert
						link="/"
						class="text-xs md:text-base px-5 sm:px-5 py-1 ">
						{buttonView.title}
						
					</Button>
				{/if}
		</div>
		<nav class="justify-end  sm:w-auto md:ml-auto" >
			<menu class=" list-none flex gap-1 justify-end md:justify-between items-center">
			<li class=" ">
				<a href="/projects" class="h-4" >
					<div class="rounded-full p-2 stroke-white transition-all {currentPage === "/projects" ? active : ""}">
						<!-- <List tabindex="-1" class="h-8 w-8 focus:outline-none {currentPage === "/projects" ? "stroke-white": ""}" /> -->
						List
					</div>
				</a>
			</li>
			|
			<li class="border-r border-raw-blue pr-3 md:border-none">
				<div class="rounded-full p-1 stroke-white transition-all {currentPage === "/catalog" ? active : ""}">
					<a href="/catalog" >
						<!-- <ShoppingBag tabindex="-1" class="h-7 w-7 focus:outline-none {currentPage === "/catalog" ? "stroke-white": ""}" /> -->
						Catalog
					</a>
				</div>
		
			</li>
		<!-- 	<li class="md:hidden ">
				<a href="/search" class="h-8 w-8" >
					<div class="rounded-full p-2 stroke-white transition-all {currentPage === "/search" ? active : ""}">
						<Search tabindex="-1" class="h-8 w-8 focus:outline-none {currentPage === "/search" ? "stroke-white": ""}" />
					</div>
				</a>
			</li> -->
			</menu>
		</nav>
	</div>
</header>

