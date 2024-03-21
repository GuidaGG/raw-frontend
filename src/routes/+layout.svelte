<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact, playlist } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";
	import { page } from "$app/stores";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import { transformPlaylist } from "$lib/utils";

	export let data;

	let currentYear = new Date().getFullYear();
	let radio = data.radio.projects;
	const contactInfo = {
    	info: data.content.contact
    }
	let sidebar = data.sidebar.projects;

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
	
		<Sidebar {projectOverview} data={sidebar}/>
</div>

