<script lang="ts">
import type { PageSection, TextSection } from "$lib/types";

export let section: TextSection


</script>

<div class="prose pb-2 w-full md:w-2/3 max-w-screen-lg {section.align_text}">
    {#if section.title}
        <h2 class="border-b border-raw-blue p-5 pb-2 not-prose uppercase text-xl">{ section.title}</h2>
    {/if}
    <div class="px-5 py-2 border-b border-raw-blue">
        { @html section.body}
    </div>
</div>