<script lang="ts">
    import VideoPlay from 'svelte-feathers/Play.svelte'
    import VideoPause from 'svelte-feathers/Pause.svelte';
    import type { Media } from "$lib/types";
    import { config } from "$lib/config";


    export let video: Media

    let time: number = 0;
    let duration: number;
    let paused: boolean = true;
    let player: HTMLVideoElement;

    function format(seconds: number | string): string {
      if (isNaN(seconds)) return '...';
  
      const minutes: number = Math.floor(seconds / 60);
      seconds = Math.floor(seconds % 60);
      if (seconds < 10) seconds = '0' + seconds;
  
      return `${minutes}:${seconds}`;
    }

    const play = (e) => {
        if(paused){
        player.play()
        }else{
        player.pause()
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

  </script>


<div class="relative">
    <div class="bg-raw-white">
        <video
            src={`${config.apiUrl}${video.url}`} 
            bind:this={player}
            bind:currentTime={time}
            bind:duration
            bind:paused
            on:click={play}
            class="max-w-[99.9%]"
        >
            <track kind="captions" />
        </video>

        <div class="controls w-full py-3" >
            <div class="flex items-center justify-between px-5 text-xs gap-3 h-8 ">
                <button on:click={play}>
                    {#if paused}
                        <VideoPlay class="h-6 w-6"/>
                    {:else}
                        <VideoPause class="h-6 w-6"/>
                    {/if}
                </button>
                <progress class="w-full h-1 cursor-pointer" value={time / duration || 0} on:click={handleProgressBarClick} />
                <ul class="info flex list-none gap-1">
                    <li >{format(time)}</li>
                    <li> | </li>
                    <li class="time">{format(duration)}</li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
       progress[value]::-webkit-progress-bar {
        @apply bg-gray-100;
    }

    progress[value]::-webkit-progress-value {
        @apply bg-raw-blue;
    }
</style>