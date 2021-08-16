import { BaseComponentsModule } from './components.module';

describe('ComponentsModule', () => {
  let componentsModule: BaseComponentsModule;

  beforeEach(() => {
    componentsModule = new BaseComponentsModule();
  });

  it('should create an instance', () => {
    expect(componentsModule).toBeTruthy();
  });
});
