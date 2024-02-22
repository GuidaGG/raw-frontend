<script lang="ts">
import type { AudioTrack } from "$lib/types";

export let audio: AudioTrack;

</script>


        
<div class="block md:flex w-4/5  md:w-full gap-3 items-center ">
    <h4 class="md:border-r border-raw-blue pr-3  pb-0 font-normal">{audio.title}</h4>
    <div class="text-base">
        {#each audio.artist as artist, index}

            <span class="pr-1 {index < audio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
        {/each}
    </div>
</div>
       