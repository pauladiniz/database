/**
 * Database test
 */
'use strict'

const chai = require('chai')
const expect = chai.expect

const db = require('../bin/database')()

chai.use(require('chai-fs'))

let dbFile = '../../test/files/db.json'

describe('Test database', function () {
  it ('Expect to return an error if file is not a json', function () {
    expect(db.setFile('../files/database.txt')).to.be.an.error
  })

  it (`Expect database to be a string and equal parameter`, function () {
    expect(db.setFile(dbFile).database)
      .to.be.a('string')
      .to.be.equal(dbFile)
  })

  it ('Expect to be an object and contains subtitle property', function () {
    expect(db.add('subtitle', 'pob').data)
      .to.be.an('object')
      .to.have.property('subtitle', 'pob')
  })
})
