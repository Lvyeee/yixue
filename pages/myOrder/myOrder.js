// pages/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:'/images/shop.png',
    code:'11',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  // 复制订单号
  copyFn(data){
    console.log(data) // data
    wx.setClipboardData({
      data,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})