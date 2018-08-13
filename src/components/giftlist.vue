<template>
    <div id="giftlist-wp">
        <div class="toptitle clearfix">
            <a href="#/">
                <img src="image/back.png" />
            </a>
            <span>{{oldname}}</span>
        </div>
        <div class="gift">
            <ul>
                <li class="gift-item clearfix" v-for="(list,index) in giftlist">
                    <img class="gameicon" :src="list.Icon.Linkdir" />
                    <div class="gameinfo">
                        <h3>{{list.GiftPack.Name}}</h3>
                        <p>{{list.GiftPack.Description}}</p>
                    </div>
                    <span v-if="!list.Cdkey" class="getgift-btn" @click="receivegift(index, list.GiftPack.Id, list.CompletedTiem, list.Pre_completed, list.Pre_Name, list.GiftPack.Intervals)">领取</span>
                    <span v-if="list.Cdkey" class="gotgift-btn">{{list.Cdkey}}</span>
                </li>
            </ul>
        </div>
        <!-- 弹窗 -->
        <div class="dialogWrap" v-show="showdialog" @click="closedialog()">
            <div class="dialogContent">
                <div class="title">
                    <span class="tipes">温馨提示</span>
                    <span class="closedialog" @click="closedialog()">x</span>
                </div>
                <p>{{dialogcontent}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'
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
                showdialog: false,
                dialogcontent: '',
                oldname: null,
                giftlist: null
            }
        },
        created() {
            this.getParams()
        },
        methods: {
            getParams() {
                // console.log("目标页面获取的数据")
                // console.log(this.$route.query.gamebaglist);
                let urlarry = location.hash.split('?')[1],
                    id = qs.parse(urlarry).id,
                    name = qs.parse(urlarry).name

                    this.oldname = name
                    
                //  axios.get(url.getgift+'?image='+id)
                axios.get(url.getgift,{
                        // headers:{
                        //     'Authtoken':  this.Authtoken
                        // },
                        params:{
                            image: id
                        }
                    }).then(res=>{
                    var code = res.data.Code,
                        msg = res.data.Msg,
                        data = res.data.Data

                    if(code == 0){
                        this.giftlist = data.reverse()
                    }else{
                        alert(msg)
                    }
                })
            },
            receivegift(index,giftid,completedtiem,pre_completed,pre_name,intervals) {
                 //index    礼包顺序
                 //giftid  当前礼包的id
                 //completedtiem  前置礼包领取时间
                 //pre_completed   true: 第一个礼包||前置礼包已领取  false: 前置礼包未领取
                 //pre_name   前置礼包名称 
                 //intervals  当前列表领取间隔时间

                 var cangetgift ,  //是否到可领取的时间间隔
                     cangetgifttime = ''  //可领取时间

                 if(completedtiem){
                    //  console.log("前置礼包领取时间")
                    //  console.log(completedtiem)
                  var nowdatatime = Math.floor((new Date().getTime())/1000),  //现在的时间戳
                      precddate = completedtiem.replace(/-/g,'/'),
                      precddatetime = Math.floor((new Date(precddate).getTime())/1000) //前置礼包领取的时间戳

                    //   console.log("现在的时间")
                    //   console.log(new Date())

                    //   console.log("前置礼包领取时间")
                    //   console.log(new Date(precddate))

                    //   console.log("两个时间戳")
                    //   console.log(nowdatatime)
                    //   console.log(precddatetime)
                    //   console.log("差值")
                    //   console.log(nowdatatime - precddatetime)
                    //   console.log("间隔领取时间")
                    //   console.log(intervals)

                      if(nowdatatime - precddatetime > intervals){
                          cangetgift = true 
                          //console.log("已到领取时间")
                      }else{
                          cangetgift = false 
                          //console.log("未到领取时间")
                          var cangetgiftdatatime = new Date((precddatetime + intervals)*1000),
                              Y = cangetgiftdatatime.getFullYear() ,
                              M = (cangetgiftdatatime.getMonth()+1 < 10 ? '0'+(cangetgiftdatatime.getMonth()+1) : cangetgiftdatatime.getMonth()+1) ,
                              D = cangetgiftdatatime.getDate(),
                              h = cangetgiftdatatime.getHours(),
                              m = cangetgiftdatatime.getMinutes(),
                              s = cangetgiftdatatime.getSeconds()
                     
                          if(h < 10){
                              h = '0' + h
                          }
                          if(m < 10){
                              m = '0' + m
                          }
                          if(s < 10){
                              s = '0' + s
                          }
                          cangetgifttime = Y+'-'+M+ '-'+D + ' '+h + ':'+m + ':'+s
                        //   console.log("最后领取时间")
                        //   console.log(cangetgifttime)
                      }
                 }
                 

                //  -------不可领取----
                //1, 前置礼包未领取
                if(index != 0 && !pre_completed){
                    this.showdialog = true
                    this.dialogcontent = "亲，领取该礼包前，须先领取"+pre_name+"哟~"
                    return
                }
                
                //2, 前置礼包已领取  -未到间隔时间
                if(index != 0 && pre_completed&&!cangetgift){
                    this.showdialog = true
                    this.dialogcontent = "亲，该礼包的领取时间是："+cangetgifttime+"，别忘了准时来领取礼包哟~"
                    return
                }

                // -------可领取--------
                //1, index = 0直接领取
                //2, 前置礼包已领取  -已到间隔时间
                if(index == 0 || pre_completed&&cangetgift){
                    //console.log("第一个礼包或者满足领取条件")
                    //axios.get(url.getcdkey+"?gift="+giftid)
                    axios.get(url.getcdkey,{
                        headers:{
                            'Authtoken':  this.Authtoken
                        },
                        params:{
                            gift: giftid
                        }
                    }).then(res=>{
                         var code = res.data.Code,
                             msg = res.data.Msg

                             if(code == 0){
                                this.getParams()
                                //window.location.reload()  //刷新页面
                             }else{
                                this.showdialog = true
                                this.dialogcontent = msg
                             }
                    })
                }
            },
            closedialog() {
                this.showdialog = false
            }
        },
        mounted() {

        }
    }
