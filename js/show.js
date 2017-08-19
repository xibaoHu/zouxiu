
$("#btns1").click(function(){
	location.href = "denglu.html"
})

$("#btns2").click(function(){
	location.href = "zhuce.html"
})
console.log($("#shoppingC"))
$("#shoppingC").click(function(){
	location.href = "shoppingCart.html"
})


if(localStorage.userMsg && localStorage.userMsg != null){
	var userMsg =JSON.parse(localStorage.userMsg);
	$(".two").html(userMsg.userName);
	$('#btns1').html('切换账号');
	$('#btns1').click(function(){
		location.href('denglu.html');
	})
}


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

