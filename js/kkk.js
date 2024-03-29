var luck = {
	index: 0, //当前转动到哪个位置，起点位置
	count: 0, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 0, //转动次数
	cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1, //中奖位置
	init: function(id) {
		if ($("#" + id).find(".luck-unit").length > 0) {
			$luck = $("#" + id);
			$units = $luck.find(".luck-unit");
			this.obj = $luck;
			this.count = $units.length;
			$luck.find(".luck-unit-" + this.index).addClass("active");
		};
	},

	roll: function() {
		var index = this.index;
		var count = this.count;
		var luck = this.obj;
		$(luck).find(".luck-unit-" + index).removeClass("active");
		index += 1;
		if (index > count - 1) {
			index = 0;
		};
		$(luck).find(".luck-unit-" + index).addClass("active");
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};


function roll() {
	luck.times += 1;
	luck.roll();
	if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
		clearTimeout(luck.timer);
		luck.prize = -1;
		luck.times = 0;
		click = false;
		setTimeout(res => {
			$(".overlay").removeClass("none");
			$("#goods").html($('.active').html());
			// $("#name").html($('.active>p').html());
			// if($('.active>p').hasClass('gx')){
			// 	$('#img').css("visibility",'hidden')
			// }else{
			// 	$('#img').attr("src",$('.active>img').attr("src"))
			// }
		}, 500)
	} else {
		if (luck.times < luck.cycle) {
			luck.speed -= 10;
		} else if (luck.times == luck.cycle) {
			var index = Math.random() * (luck.count) | 0;
			var r = Math.floor(Math.random()*(100 - 1) + 1);
			if (r < 30) {
				index = 3;
			} else if (r < 60) {
				index = 7;
			} else if (r < 80) {
				index = 4;
			} else{
				index = 0;
			}
			luck.prize = index; //最终中奖位置
		} else {
			if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
				luck.speed += 110;
			} else {
				luck.speed += 20;
			}
		}
		if (luck.speed < 40) {
			luck.speed = 40;
		};

		luck.timer = setTimeout(roll, luck.speed);
	}
	return false;
}


var click = false;
var show = false;
function isShow() {
	show = show ? false : true;
	// console.log(111111)
	if (show) {
		$(".overlay").addClass("none");
	} else {
		$(".overlay").removeClass("none");
	}
}

window.onload = function() {
	luck.init('luck');
	var num = 3;
	$("#num").html(num)
	$("#btn").click(function() {
		if (click || num ==0) {			
			return false;
		} else {
			num--
			$("#num").html(num)
			luck.speed = 100;
			roll();
			click = true;
			return false;
		}
		
	});
};


