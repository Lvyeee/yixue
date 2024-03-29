// pages/profile/profile.js
import api from "../../utils/api";
import {
  myRequest
} from "../../utils/request";
import Notify from '@vant/weapp/notify/notify';
import Cache from "../../utils/cache";
import Tool from "../../utils/tool";
import {
  callContainer
} from '../../utils/callContainer';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: "wx4ec76b3071535335",
    secretid: 'a7278ef3bf2239df1dfe72d66067361a',
    isLogin: false,
    userInfo: {
      username: "还未登录，请先登录！",
      headPic: api.BASE_URL + "/photo/view?filename=common/mine_normal.jpg"
    },
    basePhotoUrl: api.BASE_URL + "/photo/view?filename=",
    editUser: {},
    profileDialogVisible: false,
    onBeforeClose: (action, done) => {
      if (action === "confirm") {
        return false;
      } else {
        wx.showTabBar({
          animation: true
        });
        return true;
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.validateLoginState();
  },

  // 预览图片
  // previewHead: function () {
  //     let userInfo = this.data.userInfo;
  //     let basePhotoUrl = this.data.basePhotoUrl;
  //     wx.previewImage({
  //          current: userInfo.headPic === userInfo.wxHeadPic ? userInfo.wxHeadPic : basePhotoUrl + userInfo.headPic,
  //          urls: [userInfo.headPic === userInfo.wxHeadPic ? userInfo.wxHeadPic : basePhotoUrl + userInfo.headPic]
  //     })
  // },
  // 验证登录状态
  validateLoginState: async function () {
    wx.showLoading({
      title: "获取登录信息...",
      mask: true
    })
    const loginUser = Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER);
    if (Tool.isEmpty(loginUser)) {
      wx.hideLoading();
      return;
    }
    const res = await myRequest({
      url: api.BASE_URL + "/app/user/get_login_user",
      method: "POST",
      data: {
        token: loginUser
      }
    });
    if (res.data.code === 0) {
      this.setData({
        userInfo: res.data.data,
        isLogin: true,
        editUser: res.data.data
      })
    }
    wx.hideLoading();
  },
  // 登录操作
  getLoginUser: function () {
    wx.showLoading({
      title: "正在登录...",
      mask: true
    })
    wx.getUserProfile({
      desc: "获取用户相关信息",
      success: res => {
        if (res.errMsg === "getUserProfile:ok") {
          console.log(res, '用户信息');
          wx.login({
            success: async res => {
              if (res.errMsg === "login:ok") {
                console.log(res, 'login');
                callContainer(`/wxUser/loginOrRegister`, '', 'POST', {
                  jsCode: res.code
                }).then(result => {
                  // 调用后端接口，验证用户数据
                  if (result.data.code === 200) {
                    wx.setStorage({
                      key: "userId",
                      data: result.data.data.userId
                    })
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  } else {
                    wx.showToast({
                      icon: "error",
                      title: result.msg
                    });
                  }
                });

              } else {
                wx.showToast({
                  icon: "error",
                  title: "登录失败"
                });
              }
              wx.hideLoading();
            },
            fail: res => {
              wx.showToast({
                icon: "error",
                title: "登录失败"
              });
              wx.hideLoading();
            }
          })
        } else {
          wx.showToast({
            icon: "error",
            title: "获取用户失败"
          });
          wx.hideLoading();
        }
      },
      fail: res => {
        wx.showToast({
          icon: "error",
          title: "获取用户失败"
        });
        wx.hideLoading();
      }
    })
  },
  // 登录验证
  authUser: function () {
    const loginUser = Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER);
    if (Tool.isEmpty(loginUser)) {
      Notify({
        type: "danger",
        message: "请先登录！",
        duration: 2000
      });
      return true;
    } else {
      return false;
    }
  },
})