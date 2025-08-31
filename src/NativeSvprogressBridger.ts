import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  showLoading(msg?: string | null): void;
  hideLoading(): void;
  showSuccess(msg?: string | null): void;
  showError(msg?: string | null): void;
  showInfo(msg?: string | null): void;
  config(conf: {
    minimumDismissTimeInterval: number;
    maximumDismissTimeInterval: number;
    fadeInAnimationDuration: number;
    fadeOutAnimationDuration: number;
  }): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SvprogressBridger');
