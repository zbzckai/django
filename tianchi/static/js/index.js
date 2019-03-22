
//折线图
var line = echarts.init(document.getElementById('pacture1'));
line.setOption({
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:MyViewVar.subject_all
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
        data: MyViewVar.exam_name

    },
    yAxis: {
        type: 'value'
    },
    series: MyViewVar.table_1_series
});

//折线图
var line = echarts.init(document.getElementById('pacture2'));
line.setOption({
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:MyViewVar.subject_all
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
        data: MyViewVar.exam_name

    },
    yAxis: {
        type: 'value'
    },
    series: MyViewVar.table_1_series_rank
});


//折线图
var line = echarts.init(document.getElementById('pacture3'));
line.setOption({
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:MyViewVar.kind_all
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
        data: MyViewVar.days_7

    },
    yAxis: {
        type: 'value'
    },
    series: MyViewVar.consumption_1_series
});



//折线图
var line = echarts.init(document.getElementById('pacture4'));
line.setOption({
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:MyViewVar.subject_all
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
        data: MyViewVar.exam_name

    },
    yAxis: {
        type: 'value'
    },
    series: MyViewVar.json_data
});

