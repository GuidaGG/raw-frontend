<script lang="ts">
    import type { View } from "$lib/types";

    export let page: View

</script>
    
    {#each page.dynamic_content as section}
        {#if section.__typename === "ComponentDynamicText"}
            text
        {:else if section.__typename === "ComponentDynamicGallery"}
            gallery
        {:else if section.__typename === "ComponentDynamicJoker"}
           joker
        {:else if section.__typename === "ComponentDynamicList"}
           list
        {/if}
    
    {/each}
    