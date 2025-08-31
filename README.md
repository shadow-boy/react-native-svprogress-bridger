# react-native-svprogress-bridger

A Native Module for react-native that uses SVProgressHUD on iOS and KProgressHUD on Android.

## Installation

```sh
npm install react-native-svprogress-bridger
```

### iOS Setup

For iOS, the SVProgressHUD dependency will be automatically installed via CocoaPods when you run `pod install`.

**Important**: If you encounter a `Multiple commands produce PrivacyInfo.xcprivacy` error during iOS build, add the following to your `ios/Podfile`:

```ruby
post_install do |installer|
  # ... your existing post_install code ...
  
  # Fix SVProgressHUD privacy manifest conflict
  privacy_file_path = File.join(installer.sandbox.root, 'SVProgressHUD', 'SVProgressHUD', 'PrivacyInfo.xcprivacy')
  if File.exist?(privacy_file_path)
    File.delete(privacy_file_path)
    puts "Removed duplicate PrivacyInfo.xcprivacy from SVProgressHUD"
  end
end
```

### Android Setup

For Android, the KProgressHUD source code is directly integrated into the module, so no additional dependencies are required. This ensures better compatibility and allows for customizations if needed.

## Usage

```js
import SVProgressBridge, { SVProgressConfig } from 'react-native-svprogress-bridger';

// Show loading spinner
SVProgressBridge.showLoading('Loading...');

// Hide loading spinner
SVProgressBridge.hideLoading();

// Show success message
SVProgressBridge.showSuccess('操作成功！');

// Show error message
SVProgressBridge.showError('操作失败！');

// Show info message
SVProgressBridge.showInfo('这是一条信息');

// Configure HUD parameters (iOS only)
const config: SVProgressConfig = {
  minimumDismissTimeInterval: 2.0,
  maximumDismissTimeInterval: 0.3,
  fadeInAnimationDuration: 0.5,
  fadeOutAnimationDuration: 0.5,
};
SVProgressBridge.config(config);
```

## API

### Methods

#### `showLoading(msg?: string)`
Shows a loading spinner with an optional message.

#### `hideLoading()`
Hides the currently displayed loading spinner.

#### `showSuccess(msg?: string)`
Shows a success message. Auto-dismisses after a short delay.

#### `showError(msg?: string)`
Shows an error message. Auto-dismisses after a short delay.

#### `showInfo(msg?: string)`
Shows an info message. Auto-dismisses after a short delay.

#### `config(conf: SVProgressConfig)`
Configures the HUD display parameters (iOS only).

### Types

#### `SVProgressConfig`
```typescript
interface SVProgressConfig {
  minimumDismissTimeInterval: number; // default: 2
  maximumDismissTimeInterval: number; // default: 0.3
  fadeInAnimationDuration: number;    // default: 0.5
  fadeOutAnimationDuration: number;   // default: 0.5
}
```

## Platform Differences

- **iOS**: Uses SVProgressHUD with full configuration support
- **Android**: Uses KProgressHUD (integrated source code) with iOS-style frosted glass appearance
  - `showLoading()`: Shows indeterminate spinner HUD with frosted glass white background, rounded corners (120x120dp), black text
  - `hideLoading()`: Dismisses HUD
  - `showSuccess/Error/Info()`: Shows custom icon HUD with respective success/error/info icons, frosted glass white background, rounded corners, fixed size (120x120dp), black text, auto-dismisses after `minimumDismissTimeInterval`
  - `config()`: Supports `minimumDismissTimeInterval` for auto-dismiss timing; other parameters are stored but may have limited effect due to KProgressHUD's design

## Technical Notes

### Android Implementation
- **KProgressHUD Integration**: The KProgressHUD source code (from [Kaopiz/KProgressHUD](https://github.com/Kaopiz/KProgressHUD)) is directly integrated into this module
- **Resource Management**: All KProgressHUD resources (layouts, drawables, colors) are included and properly referenced
- **iOS-Style Frosted Glass Appearance**: HUD styled to match iOS SVProgressHUD with:
  - Frosted glass white background (`#F0FFFFFF`)
  - Rounded corners (12dp radius)
  - Fixed size (120x120dp)
  - Black text color for better contrast
  - Reduced background dim (0.3f opacity)
- **Custom Icons**: Success, error, and info states use custom ImageView with respective icons (`kprogresshud_success.png`, `kprogresshud_error.png`, `kprogresshud_info.png`) sized at 48dp
- **Customization**: Since the source code is integrated, you can modify the KProgressHUD behavior by editing the files in `android/src/main/java/com/kaopiz/kprogresshud/` or replace the icon resources

### iOS Implementation
- **SVProgressHUD Dependency**: Uses the official SVProgressHUD CocoaPods library
- **Privacy Manifest**: Includes automatic handling of privacy manifest conflicts

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
