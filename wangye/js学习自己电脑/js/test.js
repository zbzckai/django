var arr = new Array()
arr[0] = 1
arr[1] = 2
arr[2] = 3
arr[3] = 4
arr.forEach(function(item){
	console.log(item)
})
//加到最后一项
arr.push(6)
console.log(arr)
//加到第一项
arr.unshift(7)
console.log(arr)
//拿数据默认最后一个
arr.pop(3)

//取数据默认第一个
arr.shift(2)
console.log(arr.reverse())
console.log(arr.slice(1,3))
