<script lang="ts">
    import type {  JokerSection } from "$lib/types";
    import Image from "../Image.svelte";
    import Video from "../Video.svelte";

    export let section: JokerSection
    </script>
    

    <div class=" bg-white my-10 w-2/3 max-w-screen-lg space-y-10 pb-10">
        {#if section.image}
           <Image image={section.image}/>
        {/if}
        {#if section.video}
            <Video video={section.video} />
        {/if}
 
        <div class="prose prose-headings:text-raw-blue prose-headings:font-normal prose-headings:mt-0 prose-headings:pb-0 prose-p:pb-0 max-w-screen-lg bg-white">
            {#if section.title}
                <h2 class="border-b border-raw-blue p-5 pb-2 not-prose uppercase">{ section.title}</h2>
            {/if}
            {#if section.subtitle}
                <h3 class=" border-raw-blue p-5 pb-2 not-prose uppercase">{ section.subtitle}</h3>
            {/if}
            <div class="px-5 py-2 border-b border-raw-blue">
                { @html section.content}
            </div>
        </div>
        {#if section.links}
        <ul class="bg-white px-5 text-sm ">
            <li class="font-bold">Links:</li>
            {#each section.links as link}
            <li>
                <a href={link.url}>{link.name}</a>
            </li>
            {/each}
        </ul>
    {/if}
    </div>