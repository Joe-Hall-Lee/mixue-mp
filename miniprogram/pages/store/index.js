import storeApi from "../../api/store"
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
const computedBehavior = require('miniprogram-computed').behavior
const key = 'DVYBZ-DHJCB-I4CUK-JOTM3-X4Y6H-2PFRK'
import {
    globalBehavivor
} from '../../behaviors/global-behavior'
import {
    userBehavior
} from '../../behaviors/user-behavior'

// pages/store/index.js
Page({
    behaviors: [globalBehavivor, userBehavior, computedBehavior],
    /**
     * 页面的初始数据
     */
    data: {
        latitude: 0,
        longitude: 0,

        storeList: [],
        dict: {
            'OPENING': '营业中',
            'CLOSED': '已关闭'
        },
        mapContext: null,
        mapSdk: key,
        storeDetailShow: false,
        collapse: false,

    },
    computed: {
        markers(data) {
            return data.storeList.map((item, index) => {
                return {
                    id: index + 1,
                    key: item._id,
                    title: item.name,
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                    iconPath: '../../assets/images/marker.png',
                    width: '55rpx',
                    height: '69rpx'
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.initMapSdk();
        await this.loadCurrentLocation()

        this.initMapContext()
    },

    onMarkerTab(e) {
        const {
            markerId
        } = e.detail
        const store = this.data.storeList[markerId - 1]
        this.setData({
            storeDetailShow: true
        })
        this.setCurrentStore(store)
    },

    initMapSdk() {
        this.mapSdk = key; // 腾讯地图 API Key
    },
    fetchStoreList() {
        storeApi.list(this.data.longitude, this.data.latitude).then(res => {
            this.makeStoreList(res.data)
        })
    },
    goToMenu() {
        wx.navigateTo({
            url: '/pages/menu/index'
        })
    },

    navigateLocation(e) {
        const {
            latitude,
            longitude
        } = e.currentTarget.dataset.location
        wx.openLocation({
            latitude,
            longitude
        })

    },
    call(e) {
        const {
            phone
        } = e.currentTarget.dataset
        wx.makePhoneCall({
            phoneNumber: phone,
        })
    },
    makeStoreList(storeList) {
        if (storeList.length === 0) {
            this.setData({
                storeList: []
            })
        }
        const locationList = storeList.map(item => {
            const location = item.location;
            return `${location.latitude},${location.longitude}`;
        });
        const to = locationList.join(';'); // 将坐标数组转换为字符串
        // 设置请求参数
        const key = this.mapSdk
        const from = this.data.latitude + ',' + this.data.longitude; // 起点坐标

        const mode = 'walking'; // 计算方式

        // 构造请求 URL
        const url = `https://apis.map.qq.com/ws/distance/v1/matrix?mode=${mode}&from=${from}&to=${to}&key=${key}`;

        // 发送 GET 请求
        wx.request({
            url: url,
            method: 'GET',
            success: (res) => {
                storeList.forEach((item, key) => {
                    storeList[key]['distance'] = (res.data.result.rows[0].elements[key].distance / 1000).toFixed(2)
                })
                this.setData({
                    storeList
                })

            }
        });
    },

    initMapContext() {
        wx.createSelectorQuery().select('#store-map').context((res) => {
            this.mapContext = res.context
        }).exec()
    },

    popupStoreDetail(e) {
        const {
            store
        } = e.currentTarget.dataset
        this.setData({
            storeDetailShow: true,
        })
        this.setCurrentStore(store)

    },
    collapse() {
        this.setData({
            collapse: !this.data.collapse
        })
    },

    async loadCurrentLocation() {
        this.setData({
            latitude: this.data.user.location.latitude,
            longitude: this.data.user.location.longitude
        })
        this.fetchStoreList()
    },

    goToCurrentLocation() {
        this.mapContext.moveToLocation()

        this.loadCurrentLocation();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})