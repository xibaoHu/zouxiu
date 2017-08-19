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
var goodsMsgs = localStorage.getClassId;



var swiperwrapper = document.getElementsByClassName("swiper-wrapper")[0];
$.ajax({
		url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	    data:{
	  	 goodsID:goodsMsgs,
	    },
	  dataType:"jsonp",
	  success:function(res){
		var str = "";
		var url = JSON.parse(res[0].imgsUrl);
		for(var i = 0 ; i < url.length;i++){
		str+= "<div class='swiper-slide'><img src='"+url[i]+"'/></div>";   
		}
		swiperwrapper.innerHTML = str;
		//驱动插件
		  var  mySwiper = new Swiper ('.swiper-container', {
		 //  loop: true,
		   autoplay:3000,
		   // 如果需要分页器
		   pagination: '.swiper-pagination',
		   paginationClickable :true,

		  })
		  for(var i = 0 ; i<mySwiper.bullets.length;i++){
		  mySwiper.bullets[i].style.background='#e4366b';
          mySwiper.bullets[i].style.height='0.26rem';
          mySwiper.bullets[i].style.width='0.26rem';
        }
	}

})








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