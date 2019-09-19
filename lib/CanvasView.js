export default class CanvasView {
    matrix = [1, 0, 0, 1, 0, 0];
    rotate = 0;
    scale = 1;

    pos = {
        x: 0, y: 0,
    };

    dirty = true;
    master = null;

    constructor(master) {
        this.master = master;
    }

    apply(ctx) {
        if (this.dirty) this.update();
        let m = this.matrix;
        ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }

    update() {
        const r = this.rotate;
        const s = this.scale;

        let xdx = Math.cos(r) * s;
        let xdy = Math.sin(r) * s;

        this.matrix = [xdx, xdy, -xdy, xdx, this.pos.x, this.pos.y];
        this.dirty = false;
    }

    movePos(x, y) {
        this.pos.x += x;
        this.pos.y += y;
        this.dirty = true;
    }

    scaleAt(x, y, sc) {
        if (this.dirty)
            this.update();

        this.scale *= sc;
        this.pos.x = x - (x - this.pos.x) * sc;
        this.pos.y = y - (y - this.pos.y) * sc;
        this.dirty = true;
    }

    display() {
        const w = this.master.w;
        const cw = this.master.cw;
        const h = this.master.h;
        const ch = this.master.ch;
        const image = this.master.image;

        const ctx = this.master.ctx;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, w, h);

        if (this.master.keys.ArrowLeft) {
            this.master.mouse.down();
        }

        if (this.master.keys.ArrowRight) {
            this.master.mouse.up();
        }

        this.master.drag.update();
        if (image.complete) {
            this.apply(ctx);
            ctx.drawImage(image, 0, 0);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
        }
    }
}
