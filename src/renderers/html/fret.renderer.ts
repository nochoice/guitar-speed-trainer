import {GuitarString} from "../../guitar/string";
export class HtmlFretRenderer {
    constructor(private strings: string[][]) {};

    public getGraphic(): any {
        return this.strings
            .map(this.generateString.bind(this))
            .reduce((itt: Node, i: Node) => {
                itt.appendChild(i);
                return itt;
            }, document.createElement('div'));

    }

    private generateString(s: string[]) {
        const str = document.createElement('div');

         s.forEach(note => {
                const noteElem = document.createElement('span');
                // tslint:disable-next-line
                const text = document.createTextNode('|---' + note.padEnd(4, '-'));

                noteElem.appendChild(text);

                str.appendChild(noteElem);
            });

        return str;
    }
}
