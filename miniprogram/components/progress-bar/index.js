Component({
    /**
     * 组件的属性列表
     */
    properties: {
        color: {
            type: String,
            value: null
        },
        trackColor: {
            type: String,
            value: ''
        },
        value: {
            type: Number,
            value: 0
        },
        width: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        trackStyle: '',
        barStyle: ''
    },

    lifetimes: {
        attached() {
            this.buildTrackStyle();
            this.buildBarStyle();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        buildTrackStyle() {
            let trackStyle = '';
            // 判断 width 是否存在，如果存在加入 width 属性
            if (this.properties.width) {
                trackStyle += `width: ${this.properties.width};`
            }
            if (this.properties.trackColor) {
                trackStyle += `background-color: ${this.properties.trackColor};`
            }
        
            this.setData({
                trackStyle
            })
        },
        buildBarStyle() {
            let barStyle = '';

            !(this.properties.value >= 0 && this.properties.value <= 100) || (barStyle += `width: ${this.properties.value}%;`);
            !this.properties.color || (barStyle += `background-color: ${this.properties.color};`)

            this.setData({
                barStyle
            })
        }
    }
})