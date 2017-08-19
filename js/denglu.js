
//跳转注册页面
$('#regiseter').click(function(){
	location.href = 'zhuce.html'
})

$(".bottom").click(function(){
	var $a = $(".a input").val()
	var $b = $(".b input").val()
	if($a==""){
		alert("请输入用户名");
	}
	else if($b==""){
		alert("请输入密码");
	}else{
		
		$.ajax({
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: {
				status:"login",
				userID:$a,
				password:$b
			},
			success: function(res){
				if(res == 0){
					alert("用户名不存在")
				}else if(res == 2){
					alert("用户名密码不符")
				}
				else{
					localStorage.userMsg =JSON.stringify({
					 userName:$a,
					 userPwd:$b
					})
					location.href = "show.html";
				}
			}
		})
		
	}
})

//保存账号密码
var userMessage = localStorage.saveUser;
if(userMessage != "" && userMessage){
userMessage = JSON.parse(userMessage);
console.log(userMessage);
$(".a input").val(userMessage.userName);
$(".b input").val(userMessage.userPwd) ;
}
var rember = $(".rember-but").attr("checked");
$(".rember-but").click(function(){	
	if(rember == "checked"){
		localStorage.saveUser = JSON.stringify({
						 userName:$(".a input").val(),
						 userPwd:$(".b input").val()
			})
	}else {
		localStorage.saveUser = "";
	}
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




//userMsg存储用户信息