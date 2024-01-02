<script>
  import { page } from "$app/stores";
  import Button from "./Button.svelte";

</script>


<header>
	<div class="grid grid-cols-3 items-center h-28 px-5 w-full">
		<div class=""><a href="/">research and waves</a></div>	
		<div class="place-self-center">
			{#if $page.data.content.views.length === 1}	
				<Button>
					{$page.data.content.views[0].title}
				</Button>
			{/if}
			</div>
		<nav class="ml-auto list-none">
			<li>list</li>
		</nav>
	</div>
</header>

