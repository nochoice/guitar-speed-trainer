import { GuitarTone } from './guitar-tone';
import { Tone } from './tone';
import {NOTES} from "../constants";

export class GuitarString {
    private step: GuitarTone[] = [];

    constructor(private tone: Tone, private num: number) {
        const indexOfNote = NOTES.indexOf(tone.key);
        let octave = tone.octave;

        for (let i=0; i<num; i++) {
            
            octave = (i+indexOfNote === NOTES.length) ? octave++ : octave;
            // if (i+indexOfNote === NOTES.length)  {
            //     octave++;
            // }

            const index = (i+indexOfNote) % NOTES.length;
            const key = NOTES[index];
            const gt = new GuitarTone(new Tone(key, octave));

            gt.position = [0, i];
            this.step.push(gt);
        }
    }

    public get(): GuitarTone[] {
        return this.step;
    }
}