import { GuitarTone } from './guitar-tone';
import { Tone } from './tone';
import {GuitarString} from "./string";
export class GuitarFret {
    private strings: GuitarString[] = [];

    constructor() {}

    public generate(stringKeys: any, prazec = 18) {
        this.strings = stringKeys.map((tone: Tone) => new GuitarString(tone, prazec));
        return this;
    }

    public transform(): Array<Array<GuitarTone>> {
        return this.strings.map((s: GuitarString) => s.get());
    }
}