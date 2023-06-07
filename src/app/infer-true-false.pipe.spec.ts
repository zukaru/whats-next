import { InferTrueFalsePipe } from './infer-true-false.pipe';

describe('InferTrueFalsePipe', () => {
  it('create an instance', () => {
    const pipe = new InferTrueFalsePipe();
    expect(pipe).toBeTruthy();
  });
});
