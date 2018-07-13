/**
 * Created by User on 2018/3/27.
 */
let url ={
    getgamebag: '/stat/api/package/list',  //获取游戏包列表
    getorigingame: '/static/weixin/image/list', //获取礼包原游戏列表
    getgift: '/static/weixin/gift/list',  //获取礼包列表
    getcdkey: '/static/weixin/getcdk' //获取cdkey
  }
  
  //开发环境和真实环境的切换
  let  host = 'http://chxweb.chuxinhudong.com'  //http://chxweb.chuxinhudong.com http://192.168.1.174:8080
  
  for(let  key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
  }
  
  export default url
  