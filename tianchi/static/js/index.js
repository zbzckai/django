console.log('sssssssssssssssssssssssss');

//折线图
var line = echarts.init(document.getElementById('pacture1'));
line.setOption({
    color:["#32d2c9"],
    title: {
        x: 'left',
        text: '成绩统计',
        textStyle: {
            fontSize: '18',
            color: '#4c4c4c',
            fontWeight: 'bolder'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: MyViewVar.var_1,
        axisLabel: {
            interval:0
        }
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'成绩',
            type:'line',
            data: MyViewVar.var_2,
            markLine: {data: [{type: 'average', name: '平均值'}]}
        }
    ]
}) ;

