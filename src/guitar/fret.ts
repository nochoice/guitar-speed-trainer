import {GuitarString} from "./string";
export class GuitarFret {
    private strings: any[] = [];

    constructor() {}

    public generate(stringKeys: string[], prazec = 18) {
        this.strings = stringKeys.map(key => new GuitarString(key, prazec));

        return this;
    }

    public transform(): Array<Array<string>> {
        return this.strings.map((s: GuitarString) => s.get());
    }

}