// pages/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  callFn(){
    wx.makePhoneCall({
      phoneNumber: '13758189797' ,
      success:function(){
        console.log('success')
      },
      fail:function(){
        console.log('fail')
      }
    })
  },

  codeFn(){
    wx.previewImage({
      urls:['/images/banner1.jpg'],
      success:function(){
        console.log('success')
      },
      fail:function(){
        console.log('fail')
      }
    })
  }
})