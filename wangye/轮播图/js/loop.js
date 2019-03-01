var jsBox = document.getElementById("box")
var jsPic = document.getElementById("pic")
var jsLeft = document.getElementById("left")
var jsRight = document.getElementById("right")
var jsListArr = document.getElementsByClassName("li")
jsListArr[0].style.backgroundColor = "red"


// 图片的轮播
curr_num = 1
var time = setInterval(startloop,1000)
function startloop(){
	curr_num++
	change_pic()
}
function change_pic(){
	if(curr_num == 5 ){
		curr_num =1
	}
	if(curr_num <1){
		curr_num =4
	}
	jsPic.src = "img/" + curr_num +".jpg"
}
// 鼠标进入box
jsBox.addEventListener("mouseover",overfunc,false)
function overfunc(e){
	var ev = e || window.event
	ev.stopPropagation()
	clearInterval(time)
	jsLeft.style.display = "block"
	jsRight.style.display = "block"
}
// 鼠标出去
jsBox.addEventListener("mouseout",outfunc,false)
function outfunc(){
	time = setInterval(startloop,1000)
	jsLeft.style.display = "none"
	jsRight.style.display = "none"
}

// 左右点击鼠标

jsRight.addEventListener("mouseover",deep,false)
jsRight.addEventListener("mouseout",qian,false)
function deep(){
	this.style.backgroundColor = "rgba(0,0,0,0.8)"
}
function qian(){
	this.style.backgroundColor = "rgba(0,0,0,0.2)"
}
jsRight.addEventListener("click",deep,false)
function deep(){
	this.style.backgroundColor = "rgba(0,0,0,0.8)"
}

jsRight.addEventListener("click",change_jia,false)
function change_jia(){
	curr_num++
	change_pic()
}

// 点击数字换页面
for (var i = 0;i < jsListArr.length;i++){
	jsListArr[i].index = i + 1 
	jsListArr[i].addEventListener("mousemove",function(){
		this.style.backgroundColor = "red"
		curr_num = parseInt(this.index)
		change_pic()
	},false)
	jsListArr[i].addEventListener("mouseout",function(){
		this.style.backgroundColor = "#aaa"
	},false)
}












