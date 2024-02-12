<script lang="ts">
    import type { View } from "$lib/types";
    import TextSection from "./Dynamic/TextSection.svelte";
    import JokerSection from "./Dynamic/JokerSection.svelte";
    export let page: View

</script>

    {#each page.dynamic_content as section}
        {#if section.__typename === "ComponentDynamicText"}
            <TextSection {section}/>
        {:else if section.__typename === "ComponentDynamicGallery"}
            gallery
        {:else if section.__typename === "ComponentDynamicJoker"}
           <JokerSection {section}/>
        {:else if section.__typename === "ComponentDynamicList"}
           list
        {/if}
    {/each}