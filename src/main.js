// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' 
import router from './router'
import url from './api'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
      gamebag: null,
      Namearr: [],
      Zonearr: [],
      Authtoken:  null  //登录token
  },
  created(){
     this.getgamebag()
  },
  methods: { 
      getgamebag(){
        axios.get(url.getgamebag).then(res => {
            var datas =  res.data.Data
            this.gamebag = datas
            
            for(var i = 0; i<datas.length; i++){
                // this.Namearr.push(datas[i].Name)

                if(this.Namearr.length == 0){
                    this.Namearr.push(datas[i].Name)
                }else{
                    var indexof = this.Namearr.indexOf(datas[i].Name)
                    if(indexof < 0){
                        this.Namearr.push(datas[i].Name)
                    }
                }
                

                if(this.Zonearr.length == 0){
                    this.Zonearr.push(datas[i].Zone)
                }else{
                    var indexof = this.Zonearr.indexOf(datas[i].Zone)
                    if(indexof < 0){
                        this.Zonearr.push(datas[i].Zone)
                    }
                }
                
            }
        })
      }
  },
  mounted(){
    var xhr=new XMLHttpRequest(),
        res = xhr.getResponseHeader()
    console.log(res)
  }
})
