/**
 * Database
 *
 * - database exists (?)
 * - find ()
 *
 * - [ ] Set data in objects
 * - [ ] Set data in enviroment
 * - [ ] Set massive data in objects
 * - [ ] Get data from specific file
 * - [ ] Store save data in files
 */
'use strict'

let data
let database

const Database = databasePath => {
  database = databasePath || '../cache/db.json'

  const proto = {
    /**
     * Set a key and value for database.
     *
     * @param string key
     * @param string value
     */
    set: function (key, value) {
      data = data || {}
      data[key] = value

      return this
    },

    // setEnv: function () {},
    // get: function () {},
    // getEnv: function () {},

    /**
     * Store data to db.json.
     */
    store: function () {
      return data
    }
  }

  return Object.create(proto)
}

module.exports = Database
