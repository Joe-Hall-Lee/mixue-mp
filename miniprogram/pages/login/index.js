// pages/login/index.js
import userApi from "../../api/user"

Page({
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        if (getApp().isLogin()) {
            wx.navigateBack({
                delta: 0,
            })
        }

    },
    login(e) {
        const cloudId = e.detail.cloudId
        wx.cloud.callFunction({
            name: 'get-phone-number',
            data: {
                weRunData: wx.cloud.CloudID(cloudId), // 这个 CloudID 值到云函数端会被替换
            }

        }).then(res => {
            const phoneNumber = res.result

            userApi.create({
                phoneNumber
            }).then(response => {
                userApi.me().then(results => {
                    wx.setStorageSync('user', results.data[0])
                    wx.navigateBack({
                        delta: 0
                    })
                })
            })

        })
    }
})