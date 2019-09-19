export default class CanvasDrag {
    dragging = false;
    lastX = 0;
    lastY = 0;
    view = null;
    mouse = null;
    master = null;

    constructor(master) {
        this.master = master;
    }

    update() {
        const m = this.master.mouse;
        const v = this.master.view;

        if (m.w) {
            if (m.w < 0) {
                m.w += 10;
                v.scaleAt(m.x, m.y, 1 / 1.02);
                if (m.w > 0) {
                    m.w = 0;
                }
            } else if (m.w > 0) {
                m.w -= 10;
                v.scaleAt(m.x, m.y, 1.02);
                if (m.w < 0) {
                    m.w = 0;
                }
            }
        }
        if (m.buttonRaw) {
            if (!this.dragging) {
                this.dragging = true;
                this.lastX = m.x;
                this.lastY = m.y;
            } else {
                if (m.buttonRaw & 1) {
                    const dx = m.x - this.lastX;
                    const dy = m.y - this.lastY;
                    this.lastX = m.x;
                    this.lastY = m.y;
                    v.movePos(dx, dy);
                }
            }
        } else {
            if (this.dragging) {
                this.dragging = false;
            }
        }
    }
}
