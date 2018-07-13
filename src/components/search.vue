<template>
       <div class="search-wp">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swp-page swiper-slide">
                        <a class="js-no-follow">     
                            <!-- /static/weixin/image/1.jpg  image/1.jpg-->
                            <img class="goods-main-photo fadeIn" src="image/1.jpg">
                        </a>
                    </div>
                    <div class="swp-page swiper-slide">
                        <a class="js-no-follow">
                            <img class="goods-main-photo fadeIn" src="image/2.jpg">
                        </a>
                    </div>
                    <div class="swp-page swiper-slide">
                        <a class="js-no-follow">
                            <img class="goods-main-photo fadeIn" src="image/3.jpg">
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="search-option">
                <label>操作系统：</label>
                <select v-model="getgamebag.System" @change="Systemgetinfo()">
                    <option value ="" class="valpop">---操作系统---</option>
                    <!-- <option value ="IOS">IOS</option>
                    <option value="安卓">安卓</option> -->
                    <option
                            v-for="(list,index) in system" 
                            :value ="list"> 
                            {{list}}
                    </option>
                </select></br>

                <label>游戏名称：</label>
                <select class="gamename" v-model="getgamebag.Name" @change="gamenamegetinfo()">
                    <option value ="" class="valpop">---游戏名称---</option>
                    <option
                            v-for="(list,index) in Namearr" 
                            :value ="list"> 
                            {{list}}
                    </option>
                </select></br>
                
                <label>区服：</label>
                <select v-model="getgamebag.Zone">
                    <option value ="" class="valpop">---区服---</option>
                    <option
                           v-for="(list,index) in Zonearr" 
                           :value ="list"> 
                           {{list}}
                    </option>
                </select></br>

                <label>登录方式：</label>
                <select v-model="getgamebag.Login">
                    <option value ="" class="valpop">---登录方式---</option> 
                    <option
                           v-for="(list,index) in login" 
                           :value ="list"> 
                           {{list}}
                    </option>
                </select>
                <!-- <div class="device-num">
                    <input placeholder="设备号输入"/><span class="qus" @click="showpop()">?</span>
                </div>-->
                <div>
                    <span class="searchbutton" @click="sendParams">搜索</span>
                </div> 
            </div>
            <div class="pop-wrap" v-show="showpopb">
                <div class="pop">
                    <p>
                        说明：“可选项，通过输入设备号可以查到该设备下以前玩过的我们平台的游戏，设备号的获取方式为“在手机拨号界面输入 *#06# ”，如果有多个识别码弹出，请输入第一个”
                    </p>
                    <div class="okbtn"><span @click="closepop()">ok</span></div>
                </div>
            </div>
            <span class="tost"></span>
       </div>
</template>


