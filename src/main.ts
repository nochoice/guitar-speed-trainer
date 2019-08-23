import {Observable, BehaviorSubject, combineLatest, interval, NEVER} from 'rxjs';
import {map, withLatestFrom, share} from 'rxjs/operators';
import {GuitarFret} from "./guitar/fret";
import {HtmlSceneRenderer} from "./renderers/html/scene.renderer";
import {HtmlFretRenderer} from "./renderers/html/fret.renderer";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {Tone} from './guitar/tone';
import { partShift, partReverse, partShiftVertical } from './modificators/modificators';

const BPM = 400;
const FRET_SIZE = 20;

let part = [
    [5,1], [2,5], [1,1]
];

let part2 = [
    [1,1], [2,1], [3,1]
];

part2 = [...part2, ...partShiftVertical(part2, 1)];
part2 = [...part2, ...partShift(part2, 5)];

part = [...part, ...partShift(part, 5), ...partShift(part, 1), ...partShift(part, 6), ...partShift(part, 2)];
// part = [...part, ...partReverse(part)];

const strings = [
    new Tone('e', 4),
    new Tone('h', 3),
    new Tone('g', 3),
    new Tone('d', 3),
    new Tone('a', 2),
    new Tone('e', 2)
];

const strings$ = new BehaviorSubject(strings);
const part$ = new BehaviorSubject(part2);
const numOfFrets$ = new BehaviorSubject(FRET_SIZE);
const BPM$ = new BehaviorSubject(BPM);

let isRunning = true; 
const isRunning$ = new BehaviorSubject(isRunning); 

const fret$ = combineLatest(strings$, numOfFrets$)
    .pipe(
        map(([str, num]) => new GuitarFret().generate(str, num).transform())
    );


document.getElementById('range').addEventListener('input', (e) => {
    const val = (<HTMLInputElement>e.target).value;

    BPM$.next(parseInt(val, 10));
});

document.getElementById('start-stop').addEventListener('click', (e) => {
    isRunning = !isRunning;
    isRunning$.next(isRunning);
    part$.next(part2);
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

const run$ = isRunning$.pipe(
    switchMap(isRunning => isRunning ? interval$ : NEVER)
);


const app$ = run$.pipe(
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
// app$.subscribe(data => {
//     console.log(data);
// })

