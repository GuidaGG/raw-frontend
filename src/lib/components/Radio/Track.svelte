<script lang="ts">
import type { AudioTrack } from "$lib/types";

export let audio: AudioTrack;
export let invert = false;
</script>



<div class="block md:flex w-4/5  md:w-full gap-3 items-center max-w-[80%] overflow-clip">
    <h4 class="md:border-r {invert ? "border-raw-blue" : "border-white"} pr-3  pb-0 font-normal text-nowrap">{audio.title}</h4>
    <div class="text-base text-nowrap">
        <span class="pr-1" >{audio.project}</span>
       <!--  {#each audio.artist as artist, index}
            <span class="pr-1 {index < audio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
        {/each} -->
    </div>
</div>
       