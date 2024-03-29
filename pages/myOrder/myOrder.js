// pages/myOrder/myOrder.js
import {
  callContainer
} from '../../utils/callContainer';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectOrderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListProjectOrder();
  },
  getListProjectOrder(){
    let that = this;
    wx.getStorage({
      key: "userId",
      success(res) {
        callContainer(`/projectOrder/listProjectOrderByUser/${res.data}`, '', 'GET').then(result => {
          that.setData({projectOrderList:result.data.data});
        });
      }
    });
  },
  // 复制订单号
  copyFn(data){
    console.log( data,'data') // data
    let code =  data.currentTarget.dataset.code;
    wx.setClipboardData({
      data:code,
      success (res) {
        // wx.getClipboardData({
        //   success (res) {
        //     console.log(res.data) // data
        //   }
        // })
        wx.showToast({
          icon: "success",
          title: '复制成功！'
        });
      }
    })
  }
})