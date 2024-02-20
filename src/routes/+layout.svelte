<script>
	import Header from "$lib/components/Header.svelte";
	import "../app.css";
	import { contact } from "$lib/store";
  	import Radio from "$lib/components/Radio.svelte";

	export let data;

	let currentYear = new Date().getFullYear();
	let radio = data.radio.projects;
	const contactInfo = {
    	info: data.content.contact
    }
    contact.set(contactInfo);

</script>

<div class="app">
	<Header />
	<main class="min-h-[calc(100vh-144px)]">
		<slot />
	</main>
	<div class=" w-full">
		<Radio {radio}/>
	</div>

	<footer class="text-white bg-raw-blue p-5">
		
		<div class="flex justify-between items-center">
		
			<span>{currentYear}</span>
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

