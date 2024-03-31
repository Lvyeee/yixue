// component/authMes/authMes.js
const app = getApp();
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean,
      value: false,
    },
    avatarMes: {
      type: Object,
      value: {
        avatarCloudFileId: "",
        nickName: "",
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindblur(res) {
      const value = res.detail.value;
      this.data.avatarMes.nickName = value;
    },
    // 拿到头像信息的临时路径
    onChooseAvatar(e) {
      this.uploadAva(e.detail.avatarUrl);
    },
    uploadAva(tempFilePaths) {
      this.uploadFile(tempFilePaths, tempFilePaths.substr(tempFilePaths.lastIndexOf('/') + 1)).then((result) => {
        this.setData({'avatarMes.avatarCloudFileId':result})
      })
    },

    //点击遮罩层关闭
    closeHandle() {
      this.setData({
        showModal: false
      })
    },
    // 取消
    cancel() {
      this.setData({
        showModal: false
      })
    },
    // 确认
    confirm() {
      console.log(this.data.avatarMes,'avatarMes');
      this.triggerEvent('onConfirm', {
        avatar: this.data.avatarMes
      });
    },
    /**
     * 上传文件到微信云托管对象存储
     * @param {*} file 微信本地文件，通过选择图片，聊天文件等接口获取
     * @param {*} path 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
     * @param {*} onCall 上传回调，文件上传过程监听，返回false时会中断上传
     */
    uploadFile(file, path, onCall = () => {}) {
      return new Promise((resolve, reject) => {
        const task = wx.cloud.uploadFile({
          cloudPath: path,
          filePath: file,
          config: {
            env: 'prod-6g8rvo635e2e18c3' // 需要替换成自己的微信云托管环境ID
          },
          success: res => resolve(res.fileID),
          fail: e => {
            const info = e.toString()
            if (info.indexOf('abort') != -1) {
              reject(new Error('【文件上传失败】中断上传'))
            } else {
              reject(new Error('【文件上传失败】网络或其他错误'))
            }
          }
        })
        task.onProgressUpdate((res) => {
          if (onCall(res) == false) {
            task.abort()
          }
        })
      })
    }
  }
})