<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact, playlist } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";
	import { page } from "$app/stores";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import {transformTracks } from "$lib/utils";
	import type { Page } from "@sveltejs/kit";
	import { navigating } from "$app/stores";
	


	export let data;


	let currentYear = new Date().getFullYear();
	let radio = data.radio;
	const contactInfo = {
    	info: data.content.contact
    }
	let sidebar = data.sidebar.projects;
	let colors = data.themeOptions.theme;
	let seo = data.themeOptions?.theme?.seo[0] ?? {metaTitle: "Research and Waves", metaDescription: "Research and Waves is a platform for artistic research and practice in the field of sound and radio art."};

    contact.set(contactInfo);

	const isInHomePage = (page: Page): boolean => page.route?.id === "/";
	const hasViewsSubpath = (page: Page): boolean => page.route?.id === "/views/[slug]";
	const hideSidebar = (page: Page): boolean => page.route?.id === "/projects" || page.route?.id === "/";
	const isProject = (page: Page): boolean => page.route?.id === "/projects/[slug]";

	$: showPlaylist = hasViewsSubpath($page) 
	$: hide = isInHomePage($page); 
	$: sidebarHidden= hideSidebar($page)
	$: hideFooter = isProject($page)

	
    const transformedPlaylist = radio?.tracks ? transformTracks([radio]) : [];   

	 playlist.set(transformedPlaylist)   

	 import { onMount } from 'svelte';
  import Seo from "$lib/components/SEO.svelte";

	let fullColor = colors.fullColor;  // Default value
	let lightColor = colors.lightColor; // Default value

	function fetchColors() {

		// Set CSS variables dynamically
		document.documentElement.style.setProperty('--full-color', fullColor);
		document.documentElement.style.setProperty('--light-color', lightColor);
	}

	onMount(fetchColors);
</script> 

<style>
	:root {
	  --full-color: white;
	  --light-color: white;
	}
  </style>

<!-- There is a specific SEO on the projects pages -->

{#if (!$page.url.pathname.includes('projects')) }
<Seo {seo} />
{/if}

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
			<Radio {hide} projectOverview={sidebarHidden} />
		</div> 
	</main>
	
		<Sidebar hidden={sidebarHidden} data={sidebar}/>
</div>

