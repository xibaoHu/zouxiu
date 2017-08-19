
var flagU ;

//判断用户是否为登录状态
var userMsg = localStorage.getItem('userMsg')
console.log(!userMsg || userMsg == null || userMsg == '')
if(!userMsg || userMsg == null || userMsg == ''){
	
	//strLogin = `<a href='show.html' style="font-size:0.5rem">请登录账号<a/>`
	$('#tBtn').html('登录');
	flagU = 1;
}else{
	//登录状态
	flagU = 0;
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

$('#tBtn').click(function(){
	if(flagU == 0){
		
		if( confirm('确定要退出此账号吗？') ){
			$(this).html('登录');
			localStorage.setItem('userMsg','');
			flagU = 1;
		}
		
	}else if(flagU == 1){
		
		$(this).html('退出登录')
		flagU = 0;
		
		//跳转登录页面
		location.href = 'denglu.html';
		//console.log(location.href)
		
	}
	
})
