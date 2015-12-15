import { memoize } from '..';
import { expect } from 'chai';

/*global describe,it*/

describe('memoize()', () => {
	it('should memoize when used as a simple decorator', next => {
		let c = {
			@memoize
			foo(key) {
				c[key] = (c[key] || 0) + 1;
			}
		};

		expect(c).not.to.have.property('a');
		c.foo('a');
		expect(c).to.have.property('a', 1);
		c.foo('a');
		c.foo('a');
		expect(c).to.have.property('a', 1);

		next();
	});

	it('should memoize when used as a function', next => {
		let c = memoize( key => {
				m[key] = (m[key] || 0) + 1;
			}),
			m = {};

		expect(m).not.to.have.property('a');
		c('a');
		expect(m).to.have.property('a', 1);
		c('a');
		c('a');
		expect(m).to.have.property('a', 1);

		next();
	});

	it('should memoize when called without arguments', next => {
		let c = memoize( key => {
				m[key] = (m[key] || 0) + 1;
			}),
			m = {};

		expect(m).not.to.have.property('undefined');
		c();
		expect(m).to.have.property('undefined', 1);
		c();
		c();
		expect(m).to.have.property('undefined', 1);

		next();
	});

	it('should memoize when called with an empty string', next => {
		let c = memoize( key => {
				m[key] = (m[key] || 0) + 1;
			}),
			m = {};

		expect(m).not.to.have.property('');
		c('');
		expect(m).to.have.property('', 1);
		c('');
		c('');
		expect(m).to.have.property('', 1);

		next();
	});
});
