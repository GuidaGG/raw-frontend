<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact, playlist } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";
	import { page } from "$app/stores";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import {transformTracks } from "$lib/utils";

	export let data;

	let currentYear = new Date().getFullYear();
	let radio = data.radio;
	const contactInfo = {
    	info: data.content.contact
    }
	let sidebar = data.sidebar.projects;

    contact.set(contactInfo);

	const isInHomePage = (page): boolean => page.route?.id === "/";
	const hasViewsSubpath = (page): boolean => page.route?.id === "/views/[slug]";
	const hideSidebar= (page): boolean => page.route?.id === "/projects" || page.route?.id === "/"  ;
	const isProject  = (page): boolean => page.route?.id === "/projects/[slug]";

	$: showPlaylist = hasViewsSubpath($page) 
	$: hide = isInHomePage($page); 
	$: sidebarHidden= hideSidebar($page)
	$: hideFooter = isProject($page)

	
    const transformedPlaylist = radio?.tracks ? transformTracks([radio]) : [];   

	 playlist.set(transformedPlaylist)   

</script> 

<div class="app relative">
	
	<Header />
		<main class="min-h-[calc(100vh-144px)]  relative {sidebarHidden ? "w-full" : "md:w-4/5 "}" >
			
		<slot />
		{#if !hideFooter}
		<footer class="text-raw-blue px-5 py-3 md:py-5 {hide  ? "mb-0" : " mb-14"}  ">
			
			<div class="w-full text-right ">
			

				<nav class="list-none flex gap-2 text-sm ">
					<li >
						<a  href="/legal-notice">legal notice</a>
					</li>
					<li>|</li>
					<li>
						<a   href="/privacy-policy">privacy policy</a>
					</li>
				</nav>
			</div>
		</footer>
		{/if}
	
		<div class="md:w-4/5 bg-raw-blue">
			<Radio {radio} {hide} {showPlaylist} projectOverview={sidebarHidden} />
		</div> 
	</main>
	
		<Sidebar hidden={sidebarHidden} data={sidebar}/>
</div>

