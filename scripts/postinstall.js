#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Post-install script to fix SVProgressHUD PrivacyInfo.xcprivacy conflicts
 * This script adds the necessary Podfile configuration to avoid build errors
 */

function findPodfile() {
  // Try to find Podfile in common locations
  const possiblePaths = [
    path.join(process.cwd(), 'ios', 'Podfile'),
    path.join(process.cwd(), '..', '..', 'ios', 'Podfile'), // if installed in node_modules
    path.join(process.cwd(), '..', '..', '..', 'ios', 'Podfile'), // if installed in nested node_modules
  ];

  for (const podfilePath of possiblePaths) {
    if (fs.existsSync(podfilePath)) {
      return podfilePath;
    }
  }
  return null;
}

function updatePodfile(podfilePath) {
  try {
    let content = fs.readFileSync(podfilePath, 'utf8');
    
    // Check if our fix is already present
    if (content.includes('SVProgressHUD', 'SVProgressHUD', 'PrivacyInfo.xcprivacy')) {
      console.log('✅ SVProgressHUD privacy manifest fix already present in Podfile');
      return;
    }

    // Find post_install block or create one
    const postInstallRegex = /post_install\s+do\s+\|installer\|/;
    const fixCode = `
  # Fix SVProgressHUD privacy manifest conflict (added by react-native-svprogress-bridger)
  privacy_file_path = File.join(installer.sandbox.root, 'SVProgressHUD', 'SVProgressHUD', 'PrivacyInfo.xcprivacy')
  if File.exist?(privacy_file_path)
    File.delete(privacy_file_path)
    puts "Removed duplicate PrivacyInfo.xcprivacy from SVProgressHUD"
  end`;

    if (postInstallRegex.test(content)) {
      // Add to existing post_install block
      content = content.replace(
        /(\s+end\s*$)/m,
        fixCode + '\n$1'
      );
    } else {
      // Create new post_install block
      const newPostInstall = `
post_install do |installer|${fixCode}
end`;
      content += newPostInstall;
    }

    fs.writeFileSync(podfilePath, content);
    console.log('✅ Added SVProgressHUD privacy manifest fix to Podfile');
    console.log('📝 Please run "cd ios && pod install" to apply the changes');
  } catch (error) {
    console.warn('⚠️  Could not automatically update Podfile:', error.message);
    console.log('📖 Please manually add the fix from the README to your ios/Podfile');
  }
}

function main() {
  console.log('🔧 Running react-native-svprogress-bridger post-install script...');
  
  const podfilePath = findPodfile();
  if (!podfilePath) {
    console.log('ℹ️  No Podfile found. If you encounter PrivacyInfo.xcprivacy build errors,');
    console.log('   please refer to the README for manual setup instructions.');
    return;
  }

  console.log(`📁 Found Podfile at: ${podfilePath}`);
  updatePodfile(podfilePath);
}

if (require.main === module) {
  main();
}

module.exports = { main };
