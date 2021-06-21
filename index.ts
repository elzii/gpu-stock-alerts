// import * as FileSystem from 'fs'
import * as Path from 'path'
import puppeteer, { Page } from 'puppeteer'
import $ from 'cheerio'
const CronJob = require('cron').CronJob
// const nodemailer = require('nodemailer')

import * as Config from './config'
import * as Utils from './utilities'


function getArgs() {
  const [
    _p, 
    script,
    vendor = Config.Vendors.BESTBUY,
    model = Config.GPUModels.AMD_6900_XT,
    interval = 15,
    ...rest
  ] = process.argv

  return {
    script,
    vendor,
    model,
    interval,
    ...rest
  }
}

let Capabilities: any
const Args = getArgs()
const URL = Config.URLS_BY_VENDOR[Args.vendor][Args.model]
const SOUNDS_DIR = Path.resolve(__dirname, './sounds')



async function startTracking() {
  // if ( Capabilities.TTS ) {
  //   Utils.shell('echo "Starting script" | festival --tts')
  // }
  const page = await configureBrowser()
  let job = new CronJob(`*/${Args.interval} * * * * *`, function() { //every 15 seconds
    checkInventoryBestBuy(page)
  }, null, false, null, null, false)
  job.start()
}

async function configureBrowser() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setRequestInterception(true)

  page.on('request', (request: any) => {
    if (request.resourceType() === 'document') {
      request.continue()
    } else {
      request.abort()
    }
  })

  await page.goto(URL)
  return page
}


async function checkInventoryBestBuy(page: Page) {
  await page.reload()

  console.log({
    status: "CHECKING",
    model: Args.model,
  })
  let html = await page.evaluate(() => document.body.innerHTML)

  $('.add-to-cart-button', html).each(function() {
    // @ts-ignore
    let stock = $(this).text()

    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)

    if (stock == 'Add to Cart') {
      //sendNotification()

      if ( Capabilities.MPV ) {
        Utils.shell(`mpv --no-config --no-audio-display ${SOUNDS_DIR}/Bip.wav`)
      }
      // if ( Capabilities.TTS ) {
      //   Utils.shell(`echo "AVAILABLE" | festival --tts`)
      // }
      
      console.log({
        status: 'AVAILABLE',
        model: Args.model,
        URL
      })
    } else {
      console.log({
        status: 'SOLD_OUT',
        model: Args.model,
        checkedAt: today.toLocaleTimeString()
      })
    }
  })
}





async function main() {
  Capabilities = await Utils.getCapabilities()
  console.log({ Capabilities, Args, URL })
  startTracking()
}

if (!module.parent) {
  (async () => {
    await main()
  })()
}
