/// <reference types="react-scripts" />

interface Window {
  ethereum: any
}

type Nullable<T extends any> = {
  [P in keyof T]: T[P] | null;
};

declare module '@metamask/jazzicon' {
  export default function (diameter: number, seed: number): HTMLElement;
}
