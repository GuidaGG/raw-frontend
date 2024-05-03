<script lang="ts">
    import type {  JokerSection } from "$lib/types";
    import Image from "../Image.svelte";
    import Video from "../Video.svelte";

    export let section: JokerSection
    </script>

    <section class="flex flex-col  w-full gap-5  {section.align} {section.layout_joker}">
        {#if section.image || section.video}
        <div class="graphics basis-1/2 {section.transparent ? "no-borders" : "borders"}">
            {#if section.image}
            <Image image={section.image} class="borde"/>
            {/if}
            {#if section.video}
                <Video video={section.video} />
            {/if}
       </div>
        {/if}
     {#if section.title || section.subtitle || section.content || section.links.length}
       <div class="basis-1/2">
            <div class="bg-raw-white border-raw-blue border">
                <div class="prose max-w-screen-lg " >
                    {#if section.title}
                        <h2 class="p-5 pb-2 not-prose uppercase ">{ section.title}</h2>
                    {/if}
                    {#if section.subtitle}
                        <h3 class="border-t border-raw-blue  px-5 py-2 not-prose uppercase ">{ section.subtitle}</h3>
                    {/if}
                    {#if section.content}
                    <div class="px-5 py-2 border-t border-raw-blue">
                        { @html section.content}
                    </div>
                    {/if}
                </div>
                {#if section.links.length}
                <ul class=" px-5 text-sm py-5 ">
                    <li class="font-medium">Links:</li>
                    {#each section.links as link}
                    <li>
                        <a target="_blank"  class="font-bold" href={link.url}>{link.name}</a>
                    </li>
                    {/each}
                </ul>
                {/if}
            </div>
        </div>
     {/if}
    </section>

    <style type="postcss">
        .two_columns {
            @apply lg:flex-row lg:max-w-screen-2xl gap-5;
        }

        .two_columns  .graphics.borders {
                @apply border border-raw-blue;
        }

        .one_column {
            @apply w-full md:w-2/3 max-w-screen-lg gap-0 
    
        }

        .one_column  .graphics.borders {
                @apply border border-raw-blue ;
        }


    </style>