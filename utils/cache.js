// 获取缓存
function getCache(key) {
    if(key) {
        let timestamp = Date.parse(new Date()) / 1000;
        let val = wx.getStorageSync(key);
        let tmp = val.split("|");
        if (!tmp[1] || timestamp >= tmp[1]) {
            console.log("key已失效");
            wx.removeStorageSync(key);
            return "";
        } else {
            console.log("key未失效");
            return tmp[0];
        }
    } else {
        console.log("key不能为空");
        return "";
    }

}

// 移除缓存
function removeCache(key) {
    wx.removeStorageSync(key);
}

// 设置缓存
function setCache(key, value, expire) {
    var timestamp = Date.parse(new Date()) / 1000;
    if(key) {
        if (!expire) {
            expire = timestamp + 3600;
        }else{
            expire = timestamp + expire
        }
        value = value + "|" + expire;
        wx.setStorageSync(key, value);
    } else {
        console.log("key不能为空");
    }
}

export default {
    getCache,
    setCache,
    removeCache
}