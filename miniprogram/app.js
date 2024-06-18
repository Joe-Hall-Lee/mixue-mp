// app.js
import userApi from './api/user'

import {
    userBehavior
} from './behaviors/user-behavior'
App({
    globalData: {},
    onLaunch: function () {

        // 初始化云开发环境
        wx.cloud.init({
            env: 'tianqiao-7g0h1dgx14796ae6', // 替换为实际的云开发环境 ID
            traceUser: true,
        });
        
        if (!this.isLogin()) {
            this.checkUser();
        }
        this.loadCurrentLocation()
    },
    loadCurrentLocation() {
        wx.getLocation({
            type: 'wgs84',
            success: (res) => {

                const latitude = res.latitude
                const longitude = res.longitude
                wx.setStorageSync('location', {
                    longitude,
                    latitude
                })

            }
        })
    },
    isLogin() {
        return Boolean(wx.getStorageSync('user'))
    },
    checkUser() {
        wx.showLoading({
            title: '正在检查登录',
        })
        userApi.me().then(res => {
            if (res.data.length) {
                wx.setStorageSync('user', res.data[0])
                wx.reLaunch({
                    url: '/pages/index/index',
                })
            }
            wx.hideLoading()
        })
    }

});