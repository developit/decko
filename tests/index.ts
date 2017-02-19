import { bind, debounce, memoize } from '..';
class C {
    @bind
    foo() { }

    @debounce
    moo() { }

    @debounce(1000)
    mooWithCustomDelay() { }

    @memoize
    mem() { }

    @memoize(true)
    memWithConfig() { }
}