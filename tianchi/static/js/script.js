var personArr = [
    { name: '王港', src: 'img/3.png', des: '颈椎不好', sex: 'm' },
	{ name: '张三', src: 'img/4.png', des: '描述信息2', sex: 'm' },
	{ name: '李四', src: 'img/5.png', des: '描述信息3', sex: 'm' },
	{ name: '王麻子', src: 'img/1.png', des: '描述信息4', sex: 'm' },
	{ name: '阿海', src: 'img/2.png', des: '描述信息5', sex: 'm' },
    { name: '刘莹', src: 'img/5.png', des: '我是谁', sex: 'f' },
    { name: '王秀莹', src: 'img/4.png', des: '我很好看', sex: 'f' },
    { name: '刘金雷', src: 'img/1.png', des: '你没有见过陌生的脸', sex: 'm' },
    { name: '刘飞翔', src: 'img/2.png', des: '瓜皮刘', sex: 'm' }
];
//渲染函数
// function renderList(arr) {
//     var str = "";
//     arr.forEach(function (ele, index) {
//         str += '<li>\
//                    <img src = '+ ele.src + ' alt = "" >\
//                    <p class="username">'+ ele.name + '</p>\
//                    <p class="des">'+ ele.des + '</p>\
//                </li > '
//     })
//     $("ul").html(str)
// }
renderList(personArr)
//根据名字渲染
var searchVal = "";
var sexVal = "a";
$(".search-box").on("input", function () {
    searchVal = $(this).val();
    all()
})
//根据性别渲染
$("span").on("click", function () {
    $("span").removeClass("active");
    $(this).addClass("active");
    sexVal = $(this).attr("sex");
    all()
})
//根据名字筛选数组
function nameFilter(name, arr) {
    return arr.filter(function (ele, index) {
        return ele.name.indexOf(name) != -1 ? true : false
    })
}
//根据性别筛选数组
function sexFilter(sex, arr) {
    if (sex == "a") {
        return arr;
    }
    return arr.filter(function (ele, index) {
        return ele.sex == sex;
    })
}
//合并筛选
function all() {
    var lastArr = nameFilter(searchVal, personArr);
    lastArr = sexFilter(sexVal, lastArr)
    renderList(lastArr)
}