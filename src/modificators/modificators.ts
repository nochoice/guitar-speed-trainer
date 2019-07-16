export const partDuplicate = (part) => [...part, ...part];
export const partReverse = (part) => [...part].reverse();

export const partShift = (part, num) => {
    return part.map(item => {
        let o = [...item];
        o[1] = o[1] + num;
        return o;
    });
}