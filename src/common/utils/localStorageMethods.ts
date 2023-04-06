export const LOGGED_IN = 'logged_in';
export const FAVORITES = 'favorites';

export function setValueToLocalStorage(key: string, value: unknown) {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export function getValueFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
        const localStorageKey = window.localStorage.getItem(key);

        if (localStorageKey) {
            return JSON.parse(localStorageKey);
        }
        return null;
    }
}

export function removeValueFromLocalStorage(key: string) {
    if (typeof window !== 'undefined') {
        return window.localStorage.removeItem(key);
    }
}
