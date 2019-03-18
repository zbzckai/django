console.log(MyViewVar.var_1);
// console.log(MyViewVar.ceshi);
console.log(MyViewVar.ceshi.series[0].site);
//折线图
var line = echarts.init(document.getElementById('table1'));
line.setOption({
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:MyViewVar.ceshi.legend
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: MyViewVar.ceshi.xAxis
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:MyViewVar.ceshi.legend[0],
            type:'line',
            stack: '总量',
            data:MyViewVar.ceshi.series[0].site
        },
        {
            name:MyViewVar.ceshi.legend[1],
            type:'line',
            stack: '总量',
            data:MyViewVar.ceshi.series[0].author
        }
    ]
}) ;
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
