
//判断用户是否为登录状态
var flagUser;
var userMsg = localStorage.getItem('userMsg')
//console.log(!userMsg || userMsg == null || userMsg == '')
if(!userMsg || userMsg == null || userMsg == ''){
	
	strLogin = `<a href='denglu.html' style="font-size:0.5rem; text-decoration:underline; ">请登录账号<a/>`
	$('#content').html(strLogin);
	$('#content').css({'text-align':'center','line-height' : '10rem'})
	//未登录状态;
	flagUser = 0; 
}else{
	//登录状态
	flagUser = 1;
}

if(flagUser == 1){
//判断用户购物车是否为空
var flagU;
var numZ = 0;
var pZ = 0;
var lis = '';
//console.log(localStorage.getItem('SCn') == null);
if(localStorage.getItem('SCn') == null){
	flagU = 0;
}else{
	flagU =1;
}

var strU = '';

//数据
//var str1 = Getitem(localStorage['ssV-a'])
//console.log(str1);

if(flagU == 0){
	strU = '';
	strU += `<ul class="list0" style="height: 3.1rem;margin-top: 1.1rem;">
					<a href="javascript:;">您的购物车空空~</a>
					<img  src="../img/wifi.jpg"/>
				<div class="btn">
					<button id="tBtn">去逛逛</button>
				</div>`;
	$('#content').html(strU);
	$('#tBtn').click(function(){
		location.href = '../index.html';
	})
}else if(flagU == 1){
	console.log('获取用户的购物信息');
	
	//结算按钮
	$('#account').click(function(){
		alert('土豪，我们做朋友吧~');
	})
	
	
	strU = `<div class="xq">
				&nbsp;&nbsp;&nbsp;商品数量：<span id="sl">1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应付金额（不含运费）：<span id="price">￥100</span>
			</div>
			<ul class="list1">
			<ul/>`;
	$('#content').html(strU);
	var strUli = ``;
	
	var strL = JSON.parse(localStorage.getItem('SCn'));
	var strNum = [];
	for (var i=0;i<strL.length;i++) {
		
		if(strL[i] == null || strL[i] == ''){
			
		}else{
			
			strNum.push(strL[i]);
			
//			for(let o in strL[i]){
//				console.log(strL[i])
//				var strLL = strL[i];
//			}
//				$.ajax({
//					type:"get",
//					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
//					dataType:'jsonp',
//					data:{
//						goodsID:o
//					},
//					success:function(res){
//						console.log(res[0]);
//						
//						
//						var arrNumber = [];
//					
//						console.log(strLL)
//						//arrObj.push(ajaxGoodsId(o));
//						//arrNumber.push(strL[i][o]);
//						
//						var strDangeShuju = res[0];
//						
//						var danshuliang = strL[i][o];
//						
//						//console.log(strDangeShuju)
//						addLi(strDangeShuju,strUli,danshuliang);
//						lis += $('.list1').html()
//						$('.list1').html(lis)
//					}
//				
//				});
				//console.log(strLL)
		}			
			
		}
	
	//长度
	//console.log(JSON.stringify(strNum[0]).replace('{\"','').split(":")[0].replace('\"',''));
	var strNumL = strNum.length;
	for (let n = 0; n < strNumL;n++) {
		//var sl = strNum[n].
		$.ajax({
			type:"get",
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			dataType:'jsonp',
			data:{
				goodsID:JSON.stringify(strNum[n]).replace('{\"','').split(":")[0].replace('\"','')
			},
			success:function(res){
				//console.log(res[0]);
				
				var strU = $('.list1').html();
				var strLL = res[0];
				
				//本地缓存此产品goodsId
				if(localStorage['product-'+strLL[n]]){
				}else{
					localStorage['product-'+n] = strLL.goodsID;
				}
				
				//单价
				var strD = strLL['6'] * strLL['7'] / 10;
				//单个商品总价
				var strP = strD * $('#number').val();
				
				strU += `<li>
							<img src="${strLL['3']}" class="listPic"/>
							<div id="liT">
								<p class="p1">${strLL['2']}</p>
								<div id="liTP">
									<p class="pp1">
										单价：<span class="s1">￥${strD}</span>
									</p>
									<p class="pp2">数量
										<button>-</button>
										<input type="number" name="number" id="number" value="${strNum[n][JSON.stringify(strNum[n]).replace('{\"','').split(":")[0].replace('\"','')]}"/> <!--disabled='disabled';-->
										<button>+</button>
									</p>
								</div>
							</div>
							<div class="dele">
								<button id="delete" style="outline: none;border: none;background-color: white;">
									<img src="../img/delete.png"/>
								</button>
								<span>L</span>
							</div>
						</li>`;
				
				$('.list1').html(strU);
			}
		})
	}
	
	//numZ()
	$(function(){
		
		setTimeout(function(){
			var slSum = document.getElementById('sl');
			var priceSum = document.getElementById('price');
			var lis = document.getElementById('content').getElementsByClassName('list1')[0].getElementsByTagName('li');
			//console.log(lis)
		
			//console.log(suansuan())
			priceSum.innerHTML = '￥' + suansuan()[0];
			slSum.innerHTML = suansuan()[1];
			
			//jianlocal()
		
			for (let p=0;p<lis.length;p++) {
				//var nVal = $('.list #number').eq(p).val();
				//console.log(lis[p].getElementsByClassName('pp2')[0].getElementsByTagName('button')[0])
				//减按钮
				lis[p].getElementsByClassName('pp2')[0].getElementsByTagName('button')[0].onclick = function(){
					var nVal = this.nextSibling.nextSibling.value;
					var productGoodsId = localStorage.getItem('product-'+p);
					console.log(productGoodsId)
					if(nVal > 1){
						this.nextSibling.nextSibling.value = --nVal;
					}
					
					priceSum.innerHTML = '￥' + suansuan()[0];
					slSum.innerHTML = suansuan()[1];
					
					jianlocal(productGoodsId);
					
				}
			}
			for (let p=0;p<lis.length;p++) {
				//加按钮
				lis[p].getElementsByClassName('pp2')[0].getElementsByTagName('button')[1].onclick = function(){
					var nVal = this.parentNode.childNodes[3].value;
					var productGoodsIdjia = localStorage.getItem('product-'+p);
					console.log(localStorage.getItem('product-'+p))
					this.parentNode.childNodes[3].value = ++nVal;
					
					priceSum.innerHTML = '￥' + suansuan()[0];
					slSum.innerHTML = suansuan()[1];
					
					jialocal(productGoodsIdjia)
				}
			}
			for (let p=0;p<lis.length;p++) {
				//删除按钮
				lis[p].getElementsByClassName('dele')[0].getElementsByTagName('button')[0].onclick = function(){
					var productGoodsIddelete = localStorage.getItem('product-'+p);
					if(confirm('是否从购物车中移除此商品？') == true){
						console.log('移除成功');
						removelocal(productGoodsIddelete);
					}
					
					priceSum.innerHTML = '￥' + suansuan()[0];
					slSum.innerHTML = suansuan()[1];
				}
			}
			
			
			function jianlocal(productGoodsId){
				var strL = JSON.parse(localStorage.getItem('SCn'));
				//console.log(strL)
				for (var i=0;i<strL.length;i++) {
					if(strL[i] == null){
						
					}else{
						//console.log(strL[i])
						for(var o in strL[i]){
							if(o == productGoodsId){
								var slVal = strL[i][o]
								if(slVal > 1){
									strL[i][o] =  --slVal;
								}
							}
						}
					}
				}
				localStorage.setItem('SCn',JSON.stringify(strL))
			}
			function jialocal(productGoodsId){
				var strL = JSON.parse(localStorage.getItem('SCn'));
				//console.log(strL)
				for (var i=0;i<strL.length;i++) {
					if(strL[i] == null){
						
					}else{
						console.log(strL[i])
						for(var o in strL[i]){
							if(o == productGoodsId){
								console.log('可以')
								var slVal = strL[i][o]
								strL[i][o] =  ++slVal;
							}
						}
					}
				}
				localStorage.setItem('SCn',JSON.stringify(strL))
			}
			function removelocal(productGoodsId){
				var strL = JSON.parse(localStorage.getItem('SCn'));
				//console.log(strL)
				for (var i=0;i<strL.length;i++) {
					if(strL[i] == null){
						
					}else{
						console.log(strL[i])
						for(var o in strL[i]){
							if(o == productGoodsId){
								console.log('可以')
//								var slVal = strL[i][o]
								strL[i] =  '';
							}
						}
					}
				}
				localStorage.setItem('SCn',JSON.stringify(strL))
			}
			
			function suansuan(){
				var chu = [0,0];
				//console.log($('.list1 li'))
				for (var a=0;a<lis.length;a++) {
					var danN = parseFloat(lis[a].getElementsByClassName('pp2')[0].getElementsByTagName('input')[0].value);
					var danZ = danN * lis[a].getElementsByClassName('pp1')[0].getElementsByClassName('s1')[0].innerHTML.slice(1);
					//console.log('11')
					chu[0] += danZ;
					chu[1] += danN;
				}
				return chu;
			}
			
		},500);
		
		function xiugaiL(){
			var strL = JSON.parse(localStorage.getItem('SCn'));
			//console.log(strL)
			for (var i=0;i<strL.length;i++) {
				if(strL[i] == null){
					
				}else{
					for(var o in strL[i]){
						//console.log(o)
					}
				}
			}
		}
	})
	
	
	
	
		
	
	

}

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
				location.href = './shoppingCart.html';
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

