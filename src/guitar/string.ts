import { Tone } from './tone';
import {NOTES} from "../constants";

export class GuitarString {
    private step: Tone[] = [];

    constructor(private tone: Tone, private num: number) {
        const indexOfNote = NOTES.indexOf(tone.key);
        let octave = tone.octave;

        for (let i=0; i<num; i++) {
            
            if (i+indexOfNote === NOTES.length)  {
                octave++;
            }
            let index = (i+indexOfNote) % NOTES.length;
            let key = NOTES[index];
            this.step.push(new Tone(key, octave));
        }
    }

    public get(): Tone[] {
        return this.step;
    }
}