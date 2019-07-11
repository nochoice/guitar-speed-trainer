import {Observable, ReplaySubject, BehaviorSubject} from 'rxjs';
import {map, withLatestFrom, tap, share, publish} from 'rxjs/operators';
import {GuitarFret} from "./guitar/fret";
import {HtmlSceneRenderer} from "./renderers/html/scene.renderer";
import {HtmlFretRenderer} from "./renderers/html/fret.renderer";
import { of, combineLatest, interval} from 'rxjs';
import {switchMap} from "rxjs/internal/operators/switchMap";
import { Tone } from './guitar/tone';

const BPM = 70;
const FRET_SIZE = 12;
const part = [
    [0,0], [0,1], [0,3],
    [1,0], [1,1], [0,2], [1,2], [1,3],
    [1,0], [4,1], [1,2], [1,3],
];

const strings = [
    new Tone('e', 4),
    new Tone('h', 3),
    new Tone('g', 3),
    new Tone('d', 3),
    new Tone('a', 2),
    new Tone('e', 2)
];

const strings$ = new BehaviorSubject(strings);
const part$ = new BehaviorSubject(part);
const numOfFrets$ = new BehaviorSubject(FRET_SIZE);
const BPM$ = new BehaviorSubject(BPM);
const isRunning$ = new BehaviorSubject(false); 

const fret$ = combineLatest(strings$, numOfFrets$)
    .pipe(
        map(([str, num]) => new GuitarFret().generate(str, num).transform())
    );


document.getElementById('range').addEventListener('input', (e) => {
    const val = (<HTMLInputElement>e.target).value;

    BPM$.next(parseInt(val, 10));
});

(<any>document.getElementById('range')).value = BPM;

const scene = new HtmlSceneRenderer();
scene.render();

const fretHTML$: Observable<HtmlFretRenderer> = fret$
    .pipe(
        map(n => new HtmlFretRenderer(n)),
        map(guitar => {
            scene.add(guitar.getGraphic());
            return guitar;
        })
    );

const interval$ = BPM$.pipe(
    switchMap(bpm => interval(60000/bpm))
);

const app$ = interval$.pipe(
    withLatestFrom(fretHTML$, strings$, part$),
    share()
);

app$.subscribe(([_, guitar, strings, part]) => {
    guitar.unActivateNotes();
    guitar.setNoteActive(part[_%part.length][0], part[_%part.length][1]);
});

// app$.subscribe(data => {
//     console.log(data);
// })

