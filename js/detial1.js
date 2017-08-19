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
var goodsMsg = localStorage.getClassId;
console.log(goodsMsg)

var swiperwrapper = document.getElementsByClassName("swiper-wrapper")[0];
$.ajax({
	url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	data:{
	  	goodsID:goodsMsg,
	},
	dataType:"jsonp",
	success:function(res){
		console.log(res);
	    var str = "";
	     var str1="";
	     var str2 = "";
		var url = JSON.parse(res[0].goodsBenUrl);
		str+= `<img src="${url[0]}"/>`; 
		str1+=`<p>${res[0].detail}</p>`
		for(var i = 1 ; i < url.length;i++){
		 str2+= `<img src="${url[i]}"/>`;
		}
		$(".son-header").html(str);
        $(".son-detail").html(str1);
        $(".son-detail2").html(str2);
	}
});
















function adapt(){
var docwidth= document.documentElement.clientWidth;
document.documentElement.style["font-size"]= docwidth/6.4 + "px";
document.getElementsByTagName("body")[0].style["font-size"]= docwidth/6.4 + "px";

}		
})









//底部样式
	$("bottom ul li ").click(function(){
	$("bottom ul li p").each(function(){
	$(this).css("background","#484850")
	})
	$(this).children("p").css("background","#e43669")
	})
	
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