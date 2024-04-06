// pages/pageInfo/pageInfo.js
import {
  callContainer
} from '../../utils/callContainer';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectBaseInfo: {},
    commentList: [],
    show: false,
    commentValue: '',
    projectIntroduceInfoList: [],
    star: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    });
    this.getProjectDetail();
  },

  // tab切换
  onChange(e) {
    console.log(e.detail,'event');
    this.data.star = e.detail;
  },
  textBlur(e) {
    console.log(e.detail,'e');
    this.data.commentValue = e.detail.value;
  },
  // 弹出框确认回调
  commentSend() {
    let parmas = {
      userId: '',
      star: this.data.star,
      comment: this.data.commentValue,
      projectId: this.data.id
    }
    console.log(parmas,'parmas');
    wx.getStorage({
      key: "userId",
      success(res) {
        parmas.userId = res.data;
        callContainer('/project/addProjectComment', '', 'POST', parmas).then(result => {
          that.setData({
            show: false,
            commentValue:'',
            star:5
          });
          wx.showToast({
            icon: "success",
            title: '发布成功！'
          });
          that.getProjectDetail();
        });
      }
    });
  },

  // 弹出框取消回调
  onClose() {
    this.setData({
      show: false
    });
    this.setData({
      commentValue: ''
    });
    this.setData({
      star: 5
    });
  },

  postComment() {
    this.setData({
      show: true
    });
  },
  // 获取详情
  getProjectDetail() {
    callContainer(`/project/getProjectDetail/${this.data.id}`, '', 'GET').then(result => {
      this.setData({
        projectBaseInfo: result.data.data.projectBaseInfo
      });
      this.setData({
        projectIntroduceInfoList: result.data.data.projectIntroduceInfoList
      });
      this.setData({
        commentList: result.data.data.projectCommentInfoList
      });
    });
  }
})