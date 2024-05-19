import { atom } from 'recoil';
import { GameBoard } from "@repo/common/game"; 

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

export const gameState = atom<GameBoard | null>({
    key: 'gameState',
    default: null,
})

export const moveState = atom<number[]>({
    key: 'moveState',
    default: [-1, -1, -1],
})