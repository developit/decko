import { debounce } from '..';
import { expect } from 'chai';

describe('debounce()', λ => {
	it('should debounce when used as a simple decorator', next => {
		let c = {
			calls: 0,
			args: null,

			@debounce
			foo(...args) {
				c.calls++;
				c.args = args;
			}
		};

		expect(c).to.have.property('calls', 0);
		c.foo(1);
		expect(c).to.have.property('calls', 0);
		c.foo(2);
		c.foo(3);
		setTimeout( () => {
			expect(c).to.have.property('calls', 1);
			expect(c.args).to.deep.equal([3]);

			next();
		}, 20);
	});

	it('should debounce when used as a function', next => {
		let c = debounce( (...args) => {
				m.calls++;
				m.args = args;
			}),
			m = { calls:0, args:null };

		expect(m).to.have.property('calls', 0);
		c(1);
		expect(m).to.have.property('calls', 0);
		c(2);
		c(3);
		setTimeout( () => {
			expect(m).to.have.property('calls', 1);
			expect(m.args).to.deep.equal([3]);

			next();
		}, 20);
	});

	it('should support passing a delay', next => {
		let c = debounce(5, (...args) => {
				m.calls.push(args);
			}),
			m = { calls:[] };

		c(1);
		setTimeout(()=> c(2), 1);
		setTimeout(()=> c(3), 10);
		setTimeout(()=> c(4), 14);
		setTimeout(()=> c(5), 22);
		expect(m.calls).to.have.length(0);
		setTimeout( () => {
			expect(m.calls).to.deep.equal([ [2], [4], [5] ]);
			next();
		}, 30);
	});
});
