<template>
    <div id="gifthome-wp">
        <div id="gifthome-title">
            <p>礼包领取</p>
        </div>
        <div id="gifthome-content">
            <a class="origingame-wp" v-for="(list,index) in origingamelist">
                <div class="img-wp">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swp-page swiper-slide" v-for="(picturelist,item) in list.GiftPicture">
                                <a class="js-no-follow">
                                    <!-- /static/weixin/image/1.jpg  image/1.jpg-->
                                    <img class="goods-main-photo fadeIn" :src="picturelist.Linkdir">
                                </a>
                            </div>
                            <!-- <div class="swp-page swiper-slide">
                                    <a class="js-no-follow">
                                        <img class="goods-main-photo fadeIn" src="/static/weixin/image/2.jpg">
                                    </a>
                                </div>
                                <div class="swp-page swiper-slide">
                                    <a class="js-no-follow">
                                        <img class="goods-main-photo fadeIn" src="/static/weixin/image/3.jpg">
                                    </a>
                                </div> -->
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="origingame-info">
                    <div class="intorduct">
                        <h2>{{list.OldName}}</h2>
                        <p class="game-description" :data-content="list.Description">
                            <!-- 游戏描述 -->
                        </p>
                    </div>
                    <div class="button clearfix">
                        <a class="downgame" :href="list.DownLink" @click="checkuseragent()">
                            <!-- 下载游戏 -->
                            <img src="/static/weixin/image/downgame.png" />
                        </a>
                        <a class="getgift" @click="getgiftlist(list.Id,list.OldName)">
                            <!-- 礼包领取 -->
                            <img src="/static/weixin/image/getgift.png" />
                        </a>
                    </div>
                </div>
            </a>
            <p class="loading" v-show="visibale">
                <img src="/static/weixin/image/loading.gif" />
            </p>
            <p class="loaded" v-show="!visibale">
                加载完~
            </p>
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
    import Swiper from "swiper"
    import "swiper/dist/css/swiper.css"
    import axios from 'axios'
    import $ from 'jquery'

    import url from '../api/index.js'

    export default {
        name: 'search',
        props: {
            Authtoken:{   //登录token
              required: true
            }
        },
        data() {
            return {
                origingamelist: [],
                page: 1,
                loading: true,
                visibale: true,
                getdata: false,
                showdialog: false
            }
        },
        created() {
            this.getgiftorigingamelist()
        },
        mounted(){
            $(window).on("scroll",this.load)
        },
        methods: {
            getgiftorigingamelist() {
                //if(this.loading){
                    if(this.getdata){
                        return
                    }
                    this.getdata = true

                    // var setings = {
                    //     url: url.getorigingame,
                    //     method: 'get',
                    //     headers: {
                    //         "AuthToken": "123"
                    //     },
                    //     params: {
                    //         page: this.page
                    //     },
                    // }

                    //  axios.get(url.getorigingame+"?page="+this.page)
                    axios.get(url.getorigingame,{
                        // headers:{
                        //     'Authtoken':  this.Authtoken
                        // },
                        params:{
                            page: this.page
                        }
                    }).then(res => {
                        var data = res.data.Data
                        // console.log("测试得到的返回数据")
                        // console.log(res)
                        // console.log(res.headers["content-length"])
                        if(!data || data.length < 5){
                            this.visibale = false
                        }

                        if(data){
                            for(var i = 0; i<data.length; i++){
                                this.origingamelist.push(data[i])
                            }
                            this.page++
                        }

                        this.getdata = false
                    })
                //}
            },
            load() {
                var $loading = $(".loading"),  //load元素
                    scrollTop = $(window).scrollTop(), //滚动高度
                    $bHeight = $(window).height() + scrollTop, //窗口高度+滚动高度
                    offsetTop = $loading.offset().top, //元素到文档顶部高度
                    $sHeight = offsetTop + $loading.outerHeight()  //元素到文档顶部高度+元素的外部高度

                if (offsetTop < $bHeight && $sHeight > scrollTop) {
                    //加载
                    this.loading = true
                    this.getgiftorigingamelist()
                }else{
                    this.loading = false
                }
            },
            getgiftlist(id,name){
                window.location.href = "#/giftlist?id="+id+"&name="+name
                //this.$router.push({path:'/giftlist',query:{stringqueryobj}})
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
        updated() {
            new Swiper(".swiper-container", {
                loop: true,
                pagination: { el: '.swiper-pagination' }
            })
        },
        beforeUpdate() {
            this.$nextTick(function () {
                var $content = $(".game-description")

                for (var i = 0; i < this.origingamelist.length; i++) {
                    $content.eq(i).html(this.origingamelist[i].Description)

                    var ele = $content.eq(i)[0],
                        obj = ele.getElementsByTagName('*')

                    for (var j = 0; j < obj.length; j++) {
                        obj[j].style.fontSize = '';
                        obj[j].style.lineHeight = '1.3';
                    }
                } 
            })
        }
    }
</script>
<style>
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }

    #gifthome-wp {
        position: relative;
    }

    #gifthome-title {
        /* position: fixed; */
        top: 0;
        padding: 15px 0;
        width: 100%;
        background: #8e66f0;
        z-index: 10;
    }

    #gifthome-title p {
        font-size: .3rem;
        text-align: center;
        color: #fff;
    }

    #gifthome-content {
        padding: 50px 5%;
        margin-top: 75px;
    }

    .origingame-wp {
        display: block;
        margin-bottom: 70px;
        /* border: 1px solid #ccc; */
        /* box-shadow: 0 0 5px hsla(0,0%,0%,0.95); */
        -moz-box-shadow: 0px 0px 20px #B3B3B3;
        -webkit-box-shadow: 0px 0px 20px #B3B3B3;
        box-shadow: 0px 0px 20px #B3B3B3;
        border-radius: 20px;
        overflow: hidden;
    }

    .img-wp {
        /* padding: 35px; */
    }

    .swiper-slide img {
        /* height: 330px; */
        width: 100%;
    }
    /* @media screen and (min-width: 550px) {
        .swiper-slide img {
           height: 350px;
           width: 100%;
        }
    }
    @media screen and (min-width: 650px) {
        .swiper-slide img {
           height: 400px;
           width: 100%;
        }
    }
    @media screen and (min-width: 750px) {
        .swiper-slide img {
           height: 450px;
           width: 100%;
        }
    }

    @media screen and (min-width: 850px) {
        .swiper-slide img {
           height: 610px;
           width: 100%;
        }
    } */

    .origingame-info {
        border-top: 1px solid #ccc;
        color: #333;
    }

    #gifthome-content .intorduct {
        padding: 20px;
    }

    #gifthome-content .intorduct h2 {
        font-size: .27rem;
        font-weight: bold;
    }

    #gifthome-content .intorduct p {
        text-indent: .5rem;
        font-size: .24rem;
    }

    #gifthome-content .button {
        font-size: 0;
    }

    #gifthome-content .button a {
        display: inline-block;
        /* padding: 20px 0; */
        float: left;
        color: #fff;
        width: 50%;
        text-align: center;
        font-size: .28rem;
    }

    #gifthome-content .button img {
        width: 100%;
    }

    .loading,
    .loaded {
        text-align: center;
    }

    .loading img {
        width: 55px;
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
        padding: 30px;
        font-size: .27rem;
        text-indent: .27rem;
    }
</style>