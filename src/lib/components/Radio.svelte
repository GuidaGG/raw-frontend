<script lang="ts">
    import Play from 'svelte-feathers/Play.svelte'
    import Pause from 'svelte-feathers/Pause.svelte';
    import ArrowLeft from 'svelte-feathers/ChevronLeft.svelte';
    import ArrowRight from 'svelte-feathers/ChevronRight.svelte';
    import ArrowUp from 'svelte-feathers/BarChart2.svelte';
    import { config } from '$lib/config';
    import type { Project, AudioFile, AudioTrack } from '$lib/types';
    import Track from './Radio/Track.svelte';
    import { playlist, currentTrack } from '$lib/store';
    import Arrow from './Arrow.svelte';

    import { onMount
     } from 'svelte';
 

    export let hide: boolean;
    export let projectOverview: boolean;

    let loaded: boolean = false;
    let selected:number;
    let player:HTMLAudioElement;
    let duration = 0;
	let time = 0;
    let paused = true;
    let tracks: AudioTrack[];
    let isOpen = false;

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

    
    function handleProgressBarClick(event: Event) {
        const progressBar = event.target;
        const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const clickedPercentage = clickPosition / progressBarWidth;
        time = duration * clickedPercentage;
        player.currentTime = time;
    }

    $: preloadAudioBuffers(tracks)
    $: changeAudio(selected);


</script>  



 <div

    aria-label="open radio" 
    class="fixed {projectOverview ? "w-full" : "w-full md:w-4/5"} bottom-0 bg-raw-blue  mx-auto border-raw-blue  border-t {hide ? 'hidden' : ''} text-white ease-in-out duration-300 transition-[top] {isOpen ? 'top-[50vh]' : 'top-[calc(100dvh-6.6rem)] sm:top-[calc(100dvh-4rem)]'}" 
    >
  
     <div class="w-full relative flex flex-col md:flex-row justify-between border-b border-raw-blue px-5 py-3 md:items-center">
        <button aria-label="View Playlist" on:click={(e) => (isOpen = !isOpen)} class="rounded-full">
           <ArrowUp class="rotate-90 h-8 w-8 md:h-6 md:w-6 {isOpen ? "rotate-180" : ""} mr-4 transition-all duration-3000" />
        </button>
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
        <Track audio={currentAudio} invert expand class="pt-2 sm:pt-0 h-16 sm:h-auto overflow-hidden"/>
        <div class="w-full pt-3 sm:pt-0 md:w-auto flex md:flex-row gap-10 text-base justify-between items-center">
            <div class="absolute  px-5 md:px-0  md:h-auto  md:relative flex gap-5 top-3 right-0 md:right-auto md:top-auto items-center">

                <button on:click={() => changeIndex(selected-1)} aria-label="Previous Track" class="cursor-pointer">
                    <Arrow class="stroke-white  w-6 h-6" />
                </button>
                {#if paused} 
                    <button on:click={() =>player.play()}>
                        <Play class="h-8 w-8 md:w-6 md:h-6 stroke-2" /> 
                    </button>
                {:else}
                    <button  on:click={() => player.pause() }>
                        <Pause class="h-8 w-8md:w-6 md:h-6"/>
                    </button>
                {/if}
                <button on:click={() => changeIndex(selected-1)} aria-label="Previous Track" class="cursor-pointer">
                    <Arrow class="stroke-white rotate-180 w-6 md:h-6"  on:click={() => changeIndex(selected+1)} />
                </button>
             
            </div>
            
            <ul class="info flex list-none gap-1 w-24 sm:justify-end">
                <li >{format(time)}</li>
                <li> | </li>
                <li class="time">{format(duration)}</li>
            </ul>
        </div>
      
    </div>
    <div class="h-3">
        <progress class="w-full h-3 align-top cursor-pointer border-raw-blue border-b" value={time / duration || 0}  on:click={handleProgressBarClick} aria-label="skip through track"/> 
    </div>

    <div class=" overflow-y-scroll border-b border-raw-blue h-[50vh]">
            {#each tracks as audio, index }
                {#if audio.file?.url}
    
                <div class={`flex justify-between items-center px-5 py-2 text-raw-blue hover:bg-raw-blue-light  hover:cursor-pointer  ${index === selected ? 'bg-raw-blue-light ' : 'bg-raw-white'}`}>
                  <Track {audio} expand />

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

</div> 

<style lang="postcss">
    progress[value]::-webkit-progress-bar {
       @apply bg-raw-white;
    }

    progress[value]::-webkit-progress-value {
        background-color: #aec8fc
    }
</style> 