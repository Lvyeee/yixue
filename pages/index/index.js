// index.js
import {callContainer} from '../../utils/callContainer';
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    bannerlist: [
      {
        title:'banner1',
        imageUrl:'/images/banner1.jpg'
      },
      {
        title:'banner2',
        imageUrl:'/images/banner2.jpg'
      },
    ],
    listArticle:[],
  },
  onLoad(){
    this.getListArticle();
  },
  // banner点击跳转
  swipclick(e){
    // let url = e.currentTarget.dataset.url
    // if(url != ''){
    //   if (url == 'pages/index'){
    //     wx.switchTab({
    //       url: url,
    //     })
    //   }else{
    //     wx.navigateTo({
    //       url: url,
    //     })
    //   }
    // }
  },
  // 文档查看
  viewDetail(contentFile){
    console.log(contentFile,'文档地址');
    wx.downloadFile({
      url: contentFile.path,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  },
  // 获取文章列表
  getListArticle(){
    callContainer('/article/listArticlePage','pageNum=1&pageSize=10','GET').then(result=>{
      this.setData({listArticle:result.data.rows});
    });
  }
})