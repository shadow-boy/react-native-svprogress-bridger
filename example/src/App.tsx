import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SVProgressBridge, {
  type SVProgressConfig,
} from 'react-native-svprogress-bridger';

export default function App() {
  const handleShowLoading = () => {
    SVProgressBridge.showLoading('Loading...');
    setTimeout(() => {
      SVProgressBridge.hideLoading();
    }, 3000);
  };

  const handleShowSuccess = () => {
    SVProgressBridge.showSuccess('操作成功！');
  };

  const handleShowError = () => {
    SVProgressBridge.showError('操作失败！');
  };

  const handleShowInfo = () => {
    SVProgressBridge.showInfo('这是一条信息');
  };

  const handleConfig = () => {
    const config: SVProgressConfig = {
      minimumDismissTimeInterval: 1.0,
      maximumDismissTimeInterval: 5.0,
      fadeInAnimationDuration: 0.3,
      fadeOutAnimationDuration: 0.3,
    };
    SVProgressBridge.config(config);
    Alert.alert('配置完成', '已更新HUD配置参数');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SVProgress Bridger Demo</Text>

      <TouchableOpacity style={styles.button} onPress={handleShowLoading}>
        <Text style={styles.buttonText}>显示Loading</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleShowSuccess}>
        <Text style={styles.buttonText}>显示成功提示</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleShowError}>
        <Text style={styles.buttonText}>显示错误提示</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleShowInfo}>
        <Text style={styles.buttonText}>显示信息提示</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleConfig}>
        <Text style={styles.buttonText}>配置HUD参数</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
