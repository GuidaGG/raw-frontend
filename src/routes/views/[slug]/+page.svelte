<script lang="ts">
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { currentView } from '$lib/store.js';

    export let data;

    let page = data.content.views[0]

    const view = {
        title: page.title, url: page.slug
    }
    currentView.set(view);
</script>

<div class="grainy-gradient p-5">
    <DynamicContent {page}/>
</div>
