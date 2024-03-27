<script lang="ts">
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { currentView } from '$lib/store.js';
    import { page } from '$app/stores';
    import Page from '$lib/components/Page.svelte';
    export let data;

    let views = data.content?.views[0];
    let projects = data.allProjects.projects;

    const view = {
        title: views.title, url: views.slug
    }
    currentView.set(view);

</script>

<Page class="grainy-gradient ">
    <DynamicContent page={views} {projects}/> 
</Page>
