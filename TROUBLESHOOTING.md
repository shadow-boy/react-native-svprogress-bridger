# Troubleshooting Guide

This document covers common issues and their solutions when using `react-native-svprogress-bridger`.

## iOS Issues

### ❌ Error: Multiple commands produce 'PrivacyInfo.xcprivacy'

**Problem**: You encounter this error during iOS build:
```
error: Multiple commands produce '/path/to/PrivacyInfo.xcprivacy'
note: Target 'YourApp' has copy command from '...'
note: That command depends on command in Target 'YourApp': script phase "[CP] Copy Pods Resources"
```

**Cause**: This happens because SVProgressHUD includes its own `PrivacyInfo.xcprivacy` file, which conflicts with React Native's privacy manifest aggregation system.

**Solution**: Add the following code to your `ios/Podfile`:

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

Then run:
```bash
cd ios
rm -rf Pods Podfile.lock build
pod install
```

### ❌ Error: SVProgressHUD not found

**Problem**: Build fails with SVProgressHUD not found.

**Solution**: Make sure you've run `pod install` after installing the package:
```bash
cd ios
pod install
```

## Android Issues

### ❌ Error: KProgressHUD not found

**Problem**: Android build fails with KProgressHUD related errors.

**Solution**: Make sure your Android project is properly configured:
1. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx react-native run-android
   ```

### ❌ Config method has no effect on Android

**Problem**: Calling `SVProgressBridge.config()` doesn't change the appearance on Android.

**Explanation**: This is expected behavior. KProgressHUD (Android) has limited configuration options compared to SVProgressHUD (iOS). Only `minimumDismissTimeInterval` is supported on Android.

## General Issues

### ❌ Module not found after installation

**Problem**: `Cannot resolve module 'react-native-svprogress-bridger'`

**Solution**:
1. Make sure the package is properly installed:
   ```bash
   npm install react-native-svprogress-bridger
   # or
   yarn add react-native-svprogress-bridger
   ```

2. For React Native 0.60+, the module should auto-link. If not, try:
   ```bash
   npx react-native unlink react-native-svprogress-bridger
   npx react-native link react-native-svprogress-bridger
   ```

3. Clean and rebuild:
   ```bash
   # iOS
   cd ios && rm -rf Pods Podfile.lock build && pod install && cd ..
   
   # Android
   cd android && ./gradlew clean && cd ..
   
   # Rebuild
   npx react-native run-ios
   npx react-native run-android
   ```

### ❌ TypeScript errors

**Problem**: TypeScript compilation errors.

**Solution**: Make sure you're importing the types correctly:
```typescript
import SVProgressBridge, { type SVProgressConfig } from 'react-native-svprogress-bridger';
```

## Getting Help

If you're still experiencing issues:

1. **Check the example app**: The `example/` directory contains a working implementation
2. **Search existing issues**: Check the [GitHub issues](https://github.com/shadow-boy/react-native-svprogress-bridger/issues)
3. **Create a new issue**: Include:
   - React Native version
   - Platform (iOS/Android)
   - Complete error message
   - Steps to reproduce
   - Your Podfile (for iOS issues)

## Automatic Fix

Starting from version 0.2.0, the package includes a postinstall script that automatically applies the iOS privacy manifest fix. If you're still experiencing issues, the manual fix above should resolve them.
