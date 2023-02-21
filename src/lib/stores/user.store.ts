import { writable } from 'svelte/store';
import type { User } from '@/types';

function createUserStore() {
	const { subscribe, set, update } = writable<User | null>(null);

	return {
		subscribe,
		updateUser: (user: User) => update(() => user),
		setUser: (user: User) => set(user),
		logout: () => set(null)
	};
}

export const user = createUserStore();
