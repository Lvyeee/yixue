
// pages/shop/shop.js
import {callContainer} from '../../utils/callContainer';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listProject:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getListProject();
  },
  linkRes(e){
    wx.navigateTo({
      url: `/pages/pageInfo/pageInfo?id=${ e.currentTarget.dataset.id}`
    })
  },
  getListProject(){
    callContainer('/project/listProjectPage','pageNum=1&pageSize=999','GET').then(result=>{
      this.setData({listProject:result.data.rows});
    });
  },
})