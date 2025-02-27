<script lang="ts">
import type { AudioTrack } from "$lib/types";

export let audio: AudioTrack;
export let invert = false;
export let expand = false;
export let color: string = "bg-white"
</script>



<div class="block md:flex w-full items-center max-w-[80%] overflow-clip  text-left {$$restProps.class} relative" >
    <div class="fade sm:hidden w-[108%] absolute z-[1] h-8 top-0 {color}"></div>
    <h4 class="  pb-0 font-normal text-nowrap relative">{audio.title}
        
    </h4>

    <div class="text-xs text-nowrap flex items-center">
        {#if expand}
            <div class="md:border-l md:ml-2 md:pl-2  {!invert ? "border-raw-blue" : "border-white "}">
                {#if audio.project.title}
                    <a href="/projects/{audio.project.slug}/" class="pr-1 {invert? "text-white": "text-raw-blue"}"> {audio.project.title} </a>
                {/if}
                {#if audio.review?.title}
                    <a href="/reviews/{audio.review.slug}/" class="pr-1 {invert? "text-white": "text-raw-blue"}"> {audio.review.title} </a>
                {/if}
            </div>
        {/if}
        {#if audio.artist?.length}
                <span class="px-2">/</span>
                {#each audio.artist as artist, index}
                    <span class="pr-1 {index < audio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
                {/each}
 
        {/if}
    </div>
  
</div>
       