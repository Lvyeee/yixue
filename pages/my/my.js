// pages/my/my.js
import {
  callContainer
} from '../../utils/callContainer';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    avatarMes: {
      avatar: "",
      nickName: "",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo();
  },
  onConfirm(e) {
    console.log(e);
  },
  goChange() {
    this.setData({
      showModal: true
    })
  },
  getUserInfo() {
    let that = this;
    wx.getStorage({
      key: "userId",
      success(res) {
        console.log(res.data, 'getStorage')
        callContainer(`/wxUser/getUserInfo/${res.data}`, '', 'GET').then(result => {
          that.setData({avatarMes:result.data.data});
        });
      }
    });
    
  },
  /* 退出登录 */
  emptyUser() {
    wx.showModal({
      title: '提示',
      content: '退出会清空您的信息，确定要退出账号吗？',
      success(res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: ''
          })
        }
      }
    })
  },
})