// pages/login/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {


    },
    login(e) {
        const cloudId = e.detail.cloudId
        wx.cloud.callFunction({
            name: 'get-phone-number',
            data: {
                weRunData: wx.cloud.CloudID(cloudId), // 这个 CloudID 值到云函数端会被替换
            }

        }).then(res => {
            wx.setStorageSync('phoneNumber', res.result)
            wx.navigateBack({
                delta: 0
            })
        })
    }
})