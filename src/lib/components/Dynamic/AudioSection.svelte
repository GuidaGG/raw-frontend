<script lang="ts">
    import type { AudioSection } from "$lib/types";
    import { transformTracks} from '$lib/utils.js';
    import AudioTrack from "./AudioTrack.svelte";

    export let section: AudioSection

     $: viewTracks = section?.tracks ? transformTracks([section]) : []; 
</script>

<div class="w-full sm:w-2/3 bg-white {section.align}">
    {#if section.tracks}
        <AudioTrack tracks={viewTracks} />
    {/if}
</div> 
