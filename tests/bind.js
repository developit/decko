import { bind } from '..';
import { expect } from 'chai';

/*global describe,it*/

describe('bind()', () => {
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

	it('should bind when used as a decorator for a class method that invokes a decorated super method', next => {
		let aValue = 'a',
			bValue = 'b';

		class A {
			@bind
			f() {
				return {value: aValue, this: this};
			}
		}

		class B extends A {
			@bind
			f() {
				let superResult = super.f();
				return {value: bValue, superValue: superResult.value, this: this};
			}
		}

		let b = new B(),
			result;


		// call twice to take into consideration effect of super method call
		for (let i = 0; i < 2; i++) {
			result = b.f();
			expect(result.this).to.equal(b);
			expect(result.value).to.equal(bValue);
			expect(result.superValue).to.equal(aValue);
		}

		next();
	});
});
