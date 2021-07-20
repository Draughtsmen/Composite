import { CompositeFunction } from '../classes/composite-function';

describe('CompositeFunction', () => {
  it('should create an instance', () => {
    expect(new CompositeFunction('test', 'void', ['x', 'y'])).toBeTruthy();
  });
});
