import { writable } from 'svelte/store';

// Create a writable store
export const sharedData = writable('');

// Update the store value
export const updateData = (newValue) => {
    sharedData.set(newValue);
};