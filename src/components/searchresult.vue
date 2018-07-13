<template>
      <div class="searchresult-wp">
            <div class="back">
                <a href="#/searach"><img src="image/back.png"/></a>
                <span class="toptitle">游戏</span>
            </div>
            <div class="prompt">
                 <p>
                    说明：“以下为符合您条件的游戏信息，您可以点开游戏图片查看，确认后点击下载即可，如果都没有您要找的游戏请联系客服解决”
                 </p>
            </div>
            <div class="relist">
                <ul class="hd clearfix">
                    <li>系统</li>
                    <li>游戏名称</li>
                    <li>区服</li>
                    <li>登录方式</li>
                    <li>游戏图片</li>
                    <li>下载</li>
                </ul>
                <div class="list">
                    <ul class="bd clearfix"
                        v-for="(list,index) in getgamebag" 
                    >
                        <li>{{list.System}}</li>
                        <li>{{list.Name}}</li>
                        <li>{{list.Zone}}</li>
                        <li>{{list.Login}}</li>
                        <li>
                                <span  class="imgwrap"
                                    v-for="(imglist,index) in list.Pictures" 
                                    v-if="imglist.Type == 0"
                                >
                                    <img  class="imgpic" :src="imglist.Linkdir" @click="enlarge(imglist.Linkdir)"/>
                                </span>
                        </li>
                        <li class="down">
                            <a :href="list.DownLink"  @click="checkuseragent()">
                                <i class="down-img"></i>
                            </a>
                        </li>
                    </ul>
                    <!-- <ul class="bd clearfix">
                        <li>安卓</li>
                        <li>三生三世</li>
                        <li>青云1区</li>
                        <li>QQ、微信授权登录</li>
                        <li>游戏图片</li>
                        <li class="down">
                            <a href="">
                                <i class="down-img"></i>
                            </a>
                        </li>
                    </ul> -->
                </div>
            </div>
            <div class="pop-wrap" v-show="showimg" @click = "closepop()">
                <div class="popimg">
                    <img :src="largeimg"/>
                </div>
            </div>
            <!-- 弹窗 -->
            <div class="dialogWrap" v-show="showdialog" @click="closedialog()">
                <div class="dialogContent">
                    <div class="title">
                        <span class="tipes">温馨提示</span>
                        <span class="closedialog" @click="closedialog()">╳</span>
                    </div>
                    <p>下载游戏请在右上角选择浏览器打开网页</p>
                </div>  
            </div>
      </div>
</template>

<script>
    import axios from 'axios' 
    import url from '../api/index.js'
    import qs from 'qs'

    export default {
        name: 'searchresult',
        data() {
            return {
                getgamebag: null,
                showimg: false,
                largeimg: null,
                showdialog: false
            }
        },
        created() {
           this.getParams()
        },
        methods:{
            getParams () {
                let urlarry = location.hash.split('?')[1],
                    System = qs.parse(urlarry).System,  //操作系统
                    Name = qs.parse(urlarry).Name,  //游戏名称
                    Zone = qs.parse(urlarry).Zone,  //区服
                    Login = qs.parse(urlarry).Login //登录方式

                    axios.get(url.getgamebag+"?System="+System+"&Name="+Name+"&Zone="+Zone+"&Login="+Login).then(res => {
                        var code = res.data.Code,
                            msg = res.data.Msg,
                            data = res.data.Data

                        if(code == 0){
                            this.getgamebag = data
                        }else{
                            alert(msg)
                        }

                    })
            },
            enlarge(imgdata){
                this.showimg = true

                this.largeimg = imgdata
            },
            closepop(){
                this.showimg = false
            },
            checkuseragent(){
                var ua = navigator.userAgent.toLowerCase()

                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    this.showdialog = true
                }
            },
            closedialog(){
                this.showdialog = false
            }
        },
        watch: {
        
        },
        mounted(){
            
        }
    }
</script>

<style searchresult>
.clearfix:after {
    content: ""; 
    display: block; 
    clear: both; 
 }
.searchresult-wp{
    padding-top: 1px;
}
.back{
    background: #8E66F0;
    padding: 20px 0;
}
.back a{
    display: inline-block;
    margin-left: 10px;
    width: 10%;
    vertical-align: middle;
}
.toptitle{
    display: inline-block;
    width: 80%;
    vertical-align: middle;
    text-align: center;
    font-size: .3rem;
    color: #fff;
}
.prompt{
    width: 90%;
    margin: 100px auto;
    border: 1px solid #ccc;
    background: rgba(1,1,1,.1);
    padding: 20px;
}
.prompt p{
    font-size: .22rem;
}
.relist{
    margin-top: 80px;
}
.hd{
    width: 95%;
    margin: 0 auto;
    color: #8E66F0;
    border-bottom: 1px solid #8E66F0;
}
.bd{
    width: 95%;
    margin: 0 auto;
}
.hd li:nth-child(1),
.bd li:nth-child(1){
    width: 10%;
}
.hd li:nth-child(2),
.bd li:nth-child(2){
    width: 20%;
}
.hd li:nth-child(3),
.bd li:nth-child(3){
    width:  15%;
}
.hd li:nth-child(4),
.bd li:nth-child(4){
    width: 25%;
}
.hd li:nth-child(5),
.bd li:nth-child(5){
    width: 20%;
}
.hd li:nth-child(6){
    width:  10%;
}
.bd li:nth-child(6){
    width:  10%;
    padding: 0;
}
.hd li,
.bd li{
    float: left;
    padding: 5px 10px;
    text-align: center;
}
.hd li{
    font-size: .19rem;
}
.bd{
    border-bottom: 1px solid #ccc;
}
.bd li{
    padding: 15px 0;
    font-size: .17rem;
}
/* .bd::nth-child(even){
    background: #ccc;
} */
.down-img{
    display: inline-block;
    margin-bottom: -4px;
    width: 40px;
    height: 35px;
    background: url("http://chxweb.chuxinhudong.com/static/weixin/image/imgic.png");
    background-position: -2px 38px;
}
.down a{
    display: inline-block;
    padding: 30px;
    width: 100%;
    height: 100%;
}
.imgwrap{
    display: block;
    margin-bottom: 5px;
}
.imgwrap img{
    width: 60px;
}

/* 图片放大 */
.pop-wrap{
    position: fixed !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(1, 1, 1, .4);
    z-index: 3;
}
.pop-wrap .popimg{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 95%;
    /* background: #fff;
    padding: 35px; */
    border-radius: 5px;
}
.pop-wrap .popimg img{
    width: 100%;
}


/* 弹窗 */
.dialogWrap{
    /* display: none; */
    position: fixed;
    margin: 0 auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
}
.dialogContent{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    transform: translate(-50%,-50%);
    background: #fff;
    color: #333;
    border-radius: 15px;
}
.dialogContent .tipes{
    display: inline-block;
    padding: 15px 0 0 15px;
    font-size: .3rem;
}
.dialogContent .closedialog{
    display: inline-block;
    padding: 5px 20px;
    float: right;
    font-size: .3rem;
    cursor: pointer;
}
.dialogContent p{
    padding: 35px;
    font-size: .27rem;
    text-indent: .27rem;
}
</style>