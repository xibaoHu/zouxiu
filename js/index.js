

	var resB,resL;
	var Iflag = 0;
	
	
	
	
	//搜索后获得到的数据（JSON格式）
	var ssObj ;
	//搜索
	$('#showData').keyup(function(){
		var $val = $(this).val();
		var ssV = 'ssV';
		//ssv+所搜索的数据 是我们搜索返回值存储
		//console.log(localStorage[ssV+'-'+$val])
		if($val == ''){
			console.log('搜索内容为空')
		}else if( localStorage[ssV+'-'+$val] ){
			//console.log(JSON.parse(localStorage[ssV+'-'+$val]));
			ssObj = JSON.parse(localStorage[ssV+'-'+$val]);
			console.log('您搜索的数据本地已存储，正调用...');
			console.log(ssObj);
			
			if(ssObj == 0){		
			}else{
				ssI(ssObj);
			}
		}else{
			console.log('正远程调用数据中，请稍等...');
			$.ajax({
				url : 'http://datainfo.duapp.com/shopdata/selectGoodes.php',
				data:{
					selectText : encodeURI($val)
				},
				success : function(res){
					//res.slice(9,res.length-1);
					//res.slice(res.length-1);
					//console.log(res)
					//console.log(res.slice(9,res.length-1))
					
					localStorage[ssV+'-'+$val] = res.slice(9,res.length-1);
					ssObj =  JSON.parse(res.slice(9,res.length-1));
					console.log(ssObj);
					
					if(ssObj == 0){
					}else{
						ssI(ssObj);
					}
					
				}
			})
		}
		getId()
	})
	
	//搜索得到的数据显示在banner图下方
	function ssI(ssObj){
		$('.list').html('');
		var strSS = '';
		for(let i=0;i<ssObj.length;i++){
			var dis = ssObj[i].price * ssObj[i].discount / 10;
			strSS += `<li>
						<img src="${ssObj[i].goodsListImg}" class="listPic"/>
						<div id="liT"
							<p class="p1">${ssObj[i].goodsName}</p>
								<div id="liTP">
							<p>
								<span class="s1">￥${dis}</span>
								<span class="s2">￥${ssObj[i].price}</span>
							</p>
							<span class="s3">${ssObj[i].discount}折</span>
							<button>
								<i class="iconfont icon-cart"></i>
							</button>
						</div>
					</div>
				</li>`
		}
		$('.list').html(strSS);
		myScroll.refresh();
	}
	
	//轮播图
	
	if( localStorage.bans ){
		resB = JSON.parse(localStorage.bans);
		var bannerUrl = JSON.parse(resB[0].goodsBenUrl);
		Jban(bannerUrl);
	}else{
		$.ajax({
			url : 'http://datainfo.duapp.com/shopdata/getBanner.php',
			dataType : 'jsonp',
			success : function(resB){
				var bannerUrl = JSON.parse(resB[0].goodsBenUrl);
				//console.log(bannerUrl);
				
				//存储到本地
				localStorage.bans = JSON.stringify(resB);
				Jban(bannerUrl);
			}
		})
	}
	
	
	//列表图
	if( localStorage.lis ){
		resL = JSON.parse(localStorage.lis);
		var strL = '';
		Jlis(strL,resL);
	}else{
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/getGoods.php",
			dataType:'jsonp',
			success:function(resL){
				var strL = '';
				console.log(resL);
				
				//存储到本地
				localStorage.lis = JSON.stringify(resL);
				Jlis(strL,resL);
			}
		});
	}
	
	
	function Jban(bannerUrl){
		var str = '';
			
			for(var i=0;i<bannerUrl.length;i++){
				str += '<div class="swiper-slide"><img src="'+ bannerUrl[i] +'"/></div>'
			}
			$('.swiper-wrapper').html(str);
			
			mySwiper = new Swiper ('.swiper-container', {
			
				autoplay : 2000,
			   	loop: true,
			    speed : 1000,
			    grabCursor : true,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			   	autoplayDisableOnInteraction: false
//			   	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
//				    swiperAnimateCache(swiper); //隐藏动画元素 
//				    swiperAnimate(swiper); //初始化完成开始动画
//				  }, 
//				onSlideChangeEnd: function(swiper){ 
//				  swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
//				} 
			})
		
	}
	
	function Jlis(strL,resL){
		for(let i=0;i<5;i++){
			var dis = resL[i].price * resL[i].discount / 10;
			strL += `<li>
						<img src="${resL[i].goodsListImg}" class="listPic"/>
						<div id="liT">
							<p class="p1">${resL[i].goodsName}</p>
							<div id="liTP">
								<p>
									<span class="s1">￥${dis}</span>
									<span class="s2">￥${resL[i].price}</span>
								</p>
								<span class="s3">${resL[i].discount}折</span>
								<button>
									<i class="iconfont icon-cart"></i>
								</button>
							</div>
						</div>
					</li>`
		}
		$('.list').html(strL);
		myScroll.refresh();
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
					location.href = 'index.html';
					break;
				case 1:
					location.href = './html/list.html';
					break;
				case 2:
					location.href = './html/shoppingCart.html';
					break;
				case 3:
					location.href = './html/show.html';
					break;
				case 4:
					location.href = './html/more.html';
					break;
				default:
	  				console.log('错误...')
			}
		})
	}
	
	
	
	$(document)[0].addEventListener('touchend',function(){
		//console.log(myScroll.y)
		
		//$('#content').
		if(myScroll.y > 50){
			console.log('下拉刷新...');
			
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/getGoods.php",
				dataType:'jsonp',
				success:function(resL){
					var strL = '';
					console.log(resL);
					
					//本地数据更新
					localStorage.lis = JSON.stringify(resL);
					Jlis(strL,resL);
				}
			})
		}else if(myScroll.y <= myScroll.maxScrollY){
			//console.log(myScroll.maxScrollY)
			console.log('上拉加载...')
			if(Iflag == 0){
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/getGoods.php",
					dataType:'jsonp',
					success:function(resL){
						var strL = $('.list').html();
						console.log(resL);
						
						for(let i=5;i<10;i++){
							var dis = resL[i].price * resL[i].discount / 10;
							strL += `<li>
										<img src="${resL[i].goodsListImg}" class="listPic"/>
										<div id="liT"
											<p class="p1">${resL[i].goodsName}</p>
												<div id="liTP">
											<p>
												<span class="s1">￥${dis}</span>
												<span class="s2">￥${resL[i].price}</span>
											</p>
											<span class="s3">${resL[i].discount}折</span>
											<button>
												<i class="iconfont icon-cart"></i>
											</button>
										</div>
									</div>
								</li>`
						}
						$('.list').html(strL);
						myScroll.refresh();
						
					}
				})
				//不重复加载前十张图
				Iflag = 1;
			}
			getId();
		}
	})
	
	$(function(){
		
		//跳转详情页
		getId();
		
		//加入购物车
		addShoppingC();
	})
	

		function getId(){
			var strClickClassID;
			//localStorage.removeItem('getClassId');
			for(let n=0;n<$('.list li').length;n++){
				$('li img').eq(n).click(function(){
					
					strClickClassID = JSON.parse(localStorage.getItem('lis'))[n]['goodsID'];
					console.log(strClickClassID);
					location.href = "html/detail.html";
					
					if(localStorage.getClassId){
						localStorage.setItem('getClassId',strClickClassID)
					}else{
						localStorage.getClassId = strClickClassID;
					}
					
				})
				$('li .p1').eq(n).click(function(){
					
					strClickClassID = JSON.parse(localStorage.getItem('lis'))[n]['goodsID'];
					console.log(strClickClassID);
					location.href = "html/detail.html";

					
					if(localStorage.getClassId){
						localStorage.setItem('getClassId',strClickClassID)
					}else{
						localStorage.getClassId = strClickClassID;
					}
				})
			}
		}
		
		function addShoppingC(){
			
			var strNArr = [];
			var shuliang = 1;
			//localStorage.removeItem('SCn');
			for(let n=0;n<$('.list li').length;n++){
				$('li #liTP button').eq(n).click(function(){
					
					//判断用户是否为登录状态
					var flagUser;
					var userMsg = localStorage.getItem('userMsg')
					console.log(!userMsg || userMsg == null || userMsg == '')
					if(!userMsg || userMsg == null || userMsg == ''){
						
						strLogin = `<a href='html/denglu.html' style="font-size:0.5rem; text-decoration:underline; ">请登录账号<a/>`
						$('#content').html(strLogin);
						$('#content').css({'text-align':'center','line-height' : '10rem'})
						//未登录状态;
						flagUser = 0; 
					}else{
						//登录状态
						flagUser = 1;
					}
					
					if(flagUser == 1){
						var strSCn = new Object();
						var strShoppingClickClassID = '';
						//购物车classId
						strShoppingClickClassID = JSON.parse(localStorage.getItem('lis'))[n]['goodsID'];
						console.log(strShoppingClickClassID);
						
						if(localStorage.SCn){
							var states = JSON.parse(localStorage.getItem('SCn'));
							console.log(states);
							console.log(states[strShoppingClickClassID]);
							if(states[strShoppingClickClassID] == 'null'){
								strSCn[strShoppingClickClassID] = 1;
								states[strShoppingClickClassID] = strSCn;
							}else if(!states[strShoppingClickClassID]){
								strSCn[strShoppingClickClassID] = 1;
								states[strShoppingClickClassID] = strSCn;
							}else{
								states[strShoppingClickClassID][strShoppingClickClassID] = ++states[strShoppingClickClassID][strShoppingClickClassID]; 
							}
							console.log(states);
							localStorage.setItem('SCn',JSON.stringify(states))
						}else{
							strSCn[strShoppingClickClassID] = 1;
							strNArr[strShoppingClickClassID] = strSCn;
							
							localStorage.SCn = JSON.stringify(strNArr);
						}
					}	
				})
			}
		}
