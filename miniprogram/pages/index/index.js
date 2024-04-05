// pages/index/index.js

import swiper from "../../api/swiper"
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        current: 0,
        memberInfo: false
    },

    onSwiperChange(e) {
        const {
            current
        } = e.detail
        this.setData({
            current
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        swiper.list().then(res => {
            this.setData({
                swiperList: res.data
            })
        })
        this.loadMemberInfo();
    },

    onShow() {
        this.loadMemberInfo();
    },

    loadMemberInfo() {
        if (wx.getStorageSync('phoneNumber')) {
            this.setData({
                memberInfo: true
            })
        }
    },
    gotoLogin() {
        wx.navigateTo({
            url: '/pages/login/index',
        })
    },

    onSwiperTab(e) {
        const {
            item
        } = e.currentTarget.dataset
        item.type === 'url' ? wx.navigateTo({
            url: `/pages/web-view/index?url=${item.target}`,

        }) : wx.navigateTo({
            url: `/pages/product/detail?id=${item.target}`,
        })
    }
})