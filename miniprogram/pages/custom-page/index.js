// pages.custom-page/index.js
import pageApi from "../../api/page"
Page({
	data: {
		page: null
	},

	onLoad: function (options) {
		const {
			code
		} = options;
		pageApi.detail(code).then(res => {
			const page = res.data[0]
			this.setData({
				page
			})
			wx.setNavigationBarTitle({
				title: page.title,
			})
		})
	}
})