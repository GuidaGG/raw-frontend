import { writable } from "svelte/store";
import type { AudioTrack } from "./types";

export const currentView = writable(
    {
    title: 'friend',
    url: 'friend'
    }
);

export const contact = writable({
    info: ''
})

export const playlist = writable<AudioTrack[]>([]);
export const currentTrack = writable(0)
export const reload = writable(true)
