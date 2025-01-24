<script lang="ts">
    import type { Media } from "$lib/types";
    import { config } from "$lib/config";
    
    export let image: Media
    export let size: "small" | "thumbnail" | "large" | "medium" | null = null

    
    let url = size != null && image?.formats?.[size] ? image?.formats[size]?.url : image?.url 
    
    </script>

    {#if image}
    <img
        class={` object-cover w-full ${$$restProps.class}` }
        src={`${config.apiUrl}${url}`} 
        alt={image.alternativeText}
        loading="lazy"
    />
    {/if}