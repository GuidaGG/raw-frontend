<script lang="ts">
    import DynamicContent from '$lib/components/DynamicContent.svelte';
    import { currentView } from '$lib/store.js';
    import { page } from '$app/stores';
    export let data;

    let views = data.content?.views[0];
    let projects = data.allProjects.projects;

    const view = {
        title: views.title, url: views.slug
    }
    currentView.set(view);

</script>

<div class="grainy-gradient px-10 py-10 pt-96">
    <DynamicContent page={views} {projects}/> 
</div>
