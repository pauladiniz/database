/**
 * Database
 */
'use strict'

const fs = require('fs')
const path = require('path')

const Database = () => {
  const proto = {
    data: '',
    database: '',

    /**
     * Set file database.
     *
     * @param string pathname
     */
    setFile: function (pathname) {
      let regex = new RegExp(/\.json$/)

      if (!regex.test(pathname)) {
        return new Error('Database expect to be an json file.')
      } else {
        this.database = pathname
      }

      return this
    },

    getDatabase: function () {
      if (!fs.existsSync(path.join(__dirname, this.database))) {
        return {}
      }

      return require(path.join(__dirname, this.database))
    },

    /**
     * Add a key and value for database.
     *
     * @param string key
     * @param string value
     */
    add: function (key, value) {
      this.data = this.data || {}
      this.data[key] = value

      return this
    },

    get: function (item) {
      let db = this.getDatabase()

      if (item !== undefined && !(item in db)) {
        return new Error(`${item} is undefined`)
      }

      return db[item] || db
    },

    /**
     * Store data to db.json.
     */
    store: function () {
      fs.writeFile(path.join(__dirname, this.database), JSON.stringify(this.data), err => {
        if (err) {
          return new Error(err)
        }
      })
    }
  }

  return Object.create(proto)
}

module.exports = Database
