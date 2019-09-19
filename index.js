import CanvasMouse from "./lib/CanvasMouse";
import CanvasDrag from "./lib/CanvasDrag";
import CanvasView from "./lib/CanvasView";

export default class CanvasZoom {
    w = null;
    h = null;
    cw = null;
    ch = null;
    canvas = null;
    ctx = null;
    image = null;

    RESIZE_DEBOUNCE_TIME = 100;
    timeoutHandler = null;
    fresh = true;

    mouse = new CanvasMouse();
    drag = new CanvasDrag(this);
    view = new CanvasView(this);

    keys = [];

    keyEvent(e) {
        this.keys[e.code] = e.type === 'keydown';
    }

    constructor(image) {
        this.image = new Image;
        this.image.src = image;

        ['keydown', 'keyup'].forEach(k => {
            document.addEventListener(k, e => {
                this.keyEvent(e);
            });
        });

        this.canvas = this.getCanvas();
        this.mouse.start(canvas, true);
        this.resize();
        window.addEventListener('resize', this.resize);
        requestAnimationFrame(t => {
            this.update(t, this);
        });
    }

    getCanvas() {
        return document.getElementById('canvas');
    }

    onResize() {
        const font = {
            font: '28px Arial',
            textAlign: 'center',
            textBaseline: 'middle',
        };

        Object.keys(font).forEach(key => this.ctx[key] = font[key]);
    }

    resize() {
        if (this.canvas === undefined) {
            this.canvas = this.getCanvas()
        }
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = canvas.getContext('2d');

        this.cw = (this.w = this.canvas.width) / 2;
        this.ch = (this.h = this.canvas.height) / 2;

        clearTimeout(this.timeoutHandler);
        if (this.fresh) {
            this.onResize()
        } else {
            this.timeoutHandler = setTimeout(this.onResize, this.RESIZE_DEBOUNCE_TIME)
        }
        this.fresh = false;
    }

    update(timer, vm) {
        if (!this.view) return;
        vm.view.display();
        requestAnimationFrame(t => {
            this.update(t, vm);
        })
    }
}
