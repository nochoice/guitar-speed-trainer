import {SceneRenderer} from "../interfaces";

const MAIN_WRAPPER_SELECTOR = 'app-wrapper';

export class HtmlSceneRenderer implements SceneRenderer {
    private wrapper: HTMLElement;

    constructor() {
        this.wrapper = document.createElement('div');
        this.wrapper.id = MAIN_WRAPPER_SELECTOR;

        const fret = document.createElement('div');
        fret.id = 'fret';

        this.wrapper.appendChild(fret);
    }

    public render() {
        document.body.appendChild(this.wrapper);
    }

    public add(graphics: Node, selector?: string) {
        this.wrapper.appendChild(graphics);
    }

    public destroy() {
        document.body.removeChild(this.wrapper);
    }
}