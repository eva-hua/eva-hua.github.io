window.onload = function(){
	var exp = document.getElementById('exp');		//获取整个轮播容器
	var list = document.getElementById('exp-list'); 	//获取轮播div列表
	var buttons = document.getElementById('buttons').getElementsByTagName('span');	//获取所有小圆点
	var prev = document.getElementById('prev');					//获取左箭头
	var next = document.getElementById('next');					//获取右箭头
	var index = 0;
	var animated = false;								//声明变量保存是否有动画在执行
	var timer;

	prev.onclick = function(){
		if (animated) {
            return;
        }
		if (index == 0) {
			index = 2
		}else{
			index -= 1;
		}
		move(900);
		divFocus();
		return false;
	}
	next.onclick = function(){
		if (animated) {
            return;
        }
		if (index == 2) {
			index = 0
		}else{
			index += 1;
		}
		move(-900);
		divFocus();
		return false;
	}

	function move(offset){
		var left = parseInt(list.style.left) + offset;	//声明变量保存新的左边距
		animated = true;
		var time = 300;						//位移总时间(毫秒)
        var inteval = 10;						//位移间隔时间(毫秒)
        var speed = offset/(time/inteval);				//每一次的位移量
        
        var go = function (){
            if((speed>0 && parseInt(list.style.left)<left) || (speed<0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px'; 
				if (left < -2700) {
					list.style.left = -900 + 'px'; 
				}
				if (left > -900) {
					list.style.left = -2700 + 'px'; 
				}
                animated = false;
            }
        }
        go();
    }


	//设置小圆点的当前页选中样式
	function divFocus(){
		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].className == 'on') {
				buttons[i].className = '';
				break;
			}
		}
		buttons[index].className = 'on';
	}

	//点击小圆点切换图片
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].onclick = function(){
			var myindex = parseInt(this.getAttribute('index'));
			var offset = -900 * (myindex - index)
			move(offset);
			index = myindex;
			divFocus();
		}
	}

	 //自动播放
    function play(){
    	timer = setInterval(function(){
    		next.onclick();
    	},5000);
    }
    //停止播放
    function stop(){
    	clearInterval(timer);
    }
    // exp.onmouseover = stop;
    // exp.onmouseout = play;
    // play();
}

$(function(){
	$('img').lazyload({
		effect:"fadeIn"
	});
	$('.bg-pic').animate({
		top:'-22px',opacity:1
	},1200,function(){
		$('#index strong').animate({
			top:'163px',opacity:1
		},1200,function(){
			$('#index p:eq(0)').animate({
				top:'218px',opacity:1
			},800,function(){
				$('#index p:eq(1)').animate({
					top:'248px',opacity:1
				},800,function(){
					$('#index p:eq(2)').animate({
						top:'278px',opacity:1
					},800,function(){
						$('#index p:eq(3)').animate({
							top:'308px',opacity:1
						},800,function(){
							$('#index p:eq(4)').animate({
								top:'338px',opacity:1
							},800);
						});
					});
				});
			});
		});
	});	

	$(document).scroll(function(){
		if (($(document).scrollTop()+200) >= $(document).height() - $(window).height()) {
			$('.end p').animate({
				opacity: 1
			},3000);
		};
	});
});
