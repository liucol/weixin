// 游戏官网，公用方法

/**
 * 获取游戏开服信息
 * demo: getOpenInfo('wzcq', '#openinfo');
 * @param  {string} alias 游戏别名
 * @param  {string} ele 展示的标签
 */
/*
function getOpenInfo(alias, ele){
	$.ajax({
		'url': C9377.app_url+'/api/game_server_jsonp.php',
		'data' : 'alias='+alias+'&reverse=1',
		'dataType' : 'jsonp',
		'type' : 'get',
		success : function(json){
			var xStamp = new Date().getTime(), //当前时间
				newSerArr = []; //存储上下区服数据
				// 显示时间戳大于当前的区服，如果没有，显示最新服
			for(var i = 0; i < json.length; i++){
				var ts = new Date(json[i].START_TIME).getTime();
				if (ts > xStamp) {
					newSerArr[0] = json[i];
				}else{
					newSerArr[1] = json[i];
					break;
				}
			}
			if (newSerArr[0]) {
				$(ele).html(newSerArr[0].NAME + ' ' + newSerArr[0].START_TIME);
			}else{
				$(ele).html(newSerArr[1].NAME + ' ' + newSerArr[1].START_TIME);
			}
		}
	})
}*/
