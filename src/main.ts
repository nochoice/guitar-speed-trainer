import {Observable, ReplaySubject, BehaviorSubject} from 'rxjs';
import {take, map, withLatestFrom, tap} from 'rxjs/operators';
import {GuitarFret} from "./guitar/fret";
import {HtmlSceneRenderer} from "./renderers/html/scene.renderer";
import {HtmlFretRenderer} from "./renderers/html/fret.renderer";
import { of, combineLatest, interval} from 'rxjs';
import {switchMap} from "rxjs/internal/operators/switchMap";

const BPM = 70;
const FRET_SIZE = 12;
const strings$ = new BehaviorSubject(['e','h', 'g', 'd', 'a', 'e']);
const numOfFrets$ = new BehaviorSubject(FRET_SIZE);
const BPM$ = new BehaviorSubject(BPM);

const fret$ = combineLatest(strings$, numOfFrets$)
    .pipe(
        map(([str, num]) => new GuitarFret().generate(str, num).transform())
    );


document.getElementById('range').addEventListener('input', (e) => {
    const val = (<HTMLInputElement>e.target).value;

    BPM$.next(parseInt(val, 10));
})

const scene = new HtmlSceneRenderer();
scene.render();

const fretHTML$: Observable<HtmlFretRenderer> = fret$
    .pipe(
        map(n => new HtmlFretRenderer(n)),
        map(guitar => {
            scene.add(guitar.getGraphic());
            return guitar;
        })
    )

const interval$ = BPM$.pipe(
    switchMap(bpm => interval(60000/bpm))
);

interval$.pipe(
    withLatestFrom(fretHTML$),
    tap(([_, guitar]) => {
        guitar.unActivateNotes();
        guitar.setNoteActive(Math.floor(Math.random()*6), Math.floor(Math.random()*FRET_SIZE));
    })
)
.subscribe();