<script>
    import Swiper from "swiper"
    import "swiper/dist/css/swiper.css"

    import axios from 'axios' 

    import url from '../api/index.js'

    export default {
        name: 'search',
        props: {
            Namearr:{   //游戏名称
              required: true
            },
            Zonearr:{   //区服
              required: true
            }
          },
        data() {
            return {
                getgamebag: {
                    System: "",
                    Name: "",
                    Zone: "",
                    Login: ""
                },
                system: ["IOS","安卓"],   //操作系统
                login: ["注册或一键登录","QQ或微信授权登录"],   //登录方式
                showpopb: false,
                getlist:  url.getgamebag    //"http://chxweb.chuxinhudong.com/stat/api/package/list"
            }
        },
        created() {
            
        },
        methods:{
            showpop(){
                this.showpopb = true
            },
            closepop(){
                this.showpopb = false
            },
            sendParams () { 
                var System = this.getgamebag.System,
                    Name = this.getgamebag.Name,
                    Zone = this.getgamebag.Zone,
                    Login = this.getgamebag.Login

                    var $tost = $(".tost")
                    if(! this.getgamebag.System){
                        $tost.html("亲~ 必须选择一个操作系统哟")
                        $tost.fadeIn()
                        setTimeout(function(){
                            $tost.fadeOut()
                        },2000)
                        return
                    }    
                    window.location.href = "#/searchresult?System="+System+"&Name="+Name+"&Zone="+Zone+"&Login="+Login
            },
            Systemgetinfo(){
                axios.get(this.getlist+"?System="+this.getgamebag.System+"&Name="+this.getgamebag.Name).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        gamebagdata = res.data.Data


                    if(gamebagdata){
                        this.Namearr = [],  //清空默认全部游戏名称
                        this.Zonearr = [],
                        this.login = []
                    }
                   
                    if(code == 0){
                        for(var i = 0; i<gamebagdata.length; i++){
                            var getname = gamebagdata[i].Name,
                                getzone = gamebagdata[i].Zone,
                                getlogin = gamebagdata[i].Login
                            
                            var Namearrindexof = this.Namearr.indexOf(getname),
                                Zonearrindexof = this.Zonearr.indexOf(getzone),
                                loginindexof = this.login.indexOf(getlogin)

                                if(Namearrindexof < 0){
                                    this.Namearr.push(getname)
                                }

                                if(Zonearrindexof < 0){
                                    this.Zonearr.push(getzone)
                                }

                                if(loginindexof < 0){
                                    this.login.push(getlogin)
                                }
                        }
                    }else{
                        alert(msg)
                    }

                })
            },
            gamenamegetinfo(){
                axios.get(this.getlist+"?Name="+this.getgamebag.Name+"&System="+this.getgamebag.System).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        gamebagdata = res.data.Data

                        if(gamebagdata){
                            this.Zonearr = []
                            this.login = []
                        }

                        if(code == 0){
                            for(var i = 0; i<gamebagdata.length; i++){
                                var getzone = gamebagdata[i].Zone,
                                    getlogin = gamebagdata[i].Login

                                if(this.Zonearr.length == 0){
                                    this.Zonearr.push(getzone)
                                }else{
                                    var indexof = this.Zonearr.indexOf(getzone)
                                    if(indexof < 0){
                                        this.Zonearr.push(getzone)
                                    }
                                }

                                if(this.login.length == 0){
                                    this.login.push(getlogin)
                                }else{
                                    var indexof = this.login.indexOf(getlogin)
                                    if(indexof < 0){
                                        this.login.push(getlogin)
                                    }
                                }

                            }
                        }else{
                            alert(msg)
                        }
                })
            },

        },
        mounted() {
            new Swiper(".swiper-container",{
                loop: true,
                pagination: { el: '.swiper-pagination'}
            })
        }
    }
</script>


<style>
    .swiper-slide img {
        height: 100%;
        width: 100%;
    }
    .search-option{
        margin-top: 30px;
        padding:  80px 10px;
        text-align: center;
        font-size: .25rem;
    }
    .search-option label{
        display: inline-block;
        width: 25%;
        text-align: right;
    } 
    .search-option select,
    .device-num input{
        padding: 8px 5px;
        margin-bottom: 15px;
        width:  60%;
        border: 1px solid #E1E1E1;
        border-radius: 3px;
        font-size: .25rem;
    }
    .search-option select{
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border: 1px solid #ccc;
        background: url("http://chxweb.chuxinhudong.com/static/weixin/image/selec-down.png") no-repeat right;
    }
    .search-option select option{
        font-size: .08rem !important;
    }
    .device-num{
        position: relative;
    }
    .device-num .qus{
        position: absolute;
        display: inline-block;
        margin-left: 10px;
        width: 65px;
        padding: 6px 0 6px 0;
        border-radius: 50%;
        border: 1px solid #ccc;
        font-weight: 900;
        font-size: .2rem;
    }
    .valpop{
        color: #ccc;
    }
    .searchbutton{
        display: inline-block;
        padding: 10px 70px;
        margin-top: 40px;
        color: #fff;
        background: #4472C4;
        border-radius: 5px;
    }
    .pop-wrap{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(1, 1, 1, .4);
        z-index: 3;
    }
    .pop-wrap .pop{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 70%;
        background: #fff;
        padding: 35px;
        border-radius: 5px;
    }
    .pop-wrap .pop p{
        font-size: .25rem;
        text-indent: 50px;
    }
    .pop-wrap .pop .okbtn{
        margin-top: 20px;
    }
    .pop .okbtn span{
        display: block;
        width: 70%;
        margin-left: 15%;
        background-color: #ccc;
        padding: 5px;
        border-radius: 5px;
        text-align: center;
        font-size: .24rem;
    }
    .tost{
        display: none;
        position: absolute;
        right: 2rem;
        top: 6.5rem;
        background: #D9A800;
        padding: 5px 20px;
        font-size: .23rem;
        border-radius: 5px;
        color: #fff;
    }
</style>