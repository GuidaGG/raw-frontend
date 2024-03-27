import { writable } from "svelte/store";

export const currentView = writable(
    {
    title: 'friend',
    url: 'friend'
    }
);

export const contact = writable({
    info: ''
})

export const playlist = writable([])
export const currentTrack = writable(0)
