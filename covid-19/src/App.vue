<template>
  <div class="box" :style="{ background: `url(${Flashbak}`,backgroundSize:'cover' }">
    <div style="color:white" class="box-left">
      <div class="box-left-card">
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.localConfirmH5}}</div>
          <div>{{ UseStore.chinaTotal.localConfirmH5}}</div>
          <div>本土現有確診</div>
        </section>
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.nowConfirm}}</div>
          <div>{{ UseStore.chinaTotal.nowConfirm}}</div>
          <div>現有確診</div>
        </section>
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.confirm}}</div>
          <div>{{ UseStore.chinaTotal.confirm}}</div>
          <div>累計確診</div>
        </section>
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.noInfect}}</div>
          <div>{{ UseStore.chinaTotal.noInfect}}</div>
          <div>無症狀感染者</div>
        </section>
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.importedCase}}</div>
          <div>{{ UseStore.chinaTotal.importedCase}}</div>
          <div>境外輸入</div>
        </section>
        <section>
          <div>較上日 + {{ UseStore.chinaAdd.dead}}</div>
          <div>{{ UseStore.chinaTotal.dead}}</div>
          <div>累計死亡</div>
        </section>
      </div>
      <div class="box-left-pie">
      </div>
      <div class="box-left-line">
      </div>
    </div>
    <div id="china" class="box-center">
    </div>
    <div style="color: white" class="box-right">
      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地區</th>
            <th>新增確診</th>
            <th>累計確診</th>
            <th>治癒</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__fadeIn" tag="tbody">
          <tr v-for="(item, index) in UseStore.item" :key="(item.only || item.name)">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Flashbak from "@/assets/Flashbak.webp";
import { useStore } from "@/stores";
import * as echarts from "echarts";
import './assets/china.js';
import {geoCoordMap} from "./assets/geoMap"
import 'animate.css'

const UseStore = useStore();

const initEcharts = () =>{
  // 抓api的資料
  const city = UseStore.list.diseaseh5Shelf.areaTree[0].children;
  UseStore.item = city[2].children as any;
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children
    }
  })
  // echarts 引入
  const charts = echarts.init(document.querySelector("#china") as HTMLElement);
  // 去echats抓資料
  charts.setOption({
    // backgroundColor: "black",
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        // normal: {
          areaColor: {
            type: "linear-gradient",
            x: 0,
            y: 1200,
            x2: 1000,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#152E6E", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#0673AD", // 50% 处的颜色
              },
            ],
            global: true, // 缺省为 false
          },
          shadowColor: "#0f5d9d",
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
              opacity: 0,
              label: {
                show: false,
                color: "#009cc9",
              },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        // selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          // normal: {
            areaColor: "#0c3653",
            borderColor: "#1cccff",
            borderWidth: 1.8,
          // },
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        // name: "Top 5",
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol:'pin',
        symbolSize:[45,45],
        
        label: {
          show: true,
          formatter (value:any) {
            return value.data.value[2];
          }
        },
        itemStyle: {
          color: "#1E90FF", //标志颜色
        },
        data: data,
      },
    ],
  });
  // echarts點擊的function
  charts.on('click', (e:any)=>{
    const newArray = e.data.children.map((value:any)=> {
      return {...value, only:e.data.name.concat(value.name)}
    })
    UseStore.item = newArray;
  })
}
//圓餅圖
const initEchartsPie = () => {
  // echarts 引入
  const charts = echarts.init(document.querySelector(".box-left-pie") as HTMLElement);
  charts.setOption({
    backgroundColor:'#223651',
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          // position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: UseStore.cityDetails.map((v)=>{
          return {
            name:v.city,
            value:v.local_confirm_add
          }
        })
      }
    ]
  })
}
//折線圖
const initEchartsLine = () => {
  // echarts 引入
  const charts = echarts.init(document.querySelector(".box-left-line") as HTMLElement);
  charts.setOption({
    tooltip: {
      trigger: 'axis'
    },
    backgroundColor:'#223651',
    label: {
      show: true,
    },
    xAxis: {
      type: 'category',
      data: UseStore.cityDetails.map((v)=> v.city),
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine:{
        lineStyle:{
          color:'#fff',
        }
      }
    },
    series: [
      {
        data: UseStore.cityDetails.map((v)=> v.local_confirm_add),
        type: 'line',
        smooth: true
      }
    ]
  })
}

onMounted(async () => {
  await UseStore.getApiList();
  initEcharts();
  initEchartsPie();
  initEchartsLine();
  window.onresize = () =>{
    const qqq = echarts.init(document.querySelector("#china") as HTMLElement)
    qqq.resize();
  }
});
</script>
<style lang="scss" scope>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}

.box {
  height: 100%;
  display: flex;
  padding: 10px;
  &-left {
    width: 400px;
    // background:red;
    &-pie {
      height: 320px;
      margin-top:20px;
    }
    &-line {
      height: 320px;
      margin-top:20px;
    }
    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background:#223651; // #41b0db #212028
        border: 1px solid #212028;
        padding: 10px;
        display:flex;
        flex-direction: column;
        align-items: center;
        div:nth-child(2) {
          color: #41b0db;
          padding: 10px 0px;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
    // background:green;
  }
}
.table {
  width: 100%;
  background:#212028;
  tr{
    th{
      padding:5px;
      white-space: nowrap;
    }
    td {
      padding:5px 10px;
      width:100px;
      white-space: nowrap;
    }
  }
}
</style>
