<script lang="ts">
    import Image from '$lib/components/Image.svelte';
    import Sublist from '$lib/components/Sublist.svelte';
    import { formatDate } from '$lib/utils.js';
    import Play from 'svelte-feathers/Play.svelte'
    import Download from 'svelte-feathers/Download.svelte'
    import { page } from "$app/stores";
    export let data;

    let images : HTMLDivElement;
    $: project = data.content?.projects[0];


    function scroll(event: Event){
     
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const percent = scrollTop/(scrollHeight - clientHeight) ;
        images.scrollTop = (images.scrollHeight - images.clientHeight) * percent; 
  
    }

        
</script>

<div class="max-w-screen-2xl px-5 sm:px-20">
 
    <div class="flex flex-col-reverse md:flex-row w-full cursor-all-scroll ">
       
        <div class="w-full md:w-2/5 shrink-0 pr-28 pb-10  max-h-[calc(100vh-7.5rem)] overflow-y-scroll pt-24 md:pt-40 no-scrollbar" bind:this={images}>
            <!-- <pre>{JSON.stringify($page, null, 2)}</pre> -->
            {#each project.images as image}
                    <Image size="large" {image} />
             {/each}
        </div>
        <div class="px-5 pb-10 max-h-[calc(100vh-7.5rem)] overflow-y-scroll no-scrollbar"  on:scroll={scroll} >
           
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
                <div class="pt-10">
                    {#each project.audioFiles as audio}
            
                    <div class="flex gap-4 items-center border-t last-of-type:border-b  border-raw-blue  w-full py-2  px-5 justify-between">

                        <div class="text-base textwhite">{audio.title}</div>
                        <div class="flex gap-4">
                        <Play class="h-7 w-7 cursor-pointer"/>
                        <Download class="h-7 w-7 cursor-pointer"/>
                        </div>
                    </div> 
                    {/each}
                </div>
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
        </div>
    
    </div>
</div>
