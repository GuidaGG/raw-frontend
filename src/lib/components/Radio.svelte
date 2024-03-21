<script lang="ts">
    import Play from 'svelte-feathers/Play.svelte'
    import Pause from 'svelte-feathers/Pause.svelte';
    import ArrowLeft from 'svelte-feathers/ChevronLeft.svelte';
    import ArrowRight from 'svelte-feathers/ChevronRight.svelte';
    import { config } from '$lib/config';
    import type { Project, AudioFile, AudioTrack } from '$lib/types';
    import Track from './Radio/Track.svelte';
    import { playlist, currentTrack } from '$lib/store';


    import { onMount
     } from 'svelte';
 

    export let radio: Project[]
    export let showPlaylist: boolean;
    export let hide: boolean;
    export let projectOverview: boolean;

    let loaded: boolean = false;
    let selected:number;
    let player:HTMLAudioElement;
    let duration = 0;
	let time = 0;
    let paused = true;
    let tracks: AudioTrack[];

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

/*    const transformArray = (inputArray: Project[]) => {
    return inputArray.flatMap((item) => item.audioFiles.map((track) => (
        {
            title: track.title,
            artist: item.collaborations,
            project: item.slug,
            file: track.audioFile
 
        }))
            )
    };
 */
    const preloadAudioBuffers = async (playlist: AudioTrack[]) => {
        console.log("preload buffer")
      
        for (const audio of playlist) {
            if(!audioBuffers.find(track => track.src === `${config.apiUrl}${audio.file.url}`)){
            if (typeof Audio !== "undefined") {
                const audioBuffer = new Audio();
                audioBuffer.src = `${config.apiUrl}${audio.file.url}`;
                audioBuffers.push(audioBuffer);
                loaded = true;

            /*     let duration = await getAudioDuration(audioBuffer);
                playlist[0].duration = duration; */

            }
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
  
    playlist.subscribe(value => {
        tracks = value
    });
    currentTrack.subscribe(value => {
        selected = value
    });

    $: currentAudio = tracks[selected];
    
    const changeIndex = (index:number) => {
        const selected = index < tracks.length ? index >= 0 ? index : tracks.length-1 : 0  ;
        currentTrack.set(selected)
    }

    const changeAudio = (index:number) => {
        if(player){
            player.src = audioBuffers[index].src;
            player.play();  
        }
    }   


  
    $: preloadAudioBuffers(tracks)
    $: changeAudio(selected);


</script>  



 <div class="fixed {projectOverview ? "w-full" : "w-4/5"} bottom-0 bg-raw-blue  mx-auto border-raw-blue  border-t {hide ? 'hidden' : ''} {showPlaylist ? 'bg-raw-white text-raw-blue bottom-auto max-w-[calc(100%-10rem)] border-y md:border w-full absolute top-14 md:-top-28 left-1/2 -translate-x-1/2 mb-4' : ' text-white'}">

     <div class=" relative flex flex-col md:flex-row justify-between border-b border-raw-blue px-5 py-3 md:items-center">
       {#key loaded}
         <audio 
            bind:this={player} 
            bind:currentTime={time}
            bind:duration
            bind:paused
            preload="none" 
            src={`${config.apiUrl}${tracks[selected].file.url}`}
            tabindex="0" 
            on:ended={() => changeIndex(selected+1)}
        />
        {/key} 
        <Track audio={currentAudio} invert={showPlaylist}/>
        <div class="w-full pt-4 md:pt-0  md:w-auto flex md:flex-row gap-10 text-base justify-between items-center">
            <div class="absolute px-5 md:px-0 h-28 md:h-auto  md:relative flex gap-5 top-0 right-0 md:right-auto md:top-auto items-center">
                <ArrowLeft class="hidden md:block" on:click={() => changeIndex(selected-1)}/>
                {#if paused} 
                    <Play class="h-10 w-10 md:w-6 md:h-6" on:click={() =>player.play()}/> 
                {:else}
                    <Pause class="h-10 w-10 md:w-6 md:h-6" on:click={() => player.pause() }/>
                {/if}
                <ArrowRight class="hidden md:block" on:click={() => changeIndex(selected+1)}/>
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

            {#each tracks as audio, index }
                {#if audio.file?.url}
    
                <div class={`flex justify-between items-center px-5 py-2 text-raw-blue hover:bg-raw-blue-light hover:text-white hover:cursor-pointer hover:border-white ${index === selected ? 'bg-raw-blue-light text-white' : 'bg-raw-white'}`}>
                  <Track {audio} invert />

                    <div class="flex gap-10 items-center text-base">
                        <div class="flex">
                            {#if index === selected && !paused   }
                                <Pause on:click={() => player.pause() }/>
                            {:else}
                                <Play on:click={() => changeIndex(index)}/> 
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
        border-bottom: #aec8fc solid 2px
    }

    progress[value]::-webkit-progress-value {
        background-color: #aec8fc
    }
</style> 