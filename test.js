class B {
    a = null;

    constructor(a) {
        this.a = a;
    }

    f(x) {
        this.a.x = x ;
    }
}

class C {
    a = null;

    constructor(a) {
        this.a = a;
    }

    f(x) {
        this.a.b.f(x);
    }
}

class A {
    x = 1;
    b = new B(this);
    c = new C(this);
}

const a = new A();
console.log(a.x);
a.c.f(2)
console.log(a.x);

