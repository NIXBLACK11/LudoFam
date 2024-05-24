import { atom } from 'recoil';

export const codeState = atom<string>({
    key: 'codeState',
    default: '',
});

export const socketState = atom<WebSocket | null>({
    key: 'socketState',
    default: null,
});

export const colorState = atom<string>({
    key: 'colorState',
    default: 'black',
});