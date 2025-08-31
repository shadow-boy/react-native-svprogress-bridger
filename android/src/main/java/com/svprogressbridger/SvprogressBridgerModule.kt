package com.svprogressbridger

import android.os.Handler
import android.os.Looper
import android.widget.ImageView
import android.view.ViewGroup
import android.graphics.Color
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.kaopiz.kprogresshud.KProgressHUD

@ReactModule(name = SvprogressBridgerModule.NAME)
class SvprogressBridgerModule(reactContext: ReactApplicationContext) :
  NativeSvprogressBridgerSpec(reactContext) {

  private var progressHUD: KProgressHUD? = null
  private val mainHandler = Handler(Looper.getMainLooper())
  
  // 配置参数存储
  private var minimumDismissTimeInterval: Long = 2000 // 默认2秒
  private var maximumDismissTimeInterval: Long = 300  // 默认0.3秒
  private var fadeInAnimationDuration: Long = 500     // 默认0.5秒
  private var fadeOutAnimationDuration: Long = 500    // 默认0.5秒

  override fun getName(): String {
    return NAME
  }

  // 创建样式化的图标视图，匹配iOS样式
  private fun createStyledImageView(activity: android.app.Activity, drawableRes: Int): ImageView {
    val imageView = ImageView(activity)
    imageView.setImageResource(drawableRes)
    
    // 设置图标大小，匹配iOS的视觉效果
    val size = (48 * activity.resources.displayMetrics.density).toInt() // 48dp
    val layoutParams = ViewGroup.LayoutParams(size, size)
    imageView.layoutParams = layoutParams
    imageView.scaleType = ImageView.ScaleType.CENTER_INSIDE
    
    return imageView
  }

  override fun showLoading(msg: String?) {
    mainHandler.post {
      val activity = currentActivity
      if (activity != null) {
        progressHUD?.dismiss()
        progressHUD = KProgressHUD.create(activity)
          .setStyle(KProgressHUD.Style.SPIN_INDETERMINATE)
          .setCancellable(false)
          .setAnimationSpeed(2)
          .setDimAmount(0.3f) // 减少背景遮罩透明度
          .setCornerRadius(12f) // 设置圆角，匹配iOS
          .setSize(120, 120) // 设置固定大小，匹配iOS
          .setBackgroundColor(Color.parseColor("#F0FFFFFF")) // 毛玻璃白色背景
          .setLabel(msg ?: "", Color.BLACK) // 黑色文字

        progressHUD?.show()
      }
    }
  }

  override fun hideLoading() {
    mainHandler.post {
      progressHUD?.dismiss()
      progressHUD = null
    }
  }

  override fun showSuccess(msg: String?) {
    mainHandler.post {
      val activity = currentActivity
      if (activity != null) {
        progressHUD?.dismiss()
        
        // 创建样式化的成功图标视图
        val successImageView = createStyledImageView(activity, com.svprogressbridger.R.drawable.kprogresshud_success)
        
        progressHUD = KProgressHUD.create(activity)
          .setCustomView(successImageView)
          .setCancellable(false)
          .setDimAmount(0.3f) // 减少背景遮罩透明度
          .setCornerRadius(12f) // 设置圆角，匹配iOS
          .setSize(120, 120) // 设置固定大小，匹配iOS
          .setBackgroundColor(Color.parseColor("#F0FFFFFF")) // 毛玻璃白色背景
          .setLabel(msg ?: "Success", Color.BLACK) // 黑色文字
          .show()

        // 使用配置的最小显示时间自动关闭
        mainHandler.postDelayed({
          progressHUD?.dismiss()
          progressHUD = null
        }, minimumDismissTimeInterval)
      }
    }
  }

  override fun showError(msg: String?) {
    mainHandler.post {
      val activity = currentActivity
      if (activity != null) {
        progressHUD?.dismiss()
        
        // 创建样式化的错误图标视图
        val errorImageView = createStyledImageView(activity, com.svprogressbridger.R.drawable.kprogresshud_error)
        
        progressHUD = KProgressHUD.create(activity)
          .setCustomView(errorImageView)
          .setCancellable(false)
          .setDimAmount(0.3f) // 减少背景遮罩透明度
          .setCornerRadius(12f) // 设置圆角，匹配iOS
          .setSize(120, 120) // 设置固定大小，匹配iOS
          .setBackgroundColor(Color.parseColor("#F0FFFFFF")) // 毛玻璃白色背景
          .setLabel(msg ?: "Error", Color.BLACK) // 黑色文字
          .show()

        // 使用配置的最小显示时间自动关闭
        mainHandler.postDelayed({
          progressHUD?.dismiss()
          progressHUD = null
        }, minimumDismissTimeInterval)
      }
    }
  }

  override fun showInfo(msg: String?) {
    mainHandler.post {
      val activity = currentActivity
      if (activity != null) {
        progressHUD?.dismiss()
        
        // 创建样式化的信息图标视图
        val infoImageView = createStyledImageView(activity, com.svprogressbridger.R.drawable.kprogresshud_info)
        
        progressHUD = KProgressHUD.create(activity)
          .setCustomView(infoImageView)
          .setCancellable(false)
          .setDimAmount(0.3f) // 减少背景遮罩透明度
          .setCornerRadius(12f) // 设置圆角，匹配iOS
          .setSize(120, 120) // 设置固定大小，匹配iOS
          .setBackgroundColor(Color.parseColor("#F0FFFFFF")) // 毛玻璃白色背景
          .setLabel(msg ?: "Info", Color.BLACK) // 黑色文字
          .show()

        // 使用配置的最小显示时间自动关闭
        mainHandler.postDelayed({
          progressHUD?.dismiss()
          progressHUD = null
        }, minimumDismissTimeInterval)
      }
    }
  }

  override fun config(conf: ReadableMap?) {
    conf?.let { config ->
      // 读取配置参数并转换为毫秒
      if (config.hasKey("minimumDismissTimeInterval")) {
        minimumDismissTimeInterval = (config.getDouble("minimumDismissTimeInterval") * 1000).toLong()
      }
      if (config.hasKey("maximumDismissTimeInterval")) {
        maximumDismissTimeInterval = (config.getDouble("maximumDismissTimeInterval") * 1000).toLong()
      }
      if (config.hasKey("fadeInAnimationDuration")) {
        fadeInAnimationDuration = (config.getDouble("fadeInAnimationDuration") * 1000).toLong()
      }
      if (config.hasKey("fadeOutAnimationDuration")) {
        fadeOutAnimationDuration = (config.getDouble("fadeOutAnimationDuration") * 1000).toLong()
      }
    }
  }

  companion object {
    const val NAME = "SvprogressBridger"
  }
}
