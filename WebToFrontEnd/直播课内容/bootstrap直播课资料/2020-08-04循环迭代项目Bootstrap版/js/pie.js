(function () {
	var pie = {
		init() {
			this.getData();
			this.option = {
				title: {
					text: '',
					subtext: '纯属虚构',
					left: 'center',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: [],
				},
				series: {
					name: '',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowColor: 'rgba(0,0,0,.5)'
						}
					}
				}
			}
		},
		getData() {
			var This = this;
			$.ajax({
				url: 'http://api.duyiedu.com/api/student/findAll?appkey=kaivon_1574822824764',
				success: function (data) {
					// console.log(data);

					var list = JSON.parse(data).data;
					// console.log(list);

					if (list.length > 0) {
						This.areaChart(list);
						This.sexChart(list);
					} else {
						alert('亲，没有数据哦~');
					}
				}
			})
		},
		areaChart(data) {
			var myChart = echarts.init($('.areaChart')[0]);
			var legendData = [];
			var seriesData = [];

			//{"address":"啊","appkey":"kaivon_1574822824764","birth":2000,"ctime":1592053724,"email":"616526688@qq.com","id":57089,"name":"张三","phone":"13322224444","sNo":"111122","sex":0,"utime":1595568778}
			//legendData = [北京，上海，天津，广州]
			//seriesData= [{name:北京, value:10},...]

			//{北京：10，上海：20}

			var newData = {};
			data.forEach(function (item) {
				if (!newData[item.address]) {
					newData[item.address] = 1;
					legendData.push(item.address);
				} else {
					newData[item.address]++;
				}
			});
			// console.log(legendData);

			for (var prop in newData) {
				seriesData.push({
					name: prop,
					value: newData[prop],
				})
			}
			// console.log(seriesData)

			this.option.title.text = '渡一教育学生地区分布统计';
			this.option.legend.data = legendData;
			this.option.series.name = '地区分布';
			this.option.series.data = seriesData;
			myChart.setOption(this.option);
		},
		sexChart(data) {
			var myChart = echarts.init($('.sexChart')[0]);
			var legendData = ['男', '女'];

			var newData = {};
			data.forEach(function (item) {
				if (!newData[item.sex]) {
					newData[item.sex] = 1;
				} else {
					newData[item.sex]++;
				}
			});
			// console.log(legendData);

			var seriesData = [
				{ name: '男', value: newData[0] },
				{ name: '女', value: newData[1] },
			];

			// console.log(seriesData)

			this.option.title.text = '渡一教育学生性别统计';
			this.option.legend.data = legendData;
			this.option.series.name = '性别分布';
			this.option.series.data = seriesData;
			myChart.setOption(this.option);
		}
	}

	pie.init();
})();