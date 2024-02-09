import { writable } from "svelte/store";

export const currentView = writable(
    {
    title: '',
    url: ''
    }
);

