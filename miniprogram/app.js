// app.js
App({
    onLaunch: function () {
        wx.cloud.init();

        this.globalData = {};
    }
});