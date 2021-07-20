import { CompositeClass } from '../classes/composite-class';

describe('CompositeClass', () => {
  it('should create an instance', () => {
    expect(new CompositeClass('test', 'class', '{ }')).toBeTruthy();
  });
});
