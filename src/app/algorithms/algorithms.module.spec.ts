import { AlgorithmsModule } from './algorithms.module';

describe('AlgorithmsModule', () => {
  let algorithmsModule: AlgorithmsModule;

  beforeEach(() => {
    algorithmsModule = new AlgorithmsModule();
  });

  it('should create an instance', () => {
    expect(algorithmsModule).toBeTruthy();
  });
});
