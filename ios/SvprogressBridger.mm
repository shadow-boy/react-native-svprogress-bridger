#import "SvprogressBridger.h"

@implementation SvprogressBridger
RCT_EXPORT_MODULE()

- (void)showLoading:(NSString *)msg {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (msg && msg.length > 0) {
            [SVProgressHUD showWithStatus:msg];
        } else {
            [SVProgressHUD show];
        }
    });
}

- (void)hideLoading {
    dispatch_async(dispatch_get_main_queue(), ^{
        [SVProgressHUD dismiss];
    });
}

- (void)showSuccess:(NSString *)msg {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (msg && msg.length > 0) {
            [SVProgressHUD showSuccessWithStatus:msg];
        } else {
            [SVProgressHUD showSuccessWithStatus:@"Success"];
        }
    });
}

- (void)showError:(NSString *)msg {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (msg && msg.length > 0) {
            [SVProgressHUD showErrorWithStatus:msg];
        } else {
            [SVProgressHUD showErrorWithStatus:@"Error"];
        }
    });
}

- (void)showInfo:(NSString *)msg {
    dispatch_async(dispatch_get_main_queue(), ^{
        if (msg && msg.length > 0) {
            [SVProgressHUD showInfoWithStatus:msg];
        } else {
            [SVProgressHUD showInfoWithStatus:@"Info"];
        }
    });
}

- (void)config:(JS::NativeSvprogressBridger::SpecConfigConf &)conf {
    dispatch_async(dispatch_get_main_queue(), ^{
        [SVProgressHUD setMinimumDismissTimeInterval:conf.minimumDismissTimeInterval()];
        [SVProgressHUD setMaximumDismissTimeInterval:conf.maximumDismissTimeInterval()];
        [SVProgressHUD setFadeInAnimationDuration:conf.fadeInAnimationDuration()];
        [SVProgressHUD setFadeOutAnimationDuration:conf.fadeOutAnimationDuration()];
    });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSvprogressBridgerSpecJSI>(params);
}

@end
