export const myRequest = (options) => {
	return new Promise((resolve,reject)=>{
		wx.request({
			url: options.url,
			method: options.method || "GET",
			data: options.data || {},
			success: (res)=>{
				if(res.statusCode !== 200) {
					return wx.showToast({
						icon: "error",
						title: "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err)=>{
				wx.showToast({
					icon: "error",
					title: "请求接口失败"
				});
				reject(err)
			}
		})
	})
};
