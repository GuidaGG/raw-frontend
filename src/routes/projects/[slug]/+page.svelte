<script lang="ts">
    import Image from '$lib/components/Image.svelte';
    import Sublist from '$lib/components/Sublist.svelte';
    import { playlist, currentTrack } from '$lib/store.js';
    import { formatDate } from '$lib/utils.js';
    import Play from 'svelte-feathers/Play.svelte'
    import Download from 'svelte-feathers/Download.svelte'
    import type { AudioTrack } from "$lib/types";
    import { transformPlaylist } from '$lib/utils.js';
    export let data;

    let images : HTMLDivElement;
    let radio: AudioTrack[] = []

    $: project = data.content?.projects[0];

    function scroll(event: Event){
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const percent = scrollTop/(scrollHeight - clientHeight) ;
        images.scrollTop = (images.scrollHeight - images.clientHeight) * percent; 
    }

    $: projectTracks = project?.audioFiles ? transformPlaylist([project]) : [];
   

    playlist.subscribe(value =>
    radio = value)

    function playTrack(track: AudioTrack) {
       const index = radio.findIndex(audio => audio.file?.url === track.file?.url);
       if(index > -1){
            currentTrack.set(index)
       }else{
         const newPlaylist = [...radio, track]
         playlist.set(newPlaylist) 
         currentTrack.set(newPlaylist.length -1)
       }  
    }
        
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
                <div class="pt-10">
                    {#each projectTracks as audio}

                    <div class="flex gap-4 items-center border-t last-of-type:border-b  border-raw-blue  w-full py-2  px-5 justify-between">
                        <div class="text-base textwhite">{audio.title}</div>
                        <div class="flex gap-4">
                        <Play class="h-7 w-7 cursor-pointer" on:click={() => playTrack(audio)}/>
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
