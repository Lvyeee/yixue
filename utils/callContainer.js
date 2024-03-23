export let callContainer = (path="",parmas="",method="GET",data="") => {
  return new Promise((resolve,reject)=>{
    wx.cloud.callContainer({
      config: {
        "env": "prod-6g8rvo635e2e18c3"
      },
      path: path+'?'+parmas,
      header: {
        "X-WX-SERVICE": "yixue-service",
        "content-type": "application/json"
      },
      method,
      data,
      success: (res)=> {
        console.log(res,'数据成功返回');
        resolve(res)
      },
      fail: (fail) => {
        reject(fail);
      }
    })
  })
}