<script lang="ts">
    import Image from '$lib/components/Image.svelte';
    import Sublist from '$lib/components/Sublist.svelte';
    import { formatDate } from '$lib/utils.js';
    import { transformPlaylist } from '$lib/utils.js';
    import Audios from '$lib/components/Dynamic/Audios.svelte';

    export let data;

    let images : HTMLDivElement;

    $: project = data.content?.projects[0];
    $: reviews = data.projectReviews?.reviews;

    function scroll(event: Event){
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const percent = scrollTop/(scrollHeight - clientHeight) ;
        images.scrollTop = (images.scrollHeight - images.clientHeight) * percent; 
    }

    $: projectTracks = project?.audioFiles ? transformPlaylist([project]) : [];
   

        
</script>

<div class="max-w-screen-2xl px-5 sm:px-20">
    <div class="flex flex-col-reverse lg:flex-row w-full cursor-all-scroll ">
        <div class="w-full lg:w-2/5 shrink-0 lg:pr-28 pb-10  lg:max-h-[calc(100vh-7.5rem)] overflow-y-scroll pt-24 md:pt-40 no-scrollbar" bind:this={images}>
            {#each project.images as image}
                    <Image size="large" {image} />
             {/each}
        </div>
        <div class="px-5 pb-10 lg:max-h-[calc(100vh-7.5rem)] overflow-y-scroll no-scrollbar"  on:scroll={scroll} >
            <div class="pb-5 uppercase text-base  flex gap-2 max-h-screen pt-24 md:pt-40">
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
            {#if project.audioFiles}
                <Audios tracks={projectTracks} />
            {/if}
    
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

            {#if reviews}
            <div class="py-10 space-y-2 ">
                <h3 class="text-base uppercase font-medium">/Reviews</h3>
                <ul >
                    {#each reviews as review} 
                    <li class="text-base">   
                        <a href="/reviews/{review.slug}">{review.title}</a>
                    </li>	
                    {/each}
                </ul>   
            </div>
            {/if}
        </div>
    
    </div>
</div>
