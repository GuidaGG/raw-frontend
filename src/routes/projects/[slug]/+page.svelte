<script lang="ts">
     import Contact from '$lib/components/Dynamic/Contact.svelte';
    import Image from '$lib/components/Image.svelte';
    import Page from '$lib/components/Page.svelte';
    import Sublist from '$lib/components/Sublist.svelte';
    import { formatDate } from '$lib/utils.js';

    export let data;

    $: project = data.content?.projects[0];

</script>


<Page class="space-y-20">
    <div class="flex flex-col-reverse md:flex-row w-full md:gap-28">
        <div class="w-full md:w-2/5 shrink-0">
            {#each project.images as image}
                    <Image size="large" {image} />
             {/each}
        </div>
        <div class="px-5">
            <div class="pb-5 uppercase text-base  flex gap-2 ">
                {formatDate(project.date)} |
                {#each project.project_categories as cat, index}
                    <span class="font-medium after:content-['|'] after:pl-2 last:after:content-none">{cat.name}</span>
                {/each}
            </div>

            <h1>{project.title}</h1>
            {#if project.subtitle}
                <h2>{project.subtitle}</h2>
            {/if}
            <div class="text-sm leading-3 pt-2">RAW {project.coordinate}</div>
            <div></div>
            <div class="prose max-w-screen-lg py-10">{@html project.description}</div>
            <div class="flex flex-col text-base gap-10">
            {#if project.collaborations.length}
                    <Sublist values={project.collaborations} label="collaborations" />
            {/if}
            {#if project.place.length}
                    <Sublist values={project.place} label="Place" />
            {/if}
            {#if project.links.length}
            <Sublist values={project.links} label="Links" />
            {/if}   
            {#if project.funding}
                <div class="space-y-2 w-full">
                    <h3 class="text-base uppercase font-medium">/Funding</h3>
                    <div>{project.funding}</div>
                </div>
            {/if} 
            </div>
        </div>
    
    </div>
</Page>
