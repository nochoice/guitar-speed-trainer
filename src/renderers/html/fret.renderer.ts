import { Tone } from './../../guitar/tone';
import {GuitarString} from "../../guitar/string";
export class HtmlFretRenderer {
    private nodesOfNotes;
    private activeNotes = [];

    constructor(private strings:Tone[][]) {
        this.nodesOfNotes = strings.map((string, index) => {
            return string.map((tone, indexKey) => {
                let wrapper = document.createElement('span');
                let textNode = document.createTextNode(tone.key + '' + tone.octave );

                wrapper.classList.add('key');

                wrapper.appendChild(textNode);
                return wrapper
            });
        });
    };

    public getGraphic():any {
        return this.strings
            .map(this.generateString.bind(this))
            .reduce((itt:Node, i:Node) => {
                itt.appendChild(i);
                return itt;
            }, document.createElement('div'));

    }

    public setNoteActive(string, fret) {
        this.activeNotes.push({string, fret});
        this.nodesOfNotes[string][fret].classList.add('active')
    }

    public unActivateNotes() {
        this.activeNotes.forEach(item => {
            this.nodesOfNotes[item.string][item.fret].classList.remove('active')
        })
    }

    private generateString(s:string[], indexString:number) {
        const str = document.createElement('div');

        s.forEach((note, index) => {
            const noteElem = document.createElement('span');
            let prefix = '|---';
            let sufix = '---';

            if (!index) {
                prefix = '';
                sufix = '|';
            }

            if (index === s.length - 1) {
                sufix += '||---';
            }

            let prefixNode = document.createTextNode(prefix);
            let sufixNode = document.createTextNode(sufix);

            console.log(this.nodesOfNotes);
            noteElem.appendChild(prefixNode);
            noteElem.appendChild(this.nodesOfNotes[indexString][index])
            noteElem.appendChild(sufixNode);
            str.appendChild(noteElem);
        });

        return str;
    }
}
