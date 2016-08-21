/**
 * Database
 *
 *
 * - [ ] Set data in objects
 * - [ ] Set data in enviroment
 * - [ ] Set massive data in objects
 * - [ ] Get data from specific file
 * - [ ] Store save data in files
 */
'use strict'

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
     * Add a key and value for database.
     *
     * @param string key
     * @param string value
     */
    add: function (key, value) {
      this.data = this.data || {}
      this.data[key] = value

      return this
    }

    // setEnv: function () {},
    // get: function () {},
    // getEnv: function () {},

    /**
     * Store data to db.json.
     */
    // store: function () {
    //   return data
    // }
  }

  return Object.create(proto)
}

module.exports = Database
