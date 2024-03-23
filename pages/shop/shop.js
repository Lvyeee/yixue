
// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:'/images//shop.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  linkRes(){
    wx.navigateTo({
      url: '/pages/pageInfo/pageInfo'
    })
  }
})