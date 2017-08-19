require.config({
	paths:{
		"iscroll":"iscroll.min",
		"common":"xz-common",
		"zepto":"zepto",
		"swiper":"swiper-3.4.2.min",
		
	}
})
require(["zepto","swiper","iscroll"],function($){
$(function(){	
	adapt();
window.onresize=function(){
	adapt();
}
//动态获取数据
var goodsMsg = localStorage.goodsMsgs;


function adapt(){
var docwidth= document.documentElement.clientWidth;
document.documentElement.style["font-size"]= docwidth/6.4 + "px";
document.getElementsByTagName("body")[0].style["font-size"]= docwidth/6.4 + "px";

}		
})

	function showtime() {
		setInterval(function() {
			var timer_start = new Date();
		
				var timer_end = new Date();
				timer_end.setMonth(9);
				timer_end.setDate(10);
				timer_end.setHours(10);
				timer_end.setMinutes(10);
				timer_end.setSeconds(10);
				var timergap = parseInt((timer_end - timer_start) / 1000);
				var seconds = timergap % 60;
				if(seconds < 10) {
					seconds = "0" + seconds;
				}
				var minutes = ((timergap - seconds) / 60) % 60;
				if(minutes < 10) {
					minutes = "0" + minutes;
				}
				var hours = ((((timergap - seconds) / 60) - minutes) / 60) % 24;
				if(hours < 10) {
					hours = "0" + hours;
				}
				var dates = parseInt(timergap / 60 / 60 / 24);
				if(dates < 10) {
					dates = "0" + dates;
				}
				$("#search").html(" 距离结束时间：" + dates + "天" + hours + "时" + minutes + "分" + seconds + "秒")
	
		}, 1000)
	}
	showtime();







// 读取商品ID找到详情信息,需要你把localStorage存储数据的ID名改过来，我的是叫goodsMsgs
var goodMsgs =localStorage.getClassId;


//介绍页

$.ajax({
	url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	data:{
	  	goodsID:goodMsgs,
	},
	dataType:"jsonp",
	success:function(res){
		  $(".market-pirce").html("￥"+res[0].price);
	      $(".content .goodimage img").attr("src",res[0].goodsListImg); 
	      $(".good-res .pirce").html("￥"+res[0].price*res[0].discount/10);
	      $(".discount").html(res[0].discount+"折");
	      $(".buy-person").html(res[0].buynumber+"人购买")
	      $(".goodsName").html(res[0].goodsName)
	}
});







	
//跳转	
	$("#classify").click(function(){
		location.href="list.html";
	})
	$("#index").click(function(){
		location.href="../index.html";
	})
	$("#point").click(function(){
		location.href="../index.html";
	})
	$("#detial-1").click(function(){
		location.href="detail.html"
	})
	$("#detial-2").click(function(){
		location.href="detail1.html"
	})
	$("#detial-3").click(function(){
		location.href="detail2.html"
	})
   
   
})