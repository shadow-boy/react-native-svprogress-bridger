import SvprogressBridger from './NativeSvprogressBridger';

export interface SVProgressConfig {
  /**
   * Sets the minimum dismiss time interval.
   * The minimum time interval, in seconds, that the HUD should be displayed.
   * default 2
   */
  minimumDismissTimeInterval: number;
  /**
   * Sets the maximum dismiss time interval.
   * The maximum time interval, in seconds, that the HUD should be displayed.
   * default 0.3
   */
  maximumDismissTimeInterval: number;
  /**
   * Sets the fade-in animation duration.
   * The duration, in seconds, for the fade-in animation.
   * default 0.5
   */
  fadeInAnimationDuration: number;
  /**
   * Sets the fade-out animation duration.
   * The duration, in seconds, for the fade-out animation.
   * default 0.5
   */
  fadeOutAnimationDuration: number;
}

/**
 * iOS SVProgress 原生提示封装
 */
export default class SVProgressBridge {
  /**
   * 显示loading 转圈
   * @param msg
   */
  static showLoading(msg?: string) {
    SvprogressBridger.showLoading(msg || null);
  }

  /**
   * 关闭loading
   */
  static hideLoading() {
    SvprogressBridger.hideLoading();
  }

  /**
   * 成功提示
   * @param msg
   */
  static showSuccess(msg?: string) {
    SvprogressBridger.showSuccess(msg || null);
  }

  /**
   * 错误提示
   * @param msg
   */
  static showError(msg?: string) {
    SvprogressBridger.showError(msg || null);
  }

  /**
   * info 信息提示
   * @param msg
   */
  static showInfo(msg?: string) {
    SvprogressBridger.showInfo(msg || null);
  }

  /**
   * 配置hud显示参数
   * @param conf
   */
  static config(conf: SVProgressConfig) {
    SvprogressBridger.config(conf);
  }
}
