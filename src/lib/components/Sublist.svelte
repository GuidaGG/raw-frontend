<script lang="ts">
    import type { Link } from "$lib/types.ts";

    export let values: Link[];
    export let label: string;
</script>

<div class="space-y-2 w-full">
    <h3 class="text-base uppercase font-medium">/{label}</h3>
    <ul >
        {#each values as value}
        <li class="break-words">   
            {#if value.url }
            <a target="_blank" href={value.url}>{value.name}</a>
            {:else}
                {value.name}
            {/if}
        </li>	
        {/each}
    </ul>
</div>