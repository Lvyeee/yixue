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
        avatarUrl: "",
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
      const {
        avatarUrl
      } = e.detail;
      console.log('头像地址', avatarUrl);
      this.uploadAva(e.detail.avatarUrl);
    },
    uploadAva(tempFilePaths) {
      var that = this;
      wx.uploadFile({
        url: app.siteinfo.apiUrl + '图片上传接口', //需要用HTTPS，同时在微信公众平台后台添加服务器地址
        filePath: tempFilePaths, //上传的文件本地地址
        name: "Image", //服务器定义的Key值
        header: {
          'content-type': 'multipart/form-data',
          'cookie': wx.getStorageSync('cookie')
        },
        formData: {
          //接口所需的其他上传字段
          uploadDir: '',
          fileType: '',
        },
        // 附近数据，这里为路径
        success: function (res) {
          wx.hideLoading();
          if (res.statusCode == 200) {
            var result = JSON.parse(res.data);
            if (result.status) {
              // var imgUrl = [{ name: 'headImgUrl', url: result.data.fileurl }];
              that.setData({
                'avatarMes.avatarUrl': result.data.fileurl
              })
            } else {
              app.alert.show(res.errmsg);
            }
          } else {
            app.alert.show(res);
          }
        },
        fail: function (err) {
          console.log(err);
        }
      });
    },
    // 输入
    onChange(e) {
      let field = 'avatarMes.' + e.currentTarget.dataset.field;
      this.setData({
        [field]: e.detail
      });
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
      this.triggerEvent('onConfirm', {
        avatar: this.data.avatarMes
      });
    },
  }
})