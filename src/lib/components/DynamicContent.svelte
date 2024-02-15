<script lang="ts">
    import type { View, Project } from "$lib/types";
    import TextSection from "./Dynamic/TextSection.svelte";
    import JokerSection from "./Dynamic/JokerSection.svelte";
    import ProjectsSection from "./Dynamic/ProjectsSection.svelte";
    export let page: View
    export let projects: Project[]

</script>

<div class="max-w-screen-2xl mx-auto space-y-10">
    {#each page.dynamic_content as section}
        {#if section.__typename === "ComponentDynamicText"}
            <TextSection {section}/>
        {:else if section.__typename === "ComponentDynamicProjects"}
            <ProjectsSection {section} {projects} />
        {:else if section.__typename === "ComponentDynamicJoker"}
           <JokerSection {section}/>
        {:else if section.__typename === "ComponentDynamicList"}
           list
        {/if}
    {/each}
</div>