</script>
<style>
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }

    #giftlist-wp .toptitle {
        padding: 15px 0;
        width: 100%;
        background: #8e66f0;
    }

    #giftlist-wp .toptitle a {
        display: inline-block;
        width: 10%;
        vertical-align: middle;
        text-align: left;
    }

    #giftlist-wp .toptitle span {
        display: inline-block;
        width: 80%;
        text-align: center;
        vertical-align: middle;
        font-size: .3rem;
        color: #fff;
    }

    .gift {
        padding: 30px;
        margin-top: 30px;
    }

    .gift-item {
        padding: 10px;
        margin-bottom: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .gift-item .gameicon {
        float: left;
        margin-right: 20px;
        width: 18%;
    }

    .gift-item .gameinfo {
        float: left;
        margin-top: 10px;
    }

    .gift-item .gameinfo h3 {
        font-size: .24rem;
    }

    .gift-item .getgift-btn {
        display: block;
        margin-top: 30px;
        margin-right: 20px;
        float: right;
        padding: 10px 45px;
        font-size: .24rem;
        background: #5677FC;
        -moz-box-shadow: 0px 0px 15px #5677FC;
        -webkit-box-shadow: 0px 0px 15px #5677FC;
        box-shadow: 0px 0px 15px #5677FC;
        color: #fff;
    }

    .gift-item .gotgift-btn {
        display: block;
        margin-top: 30px;
        margin-right: 20px;
        float: right;
        padding: 10px 45px;
        font-size: .24rem;
        background: #ccc;
        -moz-box-shadow: 0px 0px 15px #ccc;
        -webkit-box-shadow: 0px 0px 15px #ccc;
        box-shadow: 0px 0px 15px #ccc;
        color: black;
    }

    /* 弹窗 */

    .dialogWrap {
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

    .dialogContent {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        transform: translate(-50%, -50%);
        background: #fff;
        color: #333;
        border-radius: 5px;
    }

    .dialogContent .tipes {
        display: inline-block;
        padding: 15px 0 0 15px;
        font-size: .3rem;
    }

    .dialogContent .closedialog {
        display: inline-block;
        padding: 5px 20px;
        float: right;
        font-size: .3rem;
        cursor: pointer;
    }

    .dialogContent p {
        padding: 15px;
        font-size: .27rem;
        text-indent: .27rem;
    }
</style>