import { exec } from 'child_process'
import { COMMON_GPU_KEYWORD_OPERATOR_STRING } from './config'
import QueryString from 'query-string'

export async function shell(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err,stdout,stderr) => {
      // if ( err || stderr ) reject(err);
      if ( err ) {
        reject(err)
        return
      }
      if ( stderr ) {
        resolve(stderr)
        return
      }
      resolve(stdout)
    })
  })
}

export async function commandExists(cmd: string) {
  try {
    const exists = await new Promise((resolve, reject) => {
      exec(`command -v ${cmd}`, (err,_stdout,stderr) => {
        if ( err || stderr ) {
          reject(new Error(`Command "${cmd}" is unavailable.`))
        }
        resolve(true)
      })
    })

    return exists
  } catch (ex) {
    // return ex.toString()
    return false
  }
  
}

export async function getCapabilities() {

  const TTS = await commandExists('festival')
  const MPV = await commandExists('mpv')

  return {
    TTS,
    MPV
  }
}



export function generateCraigslistUrl(city: string, options?: any) {

  // "https://sandiego.craigslist.org/d/for-sale/search/sss?postal=92104&postedToday=1&query=%226800%20XT%22%20%7C%20%223080%22%20%7C%20%223080%20TI%22%20%223090%22&search_distance=30&sort=rel"
  const CRAIGSLIST_QUERY_STRING = QueryString.stringify({
    postal: 92104,
    postedToday: 1,
    query: `${COMMON_GPU_KEYWORD_OPERATOR_STRING}`,
    search_distance: 30,
    sort: 'rel',
    ...options
  })
  return `https://${city}.craigslist.org/d/for-sale/search/sss?${CRAIGSLIST_QUERY_STRING}`
}
