import { bind } from '..';
import { expect } from 'chai';

describe('bind()', λ => {
	it('should bind when used as a simple decorator', next => {
		let c = {
			@bind
			foo() {
				return this;
			}
		};

		expect(c.foo()).to.equal(c);

		let p = c.foo;
		expect(p()).to.equal(c);

		let a = {};
		expect(c.foo.call(a)).to.equal(c);

		next();
	});

	it('should bind when used as a function', next => {
		let ctx = {},
			c = bind(function(){ return this; }, ctx);

		expect(c()).to.equal(ctx);

		let a = {};
		expect(c.call(a)).to.equal(ctx);

		next();
	});
});
