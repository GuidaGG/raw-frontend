<script lang="ts">
    import Play from 'svelte-feathers/Play.svelte'
    import Pause from 'svelte-feathers/Pause.svelte';
    import { config } from '$lib/config';

    export let radio

    let selected:number = 0;
    let player:HTMLAudioElement;

   const transformArray = (inputArray) => {
    return inputArray.flatMap((item) => item.audioFiles.map((track) => (
        {
            title: track.title,
            artist: item.collaborations,
            project: item.slug,
            file: track.audioFile
 
        }))
            )
    };
    
    const playlist = transformArray(radio)

    $: currentAudio = playlist[selected];
    
    const changeAudio = (index:number) => {
        selected = index;
        player.src = `${config.apiUrl}${playlist[selected].file.url}`;
        player.load();
        player.play();

    }

</script>   

 <div class="bg-raw-white max-w-screen-2xl mx-auto  border border-raw-blue">
    <div class="flex justify-between border-b border-raw-blue p-5">
        <audio bind:this={player} preload="none" tabindex="0" src="" />
        <div class="flex gap-3">
            <h4 class="border-r border-raw-blue pr-3">{currentAudio.title}</h4>
            <div class="text-base">
                {#each currentAudio.artist as artist, index}
                    <span class="{index < currentAudio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
                {/each}
            </div>
        </div>
        <div class="flex gap-10 text-base">
            <div class="flex"><Play /> <Pause /></div>
            <div>00:00</div>
        </div>
    </div>
    <div class="max-h-36 overflow-y-scroll">

            {#each playlist as audio, index }
                {#if audio.file?.url}
                <source src={`${config.apiUrl}${audio.file?.url}`} />
                <div class="flex justify-between items-center p-5 hover:bg-raw-blue hover:text-white hover:cursor-pointer hover:border-white">

                <div class="flex gap-3 items-center">
                        <h4 class="border-r border-raw-blue pr-3">{audio.title}</h4>
                        <div class="text-base">
                            {#each audio.artist as artist, index}
                                <span class="{index < audio.artist.length-1 ? "after:content-[',']" : "" }">{artist.name}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="flex gap-10 items-center text-base">
                        <div class="flex"><Play on:click={() => changeAudio(index)}/> <Pause /></div>
                        <div>00:00</div>
                    </div> 
                </div>
                {/if}
            {/each}

    </div>
   
      
</div> 