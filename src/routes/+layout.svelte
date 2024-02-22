<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";
	import { page } from "$app/stores";

	export let data;

	let currentYear = new Date().getFullYear();
	let radio = data.radio.projects;
	const contactInfo = {
    	info: data.content.contact
    }
    contact.set(contactInfo);

	 const isInHomePage = (page): boolean => page.route?.id === "/";
	const hasViewsSubpath = (page): boolean => page.route?.id === "/views/[slug]";

	$: showPlaylist = hasViewsSubpath($page) 
	$: hide = isInHomePage($page); 
</script> 

<div class="app">
	<Header />
	<main class="min-h-[calc(100vh-144px)]">
		<slot />
	</main>
	<div class="w-full">
		<Radio {radio} {hide} {showPlaylist} />
	</div>

	<footer class="text-white bg-raw-blue px-4 py-3 md:py-4 {!hide && !showPlaylist ? 'pb-36 md:pb-20': ''}">
		
		<div class="flex justify-between items-center">
		
			<span class="text-base">{currentYear}</span>
			<nav class="list-none flex gap-2 text-sm">
				<li>
					<a class="text-white" href="/legal-notice">legal notice</a>
				</li>
				<li>|</li>
				<li>
					<a class="text-white" href="/privacy-policy">privacy policy</a>
				</li>
			</nav>
		</div>
		
	</footer>

</div>

