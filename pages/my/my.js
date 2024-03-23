// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    avatarMes:{
      avatarUrl: "/images/头像.png",
      nickName: "名称",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onConfirm(e){
    console.log(e);
  },
  goChange(){
    this.setData({showModal:true})
  },
  /* 退出登录 */
  emptyUser(){
    wx.showModal({
      title: '提示',
      content: '退出会清空您的信息，确定要退出账号吗？',
      success (res) {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.reLaunch({ url: '' })
        }
      }
    })
  },
})