<script lang="ts">
    import type { AudioSection } from "$lib/types";
    import { playlist, currentTrack, reload } from '$lib/store.js';
    import { transformTracks} from '$lib/utils.js';
    import AudioTrack from "./AudioTrack.svelte";

    export let section: AudioSection
    let radio: AudioTrack[] = []
    let newTracks: AudioTrack[] = [];

     $: viewTracks = section?.tracks ? transformTracks([section]) : []; 

    playlist.subscribe(value =>
    radio = value)

    async function addAll() {
    if (!viewTracks.length) return; // Exit if viewTracks is empty

    // Step 1: Pause the current audio before making changes
    const audioElement = document.querySelector('audio'); // Adjust if needed
    if (audioElement) {
        try {
            await audioElement.pause(); // Pause before modifying the playlist
        } catch (e) {
            console.warn("Pause error:", e); // Handle potential issues
        }
    }

    // Step 2: Remove tracks in `radio` that exist in `viewTracks`
    radio = radio.filter(track =>
        !viewTracks.some(viewTrack => viewTrack.file?.url === track.file?.url)
    );

    // Step 3: Add all `viewTracks` to the playlist
    const newPlaylist = [...radio, ...viewTracks];
    playlist.set(newPlaylist);

    // Step 4: Play the first track from `viewTracks`
    const firstNewTrackIndex = newPlaylist.findIndex(t => t.file?.url === viewTracks[0].file?.url);
    if (firstNewTrackIndex !== -1) {
        currentTrack.set(firstNewTrackIndex);
        
        // Wait a moment to let the new track load, then play
        setTimeout(() => {
            if (audioElement) {
                audioElement.play().catch(err => console.warn("Play error:", err));
            }
        }, 100);
        
        reload.set(true);
    }
}


</script>

<div class="w-full sm:w-2/3  {section.alignAudio} flex flex-col">
    {#if viewTracks.length > 1} 
        <button aria-label="Play all tracks" class="button border-2 text-center shadow-inner transition-all duration-200 shadow-raw-blue sm:px-2 rounded-full text-base uppercase w-full md:max-w-fit inverted bg-raw-blue hover:no-underline border-raw-blue text-raw-white hover:text-raw-blue hover:bg-raw-white m-4 place-self-end" on:click={addAll}>play all</button>
    {/if}
    <div class="bg-white">
        {#if section.playlist_content}
        <div class="px-5 py-2">
            { @html section.playlist_content}
        </div>
        {/if}
        {#if section.tracks}
            <AudioTrack tracks={viewTracks} />
        {/if}
    </div>
</div> 
