<template>
    <div>
        <div class="top-wap">
            <span class="toptitle">老角色绑定新账号</span>
        </div>
        <div class="attention">
                <h4>注意事项：</h4>
                <p>1. 以上提写信息必须准确无误，订单号至少需要输入一个，如填写两个订单号，其中有一个正确即为订单号填写正确。</p>
                <p>2. 支付方式，必须与订单号匹配，即，填写微信支付，那么订单号也必须是微信的订单号</p>
                <p>3. 微信订单号为420000开头的订单，共28位</p>
                <p>4. 支付宝订单号为201开头的订单，共28位</p>
                <p>5. 新注册账号（非QQ号或微信），为玩家新注册成功的账号，只需提供账号，不用提供密码。</p>
                <p>6.提交后，24小时内客服会处理后，即新绑定账号生效</p>
                <p class="red">7. 所有信息填写真实准确，才可以成功绑定账号！（订单号任意一个正确也OK），提交错误信息100%不会绑定成功！</p>
            </div>
            <div class="information">
                <label for="gamename">游戏名称：</label>
                <!--  v-model="bindaccountinfo" -->
                <select id="gamename" v-model="bindaccountinfo.GameName"> 
                    <option value ="" class="valpop">---游戏名称---</option>
                    <option
                            v-for="(list,index) in gamename" :value ="list"> 
                            {{list}}
                    </option>
                </select>
                
                <label for="server">区服：</label>
                <!--  v-model="" -->
                <select id="server" @change="choseserver()" v-model="bindaccountinfo.Zone"> 
                    <option value ="" class="valpop">---区服---</option>
                    <option
                            v-for="(list,index) in server" :value ="list"> 
                            {{list}}
                    </option>
                </select>

                <label for="servernum">区号：</label>
                <!--  v-model="" -->
                <!-- <select id="servernum"> 
                    <option value ="" class="valpop">{{serverplaceholder}}</option>
                    <option
                            v-for="(list,index) in servernum" > 
                            {{list}}
                    </option>
                </select>区 -->
                <input id="servernum" v-model="bindaccountinfo.ZoneNum" @input="inputnum()" placeholder="---区号---"/>区

                <label for="rolename">角色名：</label>
                <input id="rolename" v-model="bindaccountinfo.RoleName" placeholder="---角色名---"/>
                
                <label for="pay">支付方式：</label>
                <!--  v-model="" -->
                <select id="pay" v-model="bindaccountinfo.PayType"> 
                    <option value ="" class="valpop">---支付方式---</option>
                    <option
                            v-for="(list,index) in pay" :value ="list.type"> 
                            {{list.name}}
                    </option>
                </select>

                <label for="ordernum1">交易单号1：</label>
                <!--  v-model="" -->
                <input id="ordernum1" v-model="bindaccountinfo.Order1" placeholder="---订单号1---"/>

                <label for="ordernum2">交易单号2：</label>
                <!--  v-model="" -->
                <input id="ordernum2" v-model="bindaccountinfo.Order2"  placeholder="---订单号2---"/>

                <label for="newaccountnum">新注册账号：</label>
                <!--  v-model="Account" -->
                <input id="newaccountnum" @input="inputaccount()" v-model="bindaccountinfo.Account" placeholder="---新注册账号---"/>
                
                <label for="phonenum">手机号：</label>
                <!--  v-model="" -->
                <input id="phonenum" v-model="bindaccountinfo.PhoneNum" placeholder="---手机号---"/>
                
                <div class="errormsg red">{{errormsg}}</div>
                <p class="submit-wap">
                    <span class="submitbutton" @click="submit()">提交</span>
                </p> 
            </div>
            <span class="tost">tost</span>
    </div>
