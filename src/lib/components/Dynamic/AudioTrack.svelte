<script lang="ts">
import type { AudioTrack } from "$lib/types";
import { playlist, currentTrack, reload } from '$lib/store.js';
import Play from 'svelte-feathers/Play.svelte'
import Download from 'svelte-feathers/Download.svelte'
import Track from "../Radio/Track.svelte";
import { config } from "$lib/config";

export let tracks: AudioTrack[];

let radio: AudioTrack[] = []

function playTrack(track: AudioTrack) {
       const index = radio.findIndex(audio => audio.file?.url === track.file?.url);
       if(index > -1){
            currentTrack.set(index);
       }else{
         const newPlaylist = [...radio, track];
         playlist.set(newPlaylist);
         currentTrack.set(newPlaylist.length -1);
       }  
       reload.set(true);
}

playlist.subscribe(value =>
    radio = value)

</script>

    {#each tracks as audio}
        <div class="flex gap-4 items-center border-t last-of-type:border-b  border-raw-blue  w-full py-2  px-5 justify-between">
            <Track {audio} invert />
            <div class="flex gap-4">
                {#if audio.download}
                <a  target="_blank" href={`${config.apiUrl}${audio.download.url}`} download="track.mp3">  <Download class="h-7 w-7 cursor-pointer"/></a>
                {/if}
            <Play class="h-7 w-7 cursor-pointer" on:click={() => playTrack(audio)}/>
          
            </div>
        </div> 
    {/each}
