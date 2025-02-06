<script lang="ts">
    import type { Download } from "$lib/types.ts";
    import { config } from "$lib/config";

    export let values: Download[];
    export let label: string;
</script>

<div class="space-y-2 w-full">
    <h3 class="text-base uppercase font-medium">/{label}</h3>
    <ul>
        {#each values as value}
        <li class="break-words">   
            {#if value.download_file?.url}
                <a 
                    href={`${config.apiUrl}${value.download_file.url}`} 
                    download={value.display_name} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Download file: {value.display_name}"
                >
                    {value.display_name}
                </a>
            {:else}
                {value.display_name}
            {/if}
        </li>    
        {/each}
    </ul>
</div>
