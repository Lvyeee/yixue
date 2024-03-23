// pages/profile/profile.js
import api from "../../utils/api";
import { myRequest } from "../../utils/request";
import Notify from "@vant/weapp/notify/notify";
import Cache from "../../utils/cache";
import Tool from "../../utils/tool";


Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        userInfo: {
            username: "还未登录，请先登录！",
            headPic: api.BASE_URL + "/photo/view?filename=common/mine_normal.jpg"
        },
        basePhotoUrl: api.BASE_URL + "/photo/view?filename=",
        editUser: {},
        profileDialogVisible: false,
        onBeforeClose: (action, done) => {
            if(action === "confirm") {
              return false;
            } else {
              wx.showTabBar({
                animation: true
              });
              return true;
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.validateLoginState();
    },

    // 预览图片
    // previewHead: function () {
    //     let userInfo = this.data.userInfo;
    //     let basePhotoUrl = this.data.basePhotoUrl;
    //     wx.previewImage({
    //          current: userInfo.headPic === userInfo.wxHeadPic ? userInfo.wxHeadPic : basePhotoUrl + userInfo.headPic,
    //          urls: [userInfo.headPic === userInfo.wxHeadPic ? userInfo.wxHeadPic : basePhotoUrl + userInfo.headPic]
    //     })
    // },
    // 验证登录状态
    validateLoginState: async function() {
        wx.showLoading({
            title: "获取登录信息...",
            mask: true
        })
        const loginUser = Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER);
        if(Tool.isEmpty(loginUser)) {
            wx.hideLoading();
            return;
        }
        const res = await myRequest({
            url: api.BASE_URL + "/app/user/get_login_user",
            method: "POST",
            data: {
                token: loginUser
            }
        });
        if(res.data.code === 0) {
            this.setData({
                userInfo: res.data.data,
                isLogin: true,
                editUser: res.data.data
            })
        }
        wx.hideLoading();
    },
    // 登录操作
    getLoginUser: function() {
        wx.showLoading({
            title: "正在登录...",
            mask: true
        })
        wx.getUserProfile({
            desc: "获取用户相关信息",
            success: res => {
                if(res.errMsg === "getUserProfile:ok") {
                    let username = res.userInfo.nickName;
                    let headPic = res.userInfo.avatarUrl;
                    console.log(res,'用户信息');
                    // wx.login({
                    //     success: async res => {
                    //         if (res.errMsg === "login:ok") {
                    //             // 调用后端接口，验证用户数据
                    //             const response = await myRequest({
                    //                 url: api.BASE_URL + "/app/user/wx_login",
                    //                 method: "POST",
                    //                 data: {
                    //                     wxHeadPic: headPic,
                    //                     wxUsername: username,
                    //                     code: res.code
                    //                 }
                    //             });
                    //             if(response.data.code === 0) {
                    //                 Notify({ type: "success", message: response.data.msg, duration: 1000 });
                    //                 Cache.setCache(getApp().globalData.SESSION_KEY_LOGIN_USER, response.data.data.token, 3600);
                    //                 this.setData({
                    //                     userInfo: response.data.data,
                    //                     editUser: response.data.data,
                    //                     isLogin: true
                    //                 });
                    //             } else {
                    //                 Notify({ type: "danger", message: response.data.msg, duration: 2000 });
                    //             }
                    //         } else {
                    //             wx.showToast({
                    //                 icon: "error",
                    //                 title: "登录失败"
                    //             });
                    //         }
                    //         wx.hideLoading();
                    //     },
                    //     fail: res => {
                    //         wx.showToast({
                    //             icon: "error",
                    //             title: "登录失败"
                    //         });
                            wx.hideLoading();
                    //     }
                    // })
                } else {
                    wx.showToast({
                        icon: "error",
                        title: "获取用户失败"
                    });
                    wx.hideLoading();
                }
            },
            fail: res => {
                wx.showToast({
                    icon: "error",
                    title: "获取用户失败"
                });
                wx.hideLoading();
            }
        })
    },
    // 登录验证
    authUser: function() {
        const loginUser = Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER);
        if(Tool.isEmpty(loginUser)) {
            Notify({ type: "danger", message: "请先登录！", duration: 2000 });
            return true;
        } else {
            return false;
        }
    },
    // 退出登录
    logout: async function() {
        const loginUser = Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER);
        const res = await myRequest({
            url: api.BASE_URL + "/app/user/logout",
            method: "POST",
            data: {
                token: loginUser
            }
        });
        if(res.data.code === 0) {
            Notify({ type: "success", message: res.data.msg, duration: 1000 });
        }
        Cache.removeCache(getApp().globalData.SESSION_KEY_LOGIN_USER);    
        this.setData({isLogin: false, userInfo: {
            username: "还未登录，请先登录！",
            headPic: api.BASE_URL + "/photo/view?filename=common/mine_normal.jpg"
        }});
    },
    // 打开上传图片的窗口
    openUploadCoverPhoto: function() {
        wx.chooseMedia({
            count: 1,
            mediaType: ["image"],
            sourceType: ["album"],
            success: (res) => {
                let file = res.tempFiles[0].tempFilePath;
                // 获取文件后缀
                const fileFormat = file.substring(file.lastIndexOf(".") + 1, file.length);
                const fileManager = wx.getFileSystemManager();
                const base64 = fileManager.readFileSync(file, "base64");
                this.uploadCoverPhoto(`data:image/${fileFormat};base64,${base64}`);
            },
            fail: (res) => {
                wx.showToast({
                    title: "上传失败",
                    icon: "error"
                })
            }
        })
    },
    // 图片上传操作
    async uploadCoverPhoto(base64) {
        const res = await myRequest({
            url: api.BASE_URL + "/photo/app_upload",
            method: "POST",
            data: {photoBase64: base64}
        });
        if(res.data.code === 0) {
            wx.showToast({
                title: "上传成功！",
                icon: "success"
            })
            this.setData({
                ["editUser.headPic"]: res.data.data
            })
        } else {
            wx.showToast({
                title: res.data.msg,
                icon: "none"
            })
        }
    },

    // 更新个人信息
    updateUserInfo: async function() {
        const res = await myRequest({
            url: api.BASE_URL + "/app/user/update",
            method: "POST",
            data: {
                ...this.data.editUser,
                token: Cache.getCache(getApp().globalData.SESSION_KEY_LOGIN_USER)
            }
        });
        if(res.data.code === 0) {
            Notify({ type: "success", message: res.data.msg, duration: 1000 });
            this.validateLoginState();
            this.closeProfileDialog();
        } else {
            Notify({ type: "danger", message: res.data.msg, duration: 2000 });
        }
    }
})