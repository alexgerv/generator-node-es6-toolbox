import sayHello from '../src';

describe('sayHello', () => {
  it('returns hello', () => {
    expect(sayHello('foo')).toBe('Hello, foo!');
  });
});
