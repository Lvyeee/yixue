// pages/pageInfo/pageInfo.js
import {callContainer} from '../../utils/callContainer';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectBaseInfo:{},
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
    projectIntroduceInfoList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({id:options.id});
    this.getProjectDetail();
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
  },
  // 获取详情
  getProjectDetail(){
    callContainer(`/project/getProjectDetail/${this.data.id}`,'','GET').then(result=>{
      this.setData({projectBaseInfo:result.data.data.projectBaseInfo});
      this.setData({projectIntroduceInfoList:result.data.data.projectIntroduceInfoList});
      this.setData({commentList:result.data.data.projectCommentInfoList});
    });
  }
})