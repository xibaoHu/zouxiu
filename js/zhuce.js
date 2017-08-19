

//跳转登录页面
$('#login').click(function(){
	location.href = "denglu.html";
})

$(".btns").click(function(){
	var $btn = $("#in").val()
	var $btn2 = $("#ina").val()
	var $btn3 = $("#inb").val()
	$.ajax({
		url : "http://datainfo.duapp.com/shopdata/userinfo.php",
		data : {
			status:"register",
			userID:$btn,
			password:$btn2
		},
		success: function(res){
			if(res == 0){
				alert("用户重名")
			}else if(res == 1){
			   alert("注册成功")
				location.href = "denglu.html"
			}else if(res == 2){
				alert("数据库报错")
			}
		}
	})
})



//底部菜单选中
for(let j=0;j<$('.fUl li').length;j++){
	$('.fUl li').eq(j).click(function(){
		for(let m=0;m<$('.fUl li').length;m++){
			$('.fUl li')[m].className = '';
			$('.fUl li span').hide();
		}
		$('.fUl li')[j].className = 'fActive';
		$('.fUl .fActive span').show();
		
		//跳转页面
		switch (j){
			case 0:
				location.href = '../index.html';
				break;
			case 1:
				location.href = './list.html';
				break;
			case 2:
				location.href = 'shoppingCart.html';
				break;
			case 3:
				location.href = './show.html';
				break;
			case 4:
				location.href = './more.html';
				break;
			default:
  				console.log('错误...')
		}
	})
}
