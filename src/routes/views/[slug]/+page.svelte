<script lang="ts">
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { currentView } from '$lib/store.js';

    export let data;

    let page = data.content?.views[0];
    let projects = data.allProjects.projects;

    const view = {
        title: page.title, url: page.slug
    }
    currentView.set(view);
</script>

<div class="grainy-gradient px-5 py-10">
    <DynamicContent {page} {projects}/> 
</div>
