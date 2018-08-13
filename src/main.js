// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vConsole from 'vconsole'
import axios from 'axios'
import router from './router'
import url from './api'
import $ from 'jquery'

Vue.config.productionTip = false

//移动端测试vue
// let vConsole = new Vconsole()
// export default vConsole
// vConsole.log("这是main.js")

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    data: {
        gamebag: null,
        Namearr: [],
        Zonearr: []
    },
    created() {
        this.getgamebag()
    },
    methods: {
        getgamebag() {
            axios.get(url.getgamebag).then(res => {
                var datas = res.data.Data
                this.gamebag = datas

                for (var i = 0; i < datas.length; i++) {
                    // this.Namearr.push(datas[i].Name)

                    if (this.Namearr.length == 0) {
                        this.Namearr.push(datas[i].Name)
                    } else {
                        var indexof = this.Namearr.indexOf(datas[i].Name)
                        if (indexof < 0) {
                            this.Namearr.push(datas[i].Name)
                        }
                    }


                    if (this.Zonearr.length == 0) {
                        this.Zonearr.push(datas[i].Zone)
                    } else {
                        var indexof = this.Zonearr.indexOf(datas[i].Zone)
                        if (indexof < 0) {
                            this.Zonearr.push(datas[i].Zone)
                        }
                    }

                }
            })
        }
    },
    mounted() {
        // var $token = $(".token")
        // this.Authtoken = $token.val()

        //移动端测试vue
        //  window.vConsole = new window.VConsole({
        //     defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
        //     maxLogNumber: 1000,
        //     // disableLogScrolling: true,
        //     onReady: function() {
        //         console.log('vConsole is ready.');
        //     },
        //     onClearLog: function() {
        //         console.log('on clearLog');
        //     }
        // });
        // console.log("进入vue文件")
    }
})