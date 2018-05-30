import {NOTES} from "../constants";

export class GuitarString {
    private step: string[] = [];

    constructor(private key: string, private num: number) {
        const indexOfNote = NOTES.indexOf(key);
        for (let i=0; i<num; i++) {
            let index = (i+indexOfNote) % NOTES.length;
            let note = NOTES[index];
            this.step.push(note);
        }

        // console.log(this.step);
    }

    public get(): string[] {
        return this.step;
    }
}