</template>
<script>
    import axios from 'axios'
    import url from '../api/index.js'

    export default {
        name: 'bindaccount',
        props: {},
        data() {
            return {
                gamename: ["无极修仙", "星尘诀", "神魔纪元", "妖神", "百将江湖OL"],
                server: ["蜀山", "九耀", "星宿海", "魔王"],
                serverplaceholder: "---区号---",
                pay: [{
                    type: "weixin",
                    name: "微信支付"
                }, {
                    type: "zfb",
                    name: "支付宝支付"
                }],
                bindaccountinfo: {
                    GameName: "",
                    Zone: "",
                    RoleName: "",
                    ZoneNum: "",
                    PayType: "",
                    Order1: "",
                    Order2: "",
                    Account: "",
                    PhoneNum: ""
                },
                submitboolen: false,
                errormsg: ""
            }
        },
        created() {

        },
        methods: {
            // choseserver(index) {
            //     if (index == 0) {
            //         this.serverplaceholder = "选择填写1-850区"
            //     } else if (index == 1) {
            //         this.serverplaceholder = "选择填写1-450区"
            //     }
            // }
            inputnum() {
                var zonenum = this.bindaccountinfo.ZoneNum,
                    zonenumarr = zonenum.split(""),
                    rep = /[0-9]/,
                    zonenumresarr = []

                for (var i = 0; i < zonenumarr.length; i++) {
                    if (rep.test(zonenumarr[i])) {
                        zonenumresarr.push(zonenumarr[i])
                    }

                    if (i == zonenumarr.length - 1) {
                        this.bindaccountinfo.ZoneNum = zonenumresarr.join("")
                    }
                }

            },
            inputaccount() {
                var account = this.bindaccountinfo.Account,
                    accountarr = account.split(""),
                    zhReg = /[\u4e00-\u9fa5]/, //判断汉字
                    accountresarr = []

                for (var i = 0; i < accountarr.length; i++) {
                    if (!zhReg.test(accountarr[i])) {
                        accountresarr.push(accountarr[i])
                    }
                    if (i == accountarr.length - 1) {
                        this.bindaccountinfo.Account = accountresarr.join("")
                    }
                }

            },
            submit() {

                //清空错误提示
                this.errormsg = ""

                if (this.submitboolen) {
                    return
                }
                var $tost = $(".tost")

                var weixinr = /^420000[0-9]{22}/,
                    zfbr = /^201[0-9]{25}/,
                    phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/


                var gamename = this.bindaccountinfo.GameName,
                    zone = this.bindaccountinfo.Zone,
                    zonenum = this.bindaccountinfo.ZoneNum,
                    rolename = this.bindaccountinfo.RoleName,
                    paytype = this.bindaccountinfo.PayType,
                    order1 = this.bindaccountinfo.Order1,
                    order2 = this.bindaccountinfo.Order2,
                    account = this.bindaccountinfo.Account,
                    phonenum = this.bindaccountinfo.PhoneNum

                //游戏名称    
                if (gamename.length == 0) {
                    this.errormsg = "亲~游戏名称不能为空哟~"
                    return
                }

                //区服
                if (zone.length == 0) {
                    this.errormsg = "亲~区服不能为空哟~"
                    return
                }

                //区号
                if (zonenum.length == 0) {
                    this.errormsg = "亲~区号不能为空哟~"
                    return
                }
                if (zonenum.length > 0) {
                    zonenum = zonenum.replace(/\b(0+)/gi)
                }
                if (zonenum.length > 3) {
                    //tostfun("亲~区号必须为非0开头的1~3位数字哟~", 5000)
                    this.errormsg = "亲~区号必须为非0开头的1~3位数字哟~"
                    return
                }
                this.bindaccountinfo.ZoneNum = parseInt(zonenum)

                //角色
                if (rolename.length == 0) {
                    // tostfun("亲~角色名不能为空哟~", 5000)
                    this.errormsg = "亲~角色名不能为空哟~"
                    return
                }

                //支付
                if (paytype && paytype == "weixin") {
                    if (order1.length > 0 && !weixinr.test(order1)) {
                        // tostfun("亲~订单号1必须为420000开头的订单，共28位~", 5000)
                        this.errormsg = "亲~交易单号1必须为420000开头的订单，共28位~"
                        return
                    }

                    if (order2.length > 0 && !weixinr.test(order2)) {
                        //tostfun("亲~订单号2必须为420000开头的订单，共28位~", 5000)
                        this.errormsg = "亲~交易单号2必须为420000开头的订单，共28位~"
                        return
                    }

                } else if (paytype && paytype == "zfb") {
                    if (order1.length > 0 && !zfbr.test(order1)) {
                        //tostfun("亲~订单号1必须为201开头的订单，共28位~", 5000)
                        this.errormsg = "亲~交易单号1必须为201开头的订单，共28位~"
                        return
                    }

                    if (order2.length > 0 && !zfbr.test(order2)) {
                        //tostfun("亲~订单号2必须为201开头的订单，共28位~", 5000)
                        this.errormsg = "亲~交易单号2必须为201开头的订单，共28位~"
                        return
                    }
                }


                //新注册账号
                if (account.length == 0) {
                    //tostfun("亲~必须填写新注册账号", 5000)
                    this.errormsg = "亲~新注册账号不能为空~"
                    return
                }

                //手机号
                if (phonenum.length == 0) {
                    //tostfun("亲~手机号不能为空", 5000)
                    this.errormsg = "亲~手机号不能为空"
                    return
                }

                if (phonenum.length != 0 && !phoneReg.test(phonenum)) {
                    //tostfun("亲~请填写正确手机号哟", 5000)
                    this.errormsg = "亲~请填写正确手机号哟"
                    return
                }

                this.submitboolen = true
                $(".submitbutton").addClass("disabled")

                axios.post(url.bindaccount, this.bindaccountinfo).then(res => {
                    var code = res.data.Code,
                        msg = res.data.Msg

                    if (code == 0) {
                        window.location.href = "#/bindaccountsuccess"
                    } else {
                        this.submitboolen = false
                        $(".submitbutton").removeClass("disabled")

                        //tostfun(msg, 5000)
                        this.errormsg = msg
                        return
                    }

                })

                function tostfun(m, time) {
                    $tost.html(m)
                    $tost.fadeIn()
                    setTimeout(function() {
                        $tost.fadeOut()
                    }, time)
                }

            }
        }
    }
