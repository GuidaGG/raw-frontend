<script lang="ts">
    import type {  JokerSection } from "$lib/types";
    import Image from "../Image.svelte";
    import Video from "../Video.svelte";

    export let section: JokerSection
    </script>

    <div class=" flex flex-col bg-raw-white  w-full gap-5  {section.align} {section.layout_joker} pb-10">
        <div class="basis-1/2">
            {#if section.image}
            <Image image={section.image}/>
            {/if}
            {#if section.video}
                <Video video={section.video} />
            {/if}
       </div>
       <div class="basis-1/2">
            <div class="prose  max-w-screen-lg bg-raw-white">
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
            {#if section.links.length}
            <ul class="bg-raw-white px-5 text-sm mt-5">
                <li class="font-medium">Links:</li>
                {#each section.links as link}
                <li>
                    <a href={link.url}>{link.name}</a>
                </li>
                {/each}
            </ul>
            
            {/if}
        </div>
    </div>

    <style type="postcss">
        .two_columns {
            @apply lg:flex-row lg:max-w-screen-2xl;
   
        }
        .one_column {
            @apply w-full md:w-2/3 max-w-screen-lg
        }

    </style>