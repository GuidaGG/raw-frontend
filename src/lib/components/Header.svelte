<script lang="ts">
	import logo  from "$lib/images/logo.png";
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


<header class="sticky top-0 be z-10 bg-gradient-to-b from-raw-white  via-raw-white text-base md:text-xl">

	<div class="flex md:grid justify-between grid-cols-3 items-center h-24  md:h-36 px-5 w-full ">
		<div class="max-w-24 sm:max-w-44"><a href="/"><img alt="logo" src={logo} /></a></div>	

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
					<a href="/views/{buttonView.url}" class="h-6 w-6">
						<User tabindex="-1" class="h-6 w-6 focus:outline-none" />
					</a>
				</li>
			{/if}
			<li>
				<a href="/projects" class="h-6 w-6" >
					<List tabindex="-1" class="h-6 w-6 focus:outline-none" />
				</a>
			</li>

		</nav>
	</div>
</header>

