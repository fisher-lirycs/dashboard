/// <reference types="react-scripts" />

declare interface Window {
    getCameraUrl: (userId: string, passWord: string, serialId: string) => Promise<void>;
}