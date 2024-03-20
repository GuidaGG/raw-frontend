<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact, playlist } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";
	import { page } from "$app/stores";
	import Search from 'svelte-feathers/Search.svelte';
	import { transformPlaylist } from "$lib/utils";

	export let data;

	let currentYear = new Date().getFullYear();
	let radio = data.radio.projects;
	const contactInfo = {
    	info: data.content.contact
    }
    contact.set(contactInfo);

	const isInHomePage = (page): boolean => page.route?.id === "/";
	const hasViewsSubpath = (page): boolean => page.route?.id === "/views/[slug]";
	const isProjectOverview = (page): boolean => page.route?.id === "/projects";

	$: showPlaylist = hasViewsSubpath($page) 
	$: hide = isInHomePage($page); 
	$: projectOverview = isProjectOverview($page)

	const transformedPlaylist = transformPlaylist(radio)
	
	playlist.set(transformedPlaylist)

</script> 

<div class="app relative">
	
	<Header />
		<main class="min-h-[calc(100vh-144px)]  relative {projectOverview ? "w-full" : "md:w-4/5 "}" >
		<slot />

		{#key showPlaylist}
		<footer class="{showPlaylist ? "bg-raw-blue text-white" : "border-t border-raw-blue text-raw-blue"} px-4 py-3 md:py-4 {!hide && !showPlaylist ? 'pb-36 md:mb-14': ''}">
			
			<div class="flex justify-between items-center">
			
				<span class="text-base">{currentYear}</span>
				<nav class="list-none flex gap-2 text-sm">
					<li >
						<a class="{showPlaylist ? "bg-raw-blue text-white" : ""}" href="/legal-notice">legal notice</a>
					</li>
					<li>|</li>
					<li>
						<a class="{showPlaylist ? "bg-raw-blue text-white" : ""}"  href="/privacy-policy">privacy policy</a>
					</li>
				</nav>
			</div>
		</footer>
		{/key}
		
		<div class="md:w-4/5 bg-raw-blue">
			<Radio {radio} {hide} {showPlaylist} {projectOverview} />
		</div>
	</main>
	<div class="hidden md:block md:w-1/5 border-l border-raw-blue bg-white h-screen top-0 right-0 overflow-y-scroll overflow-x-hidden pt-40 px-5 no-scrollbar {projectOverview ? "md:hidden" : "fixed"}">
		<div class="border rounded-full border-raw-blue mb-10 flex p-2 w-full gap-2 items-center">
			<Search class="cursor-pointer h-6 w-8 shrink-0" />
			<input type="search" placeholder="search" class="text-base placeholder:text-raw-blue focus:outline-none  bg-transparent">
		</div>


	 <div class="space-y-5  w-full s-CwfIb8medXwy text-base">
		<ul >
			<li>Here i thought simple list of everything</li>
			<li>there could be filters</li>
			<li>normally it displays everything</li>
			<li>when you seaerch or filter it just shows the resulting content</li>
		</ul><h3 class="text-base uppercase font-medium s-CwfIb8medXwy">Network</h3> <div class="flex flex-col space-y-10  s-CwfIb8medXwy"><ul class="text-base  s-CwfIb8medXwy"><li class="uppercase font-medium  p-1 s-CwfIb8medXwy">/People</li> <li class="px-1 s-CwfIb8medXwy">Lucas Odahara </li><li class="px-1 s-CwfIb8medXwy">Luiz Monteiro </li><li class="px-1 s-CwfIb8medXwy">Ralf Wendt </li><li class="px-1 s-CwfIb8medXwy"> Anna Zawadzka </li><li class="px-1 s-CwfIb8medXwy">handverlesen with Lea Schneider and Kassandra Wede </li><li class="px-1 s-CwfIb8medXwy"><a href="https://www.instagram.com/femmefitnessss/" class="s-CwfIb8medXwy">FemmeFitnes</a> </li><li class="px-1 s-CwfIb8medXwy"><a href="https://ralucacro.hotglue.me/" class="s-CwfIb8medXwy">Raluca Croitoru</a> </li><li class="px-1 s-CwfIb8medXwy">Natascha Sadr Haghighian </li><li class="px-1 s-CwfIb8medXwy"> Ashkan </li></ul> <ul class="text-base  s-CwfIb8medXwy"><li class="uppercase font-medium  p-1 s-CwfIb8medXwy">/ORGANIZATIONS</li> <li class="px-1 s-CwfIb8medXwy"><a href="https://kvgb.de/" class="s-CwfIb8medXwy">Kunstverein Grafschaft Bentheim</a> </li><li class="px-1 s-CwfIb8medXwy">Changing Room, Berlin </li><li class="px-1 s-CwfIb8medXwy">repeated </li><li class="px-1 s-CwfIb8medXwy">Hamburger Bahnhof – Nationalgalerie der Gegenwart, Berlin </li></ul></div></div> <div class="space-y-5 relative s-CwfIb8medXwy"><h3 class="text-base uppercase font-medium s-CwfIb8medXwy">Ongoing</h3></div>
	</div>


</div>

