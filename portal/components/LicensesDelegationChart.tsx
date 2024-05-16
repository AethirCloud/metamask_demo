/*
 * @Description:
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-03-28 13:37:15
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-28 14:39:05
 */

import React, { useEffect } from "react";
import * as echarts from "echarts";
import { useTranslation } from "next-i18next";
import { useState } from "react";
const LicensesDelegationChart = (props: any) => {
  const { t } = useTranslation<"common">("common");
  const { data } = props;
  console.log('data==',data)
  useEffect(() => {
    const chartDom = document.getElementById("echarts-container");
    const myChart = echarts.init(chartDom);

    const option = {
      // ECharts 配置选项
      tooltip: {
        trigger: "item",
        formatter: function (params: any) {
          var total = 0;
          var target;
          var value;
          for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].num;
            if (data[i].name == params.name) {
              target = data[i].num;
              value = data[i].value;
            }
          }
          return `${params.name}：${value}%(${target})`;
        },
      },
      legend: {
        bottom: '5',
        itemWidth:9,
        itemHeight:9,
        icon:"circle",
        data:data,
        formatter: function (name:any) {
          var total = 0;
          var target;
          for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].num;
            if (data[i].name == name) {
              target = data[i].num;
            }
          }
          return `${name}(${target})` ;
        },
        textStyle: {
          fontSize: 12,
          fontWeight: 400
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: true,
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          label: {
            formatter: `{c}%`,
            textStyle: {
              color: "#000000", // 字体颜色
              fontSize: 12, // 字体大小
              fontWeight: "400", // 字体粗细
            },
          },
          data: data.map((item: any) => ({
            name: item.name,
            value: item.value,
          })),
          itemStyle: {
            color: (params: any) => {
              const colorList = ["#4B5F30", "#1C2925", "#C0E44C"]; // 设置环形块的颜色列表
              return colorList[params.dataIndex % colorList.length];
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // 在组件卸载前销毁 ECharts 实例
    };
  }, [data]);

  return <div id="echarts-container" className="w-full h-96"></div>;
};

export default LicensesDelegationChart;
