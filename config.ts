import { generateCraigslistUrl } from './utilities'

export const COMMON_GPU_KEYWORD_OPERATOR_STRING = `"3080" | "3070" | "3080 TI" | "3090" | "6900 XT" | "6800 XT"`

export enum Vendors {
  BESTBUY = "BESTBUY",
  BH = "BH",
  CRAIGSLIST = "CRAIGSLIST"
}
type VendorsKeys = keyof typeof Vendors;
type VendorsKeyFields = {[key in VendorsKeys]:UrlsByModel}

export enum GPUModels {
  RTX_3080 = 'RTX_3080',
  RTX_3080_TI = 'RTX_3080_TI',
  RTX_3070 = 'RTX_3070',
  AMD_6900_XT = 'AMD_6900_XT',
  SEARCH = "SEARCH"
  // TEST = 'TEST'
}
type GPUModelsKeys = keyof typeof GPUModels;
type GPUModelsKeyFields = {[key in GPUModelsKeys]:string}

export interface UrlsByModel extends GPUModelsKeyFields {
  [key: string]: string
}

export interface UrlsByVendor extends VendorsKeyFields {
  [key: string]: UrlsByModel
}

export const URLS_BY_MODEL_BESTBUY: UrlsByModel = {
  [GPUModels.RTX_3080]: 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440',
  [GPUModels.RTX_3070]: '',
  [GPUModels.RTX_3080_TI]: 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-ti-12gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6462956.p?skuId=6462956',
  [GPUModels.AMD_6900_XT]: 'https://www.bestbuy.com/site/xfx-speedster-merc319-amd-radeon-rx-6900-xt-ultra-16gb-gddr6-pci-express-4-0-gaming-graphics-card-black/6445157.p?skuId=6445157',
  [GPUModels.SEARCH]: '',
  'TEST': 'https://www.bestbuy.com/site/samsung-70-class-7-series-led-4k-uhd-smart-tizen-tv/6429416.p?skuId=6429416',
}

export const URLS_BY_MODEL_BH: UrlsByModel = {
  [GPUModels.RTX_3080]: 'https://www.bhphotovideo.com/c/product/1603617-REG/asus_rog_strix_rtx3080_o10g_gaming_rog_strix_geforce_rtx.html',
  [GPUModels.RTX_3070]: '',
  [GPUModels.RTX_3080_TI]: '',
  [GPUModels.AMD_6900_XT]: '',
  [GPUModels.SEARCH]: '',
}




export const URLS_BY_MULTISEARCH_CRAIGSLIST: UrlsByModel = {
  [GPUModels.RTX_3080]: '',
  [GPUModels.RTX_3070]: '',
  [GPUModels.RTX_3080_TI]: '',
  [GPUModels.AMD_6900_XT]: '',
  [GPUModels.SEARCH]: generateCraigslistUrl('sandiego', {
    postal: 92104,
    postedToday: 1,
    query: `${COMMON_GPU_KEYWORD_OPERATOR_STRING}`,
    search_distance: 30,
    sort: 'rel',
  })
}


export const URLS_BY_VENDOR: UrlsByVendor = {
  [Vendors.BESTBUY]: URLS_BY_MODEL_BESTBUY,
  [Vendors.BH]: URLS_BY_MODEL_BH,
  [Vendors.CRAIGSLIST]: URLS_BY_MULTISEARCH_CRAIGSLIST
}
