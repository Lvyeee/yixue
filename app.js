// app.js
App({
  onLaunch() {
    // cloud配置
    wx.cloud.init({
      env: 'test-x1dzi',
      traceUser: true,
    })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //检测更新
    this.upProgram();
  },
  //检测更新
  upProgram() {
    //判断小程序的API，回调，参数，等是否在当前版本可用
    if (wx.canIUse('getUpdateManager')) {
      //获取全局唯一的版本更新管理器，用于管理小程序更新。wx.getUpdateManager()
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        //是否有新版本getUpdateManager(callback)
        if (res.hasUpdate) {
          //有。就触发下载功能。异步加载onUpdateReady(callback)
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //用户点击强制"确认"按钮，强制重启小程序applyUpdate()
                  updateManager.applyUpdate()
                }
              }
            })
          })
          //监听小程序更新失败事件onUpdateFailed(callback)
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
        confirmText: '知道了！'
      })
    }
  },
  globalData: {
    userInfo: null
  }
})