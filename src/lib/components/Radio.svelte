<script lang="ts">
    import Play from 'svelte-feathers/Play.svelte'
    import Pause from 'svelte-feathers/Pause.svelte';
    import ArrowLeft from 'svelte-feathers/ChevronLeft.svelte';
    import ArrowRight from 'svelte-feathers/ChevronRight.svelte';
    import { config } from '$lib/config';
    import type { Project, AudioFile } from '$lib/types';
    import Track from './Radio/Track.svelte';

    import { onMount
     } from 'svelte';
 

    export let radio: Project[]
    export let showPlaylist: boolean;
    export let hide: boolean;

    let loaded: boolean = false;
    let selected:number = 0;
    let player:HTMLAudioElement;
    let duration = 0;
	let time = 0;
    let paused = true;


    $: audioBuffers = [];
    $: durations = [];


    onMount( () => {
        player.load()
    });

    function format(seconds: number | string){
      if (isNaN(seconds)) return '...';
  
      const minutes: number = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      if (seconds < 10) seconds = '0' + seconds;
  
      return `${minutes}:${seconds}`;
    }

   const transformArray = (inputArray: Project[]) => {
    return inputArray.flatMap((item) => item.audioFiles.map((track) => (
        {
            title: track.title,
            artist: item.collaborations,
            project: item.slug,
            file: track.audioFile
 
        }))
            )
    };

    const preloadAudioBuffers = async (playlist: AudioTrack[]) => {
        audioBuffers = [];
        durations = []
        for (const audio of playlist) {
            if (typeof Audio !== "undefined") {
                const audioBuffer = new Audio();

                audioBuffer.src = `${config.apiUrl}${audio.file.url}`;
                audioBuffers.push(audioBuffer);
                loaded = true;

            /*     let duration = await getAudioDuration(audioBuffer);
                playlist[0].duration = duration; */

            }
            
        }
   
    };

/*     

    const getAudioDuration = async (audioBuffer: HTMLAudioElement) => {
     
        return new Promise((resolve, reject) => {
            if (audioBuffer){
                if (audioBuffer.readyState > 0) {
                    const duration = Math.floor(audioBuffer.duration);
                    resolve(duration);
                } else {
                    audioBuffer.addEventListener('loadedmetadata', () => {
                        const duration = Math.floor(audioBuffer.duration);
                        resolve(duration);
                    });
                    audioBuffer.addEventListener('error', reject);
                }
            }
        });
    };
     */

    $: playlist = transformArray(radio)
    $: currentAudio = playlist[selected];
    
    const changeAudio = (index:number) => {
        
        selected = index < playlist.length ? index >= 0 ? index : playlist.length-1 : 0  ;
        player.src = audioBuffers[selected].src;
        player.play();

    }   

    $: preloadAudioBuffers(playlist)



</script>  

 <div class="fixed w-full bottom-0 bg-raw-white  mx-auto border-raw-blue mt-10 border-t border-r border-l {hide ? 'hidden' : ''} {showPlaylist ? 'bottom-auto max-w-screen-2xl border-b w-full absolute top-14 md:top-40 left-1/2 -translate-x-1/2 mb-4 ' : ''}">
    <div class=" relative flex flex-col md:flex-row justify-between border-b border-raw-blue px-5 py-3 md:items-center">
        {#key loaded}
         <audio 
            bind:this={player} 
            bind:currentTime={time}
            bind:duration
            bind:paused
            preload="none" 
            src={`${config.apiUrl}${playlist[selected].file.url}`}
            tabindex="0" 
            on:ended={() => changeAudio(selected+1)}
        />
        {/key} 
        <Track audio={currentAudio}/>
        <div class="w-full pt-4 md:pt-0  md:w-auto flex md:flex-row gap-10 text-base justify-between items-center">
            <div class="absolute px-5 md:px-0 h-28 md:h-auto  md:relative flex gap-5 top-0 right-0 md:right-auto md:top-auto items-center">
                <ArrowLeft class="hidden md:block" on:click={() => changeAudio(selected-1)}/>
                {#if paused} 
                    <Play class="h-10 w-10 md:w-6 md:h-6" on:click={() =>player.play()}/> 
                {:else}
                    <Pause class="h-10 w-10 md:w-6 md:h-6" on:click={() => player.pause() }/>
                {/if}
                <ArrowRight class="hidden md:block" on:click={() => changeAudio(selected+1)}/>
            </div>
            
            <ul class="info flex list-none gap-1">
                <li >{format(time)}</li>
                <li> | </li>
                <li class="time">{format(duration)}</li>
            </ul>
        </div>
      
    </div>
    <div class="h-3">
        <progress class="w-full h-3 align-top" value={time / duration || 0} /> 
    </div>
   {#if showPlaylist}
    <div class=" overflow-y-scroll border-b border-raw-blue h-40 mb-3">

            {#each playlist as audio, index }
                {#if audio.file?.url}
    
                <div class={`flex justify-between items-center px-5 py-2 hover:bg-raw-blue-light hover:text-white hover:cursor-pointer hover:border-white ${index === selected ? 'bg-raw-blue-light text-white' : 'bg-raw-white'}`}>
                  <Track {audio} />

                    <div class="flex gap-10 items-center text-base">
                        <div class="flex">
                            {#if index === selected && !paused   }
                                <Pause on:click={() => player.pause() }/>
                            {:else}
                                <Play on:click={() => changeAudio(index)}/> 
                            {/if}
                        </div>
                
                       
                    </div> 
                </div>
                {/if}
            {/each}

    </div>  
    {/if}
</div> 

<style lang="postcss">
    progress[value]::-webkit-progress-bar {
       @apply bg-raw-white;
        border-bottom: #5D96FF solid 1px
    }

    progress[value]::-webkit-progress-value {
        background-color: #5D96FF
    }
</style>