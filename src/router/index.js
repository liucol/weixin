import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/search.vue' //查找页面
import Searchresult from '@/components/searchresult.vue' //查找结果页
import Gifthome from '@/components/gifthome.vue' //原游戏列表
import Giftlist from '@/components/giftlist.vue' //礼包列表
import Bindaccount from '@/components/bindaccount.vue' //玩家自助后台-角色绑定新账号
import Bindaccountsuccess from '@/components/bindaccountsuccess.vue' //角色绑定新账号成功

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/searach',
            name: 'search',
            component: Search
        },
        {
            path: '/searchresult',
            name: 'searchresult',
            component: Searchresult
        },
        {
            path: '',
            name: 'gifthome',
            component: Gifthome
        },
        {
            path: '/bindaccount',
            name: 'bindaccount',
            component: Bindaccount
        },
        {
            path: '/bindaccountsuccess',
            name: 'bindaccountsuccess',
            component: Bindaccountsuccess
        }
    ]
})