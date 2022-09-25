import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getList } from "@/server"
import type {RootObject,Child,ChinaAdd,ChinaTotal,LocalCityNCOVDataList} from './type'


export const useStore = defineStore('counter',{
  state: () => ({
    list: <RootObject>{},
    item: <Child[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetails:<LocalCityNCOVDataList[]>[],
  }),
  actions:{
    async getApiList() {
      const res = await getList();
      this.list = res;
      this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal;
      this.cityDetails = this.list.localCityNCOVDataList.slice(0,10);
    }
  }
})
