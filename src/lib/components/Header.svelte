<script lang="ts">
  import { page } from "$app/stores";
  import Button from "./Button.svelte";
  import { writable } from 'svelte/store';
  import { currentView } from "$lib/store";

 let buttonView = { title: '', url: ''}
 
 currentView.subscribe((value) => {
	buttonView.title = value.title;
	buttonView.url = value.url;
 })
</script>


<header>

	<div class="grid grid-cols-1 md:grid-cols-3 items-center h-40 md:h-28 px-5 w-full">
		<div class=""><a href="/">research and waves</a></div>	

		<div class="md:place-self-center">
				{#if buttonView.title}	
					<Button 
						invert
						class="w-full md:w-auto">
						{buttonView.title}
					</Button>
				{/if}
		</div>
		<nav class="md:ml-auto list-none flex gap-2 justify-between">
			{#if buttonView.url }
				<li><a href="/views/{buttonView.url}">Explore</a></li>
				<li>|</li>
			{/if}
			<li><a href="/list">List</a></li>

		</nav>
	</div>
</header>

