<script>
	import Header from "$lib/components/Header.svelte";
	import "../app.css";

	let currentYear = new Date().getFullYear();
</script>

<div class="app">
	<Header />

	<main class="min-h-[calc(100vh-144px)] ">
		<slot />
	</main>
	<div class="bg-red-300 w-full">
		audio player - probably needs to be hidden on main page but stays on the otehrs
	</div>
	<footer class="text-white bg-raw-blue p-5">
		
		<div class="flex justify-between">
		
			<span>{currentYear}</span>
			<nav class="list-none flex gap-2 text-sm">
				<li>
					<a class="text-white" href="/impressum">impressum</a>
				</li>
				<li>|</li>
				<li>
					<a class="text-white" href="/datenschutz">datenschutz</a>
				</li>
			</nav>
		</div>
		
	</footer>

</div>

