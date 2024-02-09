<script lang="ts">
    import type { Media } from "$lib/types";
    import { config } from "$lib/config";
    
    export let image: Media
    export let size: "small" | "thumbnail" | "large" | "medium" | null = null

    
    $: url = size != null && image.formats[size].url ? image.formats[size].url : image.url
    
    </script>
    
    <img
        class={`object-cover w-full ${$$restProps.class}` }
        src={`${config.apiUrl}${url}`} 
        alt={image.alternativeText}
        loading="lazy"
    />
    