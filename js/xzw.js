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

function adapt(){
var docwidth= document.documentElement.clientWidth;
document.documentElement.style["font-size"]= 20*docwidth/320 + "px";
document.getElementsByTagName("body")[0].style["font-size"]= 20*docwidth/320 + "px";

}	



var swiperwrapper = document.getElementsByClassName("swiper-wrapper")[0];
$.ajax({
	url: "http://datainfo.duapp.com/shopdata/getBanner.php",
	dataType:"jsonp",
	success:function(res){
		var str = "";
		var url = JSON.parse(res[0].goodsBenUrl);
		for(var i = 0 ; i < url.length;i++){
		str+= "<div class='swiper-slide'><img src='"+url[i]+"'/></div>";   
		}
		swiperwrapper.innerHTML = str;
		//驱动插件
		   mySwiper = new Swiper ('.swiper-container', {
		   autoplay:2000,
		   // 如果需要分页器
		   pagination: '.swiper-pagination',
		
		  })

	}
})
var num =0; var len = 0;
ajax(num);
var $ajaxgood = $("#ajaxgood");


var content = document.getElementById("box");
var myScroll = new IScroll(content);



function ajax(num){
$.ajax({
	pageCode:10,
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	success:function(res){
		len = res.length;
		var str = "";
	
		 for(var i =0; i<num+5 ;i++){
		 	str += "<div class='son-content'  id='" + i +"'>"
			+"<img src='" +res[i].goodsListImg +"' class='goodsListImg'/>"
			+"<div class='son-right'>"
			+	"<div class='bot'><i class='iconfont'>&#xe698;</i></div>"
			+	"<h1  class='goodsName'>"+res[i].goodsName+"</h1>"
			+  "<div class='goodprice'>"
			+  "<p class='price'>￥"+res[i].price*res[i].discount/10+ "<span class='oldprice'>"+res[i].price+ "</span></p>"
			+  "<span class='discount'>"+res[i].discount+"折</span>"
			+	"</div></div></div>	"
		 }
		 $ajaxgood.html(str) ;
		  myScroll.refresh();
		  
		  bot();
	}
});
 }   

 function bot(){
 	$(".bot").click(function(){
 	var num1 = $(this).parents(".son-content")[0].id;
 	var str ="";
	$.ajax({	
	url:"http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	success:function(res){
		localStorage.goodsMsgs= JSON.stringify({
			goodsID : res[num1].goodsID,
			goodsListImg:res[num1].goodsListImg,
			goodsName:res[num1].goodsName,
			imgsUrl:res[num1].imgsUrl,
			price:res[num1].price,
		})
		location.href="details.html";
	}
	})
})
}
 




       
document.addEventListener("touchend",function(){     
	if(myScroll.y>50){
		console.log("上拉刷新")
	}if(myScroll.maxScrollY > myScroll.y){
		num = num+5;
		if(num>=len){
			return false;
		}
		console.log(num);	
		ajax (num);

	}
}) 
	$("bottom ul li ").click(function(){
	$("bottom ul li p").each(function(){
	$(this).css("background","#484850")
	})
	$(this).children("p").css("background","#e43669")
	})
	
	})
	//
	$("#search i").click(function(){
		var data1 = $("#search-txt").val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/selectGoodes.php",
			dataType:"jsonp",
			data:{
				 selectText:encodeURI(data1)
			},
			success:function(res){
			 localStorage.goodsArr= JSON.stringify(res);
		     location.href="details.html";
			}
		       
			});
	})
	
	$("#classify").click(function(){
		location.href="html/list.html";
	})

})