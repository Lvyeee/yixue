// index.js
import {callContainer} from '../../utils/callContainer';

Page({
  data: {
    bannerlist: [],
    listArticle:[],
  },
  onLoad(){
    this.getListArticle(); 
    this.getBannerList(); 
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
    console.log(contentFile.currentTarget.dataset.contentfile,'文档地址');
    wx.downloadFile({
      url: contentFile.currentTarget.dataset.contentfile.path,
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
  },
  // 获取banner
  getBannerList(){
    callContainer('/banner/listBanner','','GET').then(result=>{
      this.setData({bannerlist:result.data.data});
    });
  },
})