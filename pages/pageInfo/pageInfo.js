// pages/pageInfo/pageInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerlist: [
      {
        title:'banner1',
        imageUrl:'/images/banner1.jpg'
      },
    ],
    commentList:[
      {
        name:'张三',
        image:'https://img.yzcdn.cn/vant/cat.jpeg',
        rate:2,
        comment:'111111111111'
      },
      {
        name:'张三',
        image:'https://img.yzcdn.cn/vant/cat.jpeg',
        rate:2,
        comment:'111111111111'
      },
    ],
    show: false,
    commentValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },


  // tab切换
  onChange(event) {
    Toast('当前值：' + event);
  },

  // 弹出框确认回调
  getUserInfo(event) {
    console.log(event.detail);
  },

  // 弹出框取消回调
  onClose() {
    this.setData({ show: false });
  },

  postComment(){
    this.setData({ show: true });
  }
})