import { Tone } from './tone';
import {GuitarString} from "./string";
export class GuitarFret {
    private strings: GuitarString[] = [];

    constructor() {}

    public generate(stringKeys: any, prazec = 18) {
        this.strings = stringKeys.map((tone: Tone) => new GuitarString(tone, prazec));
        return this;
    }

    public transform(): Array<Array<Tone>> {
        return this.strings.map((s: GuitarString) => s.get());
    }

}