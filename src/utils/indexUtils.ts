export function getNextIndex(current: number, variants: number[]){
    return variants.reduce((prev, next) => prev + next, current);
}