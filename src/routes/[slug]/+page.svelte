<script lang="ts">
    import { json } from '@sveltejs/kit';
    import DynamicContent from '$lib/components/DynamicContent.svelte';

    export let data

    $: page = data.content?.pages[0];
</script>

<div class="bg-raw-white px-5 py-10">
    <DynamicContent {page}/> 
</div>
