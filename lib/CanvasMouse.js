export default class CanvasMouse {

    x = 0;
    y = 0;
    buttonRaw = 0;
    buttonOnMasks = [0b1, 0b10, 0b100];
    buttonOffMasks = [0b110, 0b101, 0b011];
    active = false;
    eventNames = 'mousemove,mousedown,mouseup,mouseout,mouseover,mousewheel,DOMMouseScroll'.split(',');

    event(e, m) {
        const t = e.type;
        m.bounds = m.element.getBoundingClientRect();
        m.x = e.pageX - m.bounds.left - scrollX;
        m.y = e.pageY - m.bounds.top - scrollY;

        switch (e.type) {
            case 'mousedown':
                m.buttonRaw |= m.buttonOnMasks[e.which - 1];
                break;
            case 'mouseup':
                m.buttonRaw &= m.buttonOffMasks[e.which - 1];
                break;
            case 'mousewheel':
            case 'DOMMouseScroll':
                m.w = e.type === 'mousewheel' ? e.wheelDelta : -e.detail;
                break;
            default:
                if (t === 'mouseout') {
                    m.over = false;
                } else if (t === 'mouseover') {
                    m.over = true
                }
                break;
        }
    }

    down() {
        this.w += 10;
    }

    up() {
        this.w -= 10;
    }

    start(element) {
        this.element = element === undefined ? document : element;
        this.eventNames.forEach(name => document.addEventListener(name, e => {
            this.event(e, this);
        }));

        this.active = true;
    }
}
