type RandInt = (min: number, max: number) => number
export const randInt: RandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
