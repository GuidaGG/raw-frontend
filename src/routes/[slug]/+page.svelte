<script lang="ts">
    import { json } from '@sveltejs/kit';
    import DynamicContent from '$lib/components/DynamicContent.svelte';
  import Page from '$lib/components/Page.svelte';

    export let data

    $: page = data.content?.pages[0];
</script>

<Page class="bg-raw-white" >
    <DynamicContent {page}/> 
</Page>
