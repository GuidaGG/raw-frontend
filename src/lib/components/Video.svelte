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
                <progress class="w-full h-1" value={time / duration || 0} />
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
        background-color: white;
        border-bottom: #5D96FF solid 1px
    }

    progress[value]::-webkit-progress-value {
        background-color: #5D96FF
    }
</style>