</script>
<style>
    .top-wap {
        background: #8E66F0;
        padding: 20px 0;
    }
    
    .top-wap .toptitle {
        display: inline-block;
        width: 100%;
        vertical-align: middle;
        text-align: center;
        font-size: .3rem;
        color: #fff;
    }
    
    .attention {
        width: 90%;
        margin: 100px auto;
        border: 1px solid #ccc;
        background: rgba(1, 1, 1, .1);
        padding: 20px;
    }
    
    .information label {
        display: inline-block;
        width: 25%;
        text-align: right;
        font-size: .25rem;
    }
    
    .information select,
    .information input {
        padding: 8px 5px;
        margin-bottom: 15px;
        width: 60%;
        height: .5rem;
        border: 1px solid #E1E1E1;
        border-radius: 3px;
        font-size: .23rem;
    }
    
    .information select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        border: 1px solid #ccc;
        background: url("http://chxweb.chuxinhudong.com/static/weixin/image/selec-down.png") no-repeat right;
    }
    
    .information select option {
        font-size: .08rem !important;
    }
    
    .errorinput {
        border-color: red;
    }
    
    .errormsg {
        height: 52px;
        text-align: center;
    }
    
    .submit-wap {
        text-align: center
    }
    
    .submitbutton {
        display: inline-block;
        padding: 12px 100px;
        margin-bottom: 40px;
        color: #fff;
        background: #4472C4;
        border-radius: 5px;
    }
    
    .disabled {
        background: #ccc;
    }
    
    .tost {
        display: none;
        position: absolute;
        right: 2rem;
        top: 7.1rem;
        background: #D9A800;
        padding: 5px 20px;
        font-size: .23rem;
        border-radius: 5px;
        color: #fff;
    }
    
    .red {
        color: red;
    }
</style>