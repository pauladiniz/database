/**
 * Database
 */
'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')

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

    /**
     * Return all data from file.
     */
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

    /**
     * Add values to env vars from node.
     *
     * @param {object} data
     */
    addEnv: function (data) {
      if (typeof data !== 'object') {
        return new Error('data must be an object')
      }

      _.map(data, (value, key) => {
        process.env[key] = value
      })
    },

    /**
     * Add multiples keys to database.
     *
     * @param  {object} object
     */
    massive: function (data) {
      if (typeof data !== 'object') {
        return new Error('data must be an object')
      }

      _.map(data, (value, key) => this.add(key, value))

      return this
    },

    /**
     * Return an key from database or all data.
     *
     * @param  {string} item
     */
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
