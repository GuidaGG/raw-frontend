<script lang="ts">
import type { PageSection, TextSection } from "$lib/types";

export let section: TextSection


</script>

<div class="prose prose-headings:text-raw-blue prose-headings:font-normal prose-headings:mt-0 prose-headings:pb-0 prose-p:pb-0  prose-a:text-raw-blue  prose-a:no-underline pb-5 w-full md:w-2/3 max-w-screen-lg {section.align_text} bg-raw-white border border-raw-blue">
    {#if section.title}
        <h2 class="border-b border-raw-blue p-5 pb-2 not-prose uppercase text-xl">{ section.title}</h2>
    {/if}
    {#if section.body}
    <div class="px-5 py-2 border-b border-raw-blue">
        { @html section.body}
    </div>
    {/if}
</div>