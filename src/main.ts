
import {Observable, interval, ReplaySubject, BehaviorSubject} from 'rxjs';
import {take, map} from 'rxjs/operators';
import {GuitarFret} from "./guitar/fret";
import {HtmlSceneRenderer} from "./renderers/html/scene.renderer";
import {HtmlFretRenderer} from "./renderers/html/fret.renderer";

const strings = ['e','h', 'g', 'd', 'a', 'e'];

const fret$ = new BehaviorSubject(new GuitarFret().generate(strings, 18).transform());

const scene = new HtmlSceneRenderer();
scene.render();
// new HtmlSceneReenderer().destroy();

fret$.subscribe(n => {
    const guitar = new HtmlFretRenderer(n).getGraphic();
    scene.add(guitar);
});
