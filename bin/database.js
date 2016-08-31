/**
 * Database
 */
'use strict'

const fs = require('fs')
const _ = require('lodash')

const Database = () => {
  const __ = {
    getDatabase: database => {
      if (!fs.existsSync(database) || !fs.readFileSync(database, 'utf8')) {
        return false
      }

      return JSON.parse(fs.readFileSync(database, 'utf8'))
    }
  }

  const proto = {
    data: {},
    database: '',

    /**
     * Set file database.
     *
     * @param {string} pathname
     */
    setFile: function (pathname) {
      let regex = new RegExp(/\.json$/)

      if (!regex.test(pathname)) {
        throw new Error('The database file must be a json file')
      }

      this.database = pathname

      return this
    },

    /**
     * Add a key and value for database.
     *
     * @param {string} key
     * @param {string} value
     */
    add: function (key, value) {
      this.data = __.getDatabase(this.database) || this.data
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
        throw new Error('data must be an object')
      }

      _.map(data, (value, key) => {
        process.env[key] = value
      })
    },

    /**
     * Add multiples keys to database.
     *
     * @param {object} data
     */
    massive: function (data) {
      if (typeof data !== 'object') {
        throw new Error('data must be an object')
      }

      _.map(data, (value, key) => this.add(key, value))

      return this
    },

    /**
     * Return an key from database or all data.
     *
     * @param {string} item
     */
    get: function (item) {
      let db = __.getDatabase(this.database) || this.data

      if (item !== undefined && !(item in db)) {
        throw new Error(`${item} is undefined`)
      }

      return db[item] || db
    },

    /**
     * Store data to db.json.
     */
    store: function () {
      fs.writeFile(this.database, JSON.stringify(this.data), err => {
        if (err) {
          throw new Error(err)
        }

        return this
      })
    }
  }

  return Object.create(proto)
}

module.exports = Database()
