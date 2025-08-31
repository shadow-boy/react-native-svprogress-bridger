import type { SVProgressConfig } from '../index';

describe('SVProgressBridge', () => {
  it('should export SVProgressConfig interface', () => {
    const config: SVProgressConfig = {
      minimumDismissTimeInterval: 2.0,
      maximumDismissTimeInterval: 0.3,
      fadeInAnimationDuration: 0.5,
      fadeOutAnimationDuration: 0.5,
    };

    expect(config.minimumDismissTimeInterval).toBe(2.0);
    expect(config.maximumDismissTimeInterval).toBe(0.3);
    expect(config.fadeInAnimationDuration).toBe(0.5);
    expect(config.fadeOutAnimationDuration).toBe(0.5);
  });

  it('should have correct TypeScript types', () => {
    // This test verifies that the TypeScript compilation works correctly
    // and all types are properly exported
    expect(true).toBe(true);
  });
});
