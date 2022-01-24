const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;

const createLogger = require('../src/logger');

const sandbox = sinon.createSandbox();
const withConsole = createLogger({ useConsole: true });
const withoutConsole = createLogger({ useConsole: false });

describe('src/logger.js', () => {
	beforeEach(() => {
		sandbox.stub(console, 'info');
		sandbox.stub(console, 'error');
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('info()', () => {
		describe('with console enabled', () => {
			it('should call console.info()', () => {
				withConsole.info('fake log message');

				expect(console.info).to.be.calledOnce;
			});
		});

		describe('with console disabled', () => {
			it('should not call console.info()', () => {
				withoutConsole.info('fake log message');

				expect(console.info).to.not.be.calledOnce;
			});
		});
	});

	describe('error()', () => {
		describe('with console enabled', () => {
			it('should call console.error()', () => {
				withConsole.error('fake log message');

				expect(console.error).to.be.calledOnce;
			});
		});

		describe('with console disabled', () => {
			it('should not call console.error()', () => {
				withoutConsole.error('fake log message');

				expect(console.error).to.not.be.calledOnce;
			});
		});
	});
});