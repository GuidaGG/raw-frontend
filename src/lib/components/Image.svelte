<script lang="ts">
    import type { Media } from "$lib/types";
    import { config } from "$lib/config";
    
    export let image: Media
    export let size: "small" | "thumbnail" | "large" | "medium" | null = null

    
    let url = size != null && image?.formats?.[size] ? image?.formats[size]?.url : image?.url 
    
    // Define responsive image sizes (e.g., 320px, 768px, and 1200px)
       const srcSet = `
        ${config.apiUrl}${image?.formats?.small?.url} 320w,
        ${config.apiUrl}${image?.formats?.medium?.url} 768w,
        ${config.apiUrl}${image?.formats?.large?.url} 1200w
        ${config.apiUrl}${image?.formats?.large?.url} 1920w
    `;

    </script>

{#if image}
    <img
        class={`object-cover w-full ${$$restProps.class}`}
        src={`${config.apiUrl}${url}`}
        srcset={srcSet}
        sizes="(max-width: 320px) 320px, (max-width: 768px) 768px, 1200px"
        alt={image.alternativeText}
        loading="lazy"
    />
{/if}