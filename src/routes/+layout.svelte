<script>
	import Header from "$lib/components/Header.svelte";
	import "../app.css";

	let currentYear = new Date().getFullYear();
</script>

<div class="app">
	<Header />

	<main class="min-h-[calc(100vh-144px)]">
		<slot />
	</main>
	<footer class="text-white bg-raw-blue px-5">
		<div class="flex justify-between">
		
			<span>{currentYear}</span>
			<nav class="list-none flex gap-2">
				<li>
					<a href="/impressum">impressum</a>
				</li>
				<li>
					<a href="/datenschutz">datenschutz</a>
				</li>
			</nav>
		</div>
		
	</footer>

</div>

