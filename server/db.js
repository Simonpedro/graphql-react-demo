const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFilePath = path.join(process.cwd(), '.db.json')

const adapter = new FileSync(dbFilePath)
const db = low(adapter)

db.defaults({ starredMoviesIds: [] }).write()

module.exports = db
