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
document.documentElement.style["font-size"]= docwidth/6.4 + "px";
document.getElementsByTagName("body")[0].style["font-size"]= docwidth/6.4 + "px";

}		
	})



//获取商品列表


var cont = document.getElementsByClassName("content")[0];
$.ajax({
	url:"http://datainfo.duapp.com/shopdata/getclass.php",
	success:function(res){
		var str = "";
		 res = JSON.parse(res);
		 str+="<div class='goods all-goods'>全部<span></span></div>" 
		 for(var i = 0; i <res.length;i++){ 	
		 	str +=`<div class="goodbox"><div class="goods list-son" id=${i}>${res[i].className}<span></span></div ><div class="sonw"></div></div>`;
            getGood(res[i].classID,i)
		 }
		 cont.innerHTML=str;	
		 myScroll.refresh();
		 bot();
	}
});

function getGood(class1,i){
$.ajax({
	url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	data:{
		classID:class1,
	},
	success:function(res){
		 var str1 = "";
		  for(var j =0 ;j<res.length;j++){	

str1 += `<div class=" list-grandson son${res[j].classID}" id=${res[j].goodsID}>`
			+"<img src='" +res[j].goodsListImg +"' class='goodsListImg'/>"
			+"<div class='son-right'>"
			+	"<div class='bot'><i class='iconfont'>&#xe698;</i></div>"
			+	"<h1  class='goodsName'>"+res[j].goodsName+"</h1>"
			+  "<div class='goodprice'>"
			+  "<p class='price'>￥"+ res[j].price*res[j].discount/10+  "<span class='oldprice'>"+res[j].price + "</span></p>"
			+  "<span class='discount'>"+res[j].discount+"折</span>"
			+	"</div></div></div>	"
$(".goodbox .sonw").eq(i).html(str1);
		    }
	}
})


}








//点击
function bot(){
//一级菜单
	var pot = 1;
	var pot1 =1;
	
$(".all-goods").click(function(){
	if(pot==1){
		$(".list-son").css("display","block");
		$(this).children("span").css("background", "url(../img/pot.jpg) -0.1rem no-repeat")
	   
	    pot=0;
	}else{
		$(".list-son").css("display","none");
		$(this).children("span").css("background", "url(../img/pot2.jpg) -0.1rem no-repeat")
		$(".list-grandson").css("display","none");
	
	    pot=1;
	}
	})

//二级菜单
$(".list-son").click(function(){
	var num = parseInt($(this)[0].id)+1;
	var class1 = ".son"+num;
	if(pot1==1){
       $(class1).css("display","block");
       $(this).children("span").css("background", "url(../img/pot.jpg) -0.1rem no-repeat");
     
        pot1=0;
	}else{
        $(class1).css("display","none");
        $(this).children("span").css("background", "url(../img/pot2.jpg) -0.1rem no-repeat")
	
	    pot1=1;
	}
	myScroll.refresh();
})
}
//跳转


$(document).on('click', ".list-grandson img", function() {
 	var num1 = $(this).parent(".list-grandson")[0].id;
 	$.ajax({
	url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	data:{
		goodsID:num1,
	},
	success:function(res){		
		localStorage.getClassId = res[0].goodsID;
			location.href="../html/detail.html";
	}
	})
      })


//购物车
$(document).on('click', ".bot", function() {
 	var num1 = $(this).parents(".list-grandson")[0].id;
 	var goodsID;
 	$.ajax({
	url:" http://datainfo.duapp.com/shopdata/getGoods.php",
	dataType:"jsonp",
	data:{
		goodsID:num1,
	},
	success:function(res){	
		//console.log(res[0].goodsID);
		var strShoppingClickClassID = res[0].goodsID;
		var strSCn = new Object();
		
		if(localStorage.SCn){
			var states = JSON.parse(localStorage.getItem('SCn'));;
			if(states[strShoppingClickClassID] == 'null'){
				strSCn[strShoppingClickClassID] = 1;
				states[strShoppingClickClassID] = strSCn;
			}else if(!states[strShoppingClickClassID]){
				strSCn[strShoppingClickClassID] = 1;
				states[strShoppingClickClassID] = strSCn;
			}else{
				states[strShoppingClickClassID][strShoppingClickClassID] = ++states[strShoppingClickClassID][strShoppingClickClassID]; 
			}
			localStorage.setItem('SCn',JSON.stringify(states))
		}else{
			strSCn[strShoppingClickClassID] = 1;
			strNArr[strShoppingClickClassID] = strSCn;
			
			localStorage.SCn = JSON.stringify(strNArr);
		}
		console.log(JSON.parse(localStorage.getItem('SCn')))
	}
	})

})
	
	
//滚动
var content = document.getElementById("box");
var myScroll = new IScroll(content);
document.addEventListener("touchend",function(){     
	if(myScroll.y>50){
		console.log("上拉刷新")
	}if(myScroll.maxScrollY > myScroll.y){
		
       console.log("下拉加载")
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
	$("#maintr").click(function(){
		location.href="../index.html";
	})
	$("#point").click(function(){
		location.href="../index.html"
	})
	$("#show").click(function(){
		location.href="show.html"
	})
	$("#shopping").click(function(){
		location.href="shoppingCart.html"
	})
	$("#moreHtml").click(function(){
		location.href="more.html"
	})
})