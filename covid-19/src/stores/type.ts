export interface ChinaTotal {
  showLocalConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
  local_acc_confirm: number;
  localWzzAdd: number;
  localConfirmAdd: number;
  suspect: number;
  noInfect: number;
  nowConfirm: number;
  mRiskTime: string;
  confirmAdd: number;
  importedCase: number;
  showlocalinfeciton: number;
  dead: number;
  nowSevere: number;
  nowLocalWzz: number;
  deadAdd: number;
  localConfirm: number;
  confirm: number;
  heal: number;
  highRiskAreaNum: number;
  mtime: string;
  mediumRiskAreaNum: number;
}

export interface ChinaAdd {
  confirm: number;
  dead: number;
  nowConfirm: number;
  suspect: number;
  noInfect: number;
  noInfectH5: number;
  localConfirmH5: number;
  heal: number;
  nowSevere: number;
  importedCase: number;
  localConfirm: number;
}

export interface ShowAddSwitch {
  all: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  importedCase: boolean;
  localConfirm: boolean;
  confirm: boolean;
  suspect: boolean;
  dead: boolean;
  heal: boolean;
  noInfect: boolean;
  localinfeciton: boolean;
}

export interface Total {
  mtime: string;
  nowConfirm: number;
  dead: number;
  wzz: number;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  confirm: number;
  adcode: string;
  showRate: boolean;
  mediumRiskAreaNum: number;
  heal: number;
  showHeal: boolean;
  continueDayZeroLocalConfirmAdd: number;
  continueDayZeroLocalConfirm: number;
}

export interface Today {
  local_confirm_add: number;
  abroad_confirm_add: number;
  dead_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  tip: string;
  wzz_add: number;
}

export interface Total2 {
  dead: number;
  mediumRiskAreaNum: number;
  adcode: string;
  wzz: number;
  continueDayZeroConfirmAdd: number;
  continueDayZeroConfirm: number;
  mtime: string;
  showRate: boolean;
  provinceLocalConfirm: number;
  heal: number;
  showHeal: boolean;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  nowConfirm: number;
  confirm: number;
}

export interface Today2 {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
  wzz_add: string;
  local_confirm_add: number;
}

export interface Total3 {
  confirm: number;
  dead: number;
  showRate: boolean;
  heal: number;
  showHeal: boolean;
  wzz: number;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirm: number;
  mtime: string;
  nowConfirm: number;
  provinceLocalConfirm: number;
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  adcode: string;
  grade: string;
}

export interface Child2 {
  today: Today2;
  total: Total3;
  name: string;
  adcode: string;
  date: string;
  // only?: string; //新加的唯一值
}

export interface Child {
  adcode: string;
  date: string;
  today: Today;
  total: Total2;
  children: Child2[];
  name: string;
  only?: string; //新加的唯一值
}

export interface Today3 {
  isUpdated: boolean;
  confirm: number;
}

export interface AreaTree {
  total: Total;
  children: Child[];
  name: string;
  today: Today3;
}

export interface Diseaseh5Shelf {
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
  isShowAdd: boolean;
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
}

export interface LocalCityNCOVDataList {
  province: string;
  adcode: string;
  date: string;
  mtime: string;
  local_confirm_add: number;
  city: string;
  isUpdated: boolean;
  local_wzz_add: string;
  mediumRiskAreaNum: number;
  highRiskAreaNum: number;
  isSpecialCity: boolean;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  localCityNCOVDataList: LocalCityNCOVDataList[];
}