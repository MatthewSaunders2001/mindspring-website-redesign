import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const serverDir = resolve('dist', 'server')
mkdirSync(serverDir, { recursive: true })

const serverEntry = `export default {
  async fetch(request) {
    return fetch(request)
  },
}
`

writeFileSync(resolve(serverDir, 'index.js'), serverEntry, 'utf8')
