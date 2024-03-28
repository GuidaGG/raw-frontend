<script lang="ts">
import type { AudioTrack } from "$lib/types";

export let audio: AudioTrack;
export let invert = false;
export let expand = false;
</script>



<div class="block md:flex w-4/5  md:w-full gap-3 items-center max-w-[80%] overflow-clip  text-left">
    <h4 class="md:border-r {!invert ? "border-raw-blue" : "border-white"} pr-3 pb-0 font-normal text-nowrap">{audio.title}</h4>
    {#if expand}
    <div class="text-xs text-nowrap">
        {#if audio.project.title}
            <a href="/projects/{audio.project.slug}/" class="pr-1 {invert? "text-white": "text-raw-blue"}"> {audio.project.title} </a>
        {/if}
        {#if audio.review.title}
            <a href="/reviews/{audio.review.slug}/" class="pr-1 {invert? "text-white": "text-raw-blue"}"> {audio.review.title} </a>
        {/if}
        {#if audio.artist?.length}
                <span class="pr-1">/</span>
                {#each audio.artist as artist, index}
                    <span class="pr-1 {index < audio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
                {/each}
 
        {/if}
    </div>
    {/if}
</div>
       