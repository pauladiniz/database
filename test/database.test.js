/**
 * Database test
 */
'use strict'

const path = require('path')
const chai = require('chai')
const expect = chai.expect

const db = require('../bin/database')()

chai.use(require('chai-fs'))

let dbFile = '../test/files/db.json'

describe('Test database', function () {
  before(function () {
    db.setFile(dbFile).add('subtitle', 'pob').store()
    db.addEnv({'MOOV_SEARCH': 'dope'})
  });

  it ('expect to return an error if file is not a json', function () {
    expect(db.setFile('../files/database.txt')).to.be.an.error
  })

  it ('expect database to be a string and equal parameter', function () {
    expect(db.setFile(dbFile).database)
      .to.be.a('string')
      .to.be.equal(dbFile)
  })

  it ('expect to be an object and contains subtitle property', function () {
    expect(db.add('subtitle', 'pob').data)
      .to.be.an('object')
      .to.have.property('subtitle', 'pob')
  })

  it ('expect file to exists and is a json', function () {
    expect(path.join(__dirname, dbFile))
      .to.be.a.file()
      .with.json
  })

  it ('expect an error if file can\'t be created', function () {
    expect(db.setFile('/home/db.json').add('key', 'value').store())
      .to.be.an.error
  })

  it ('expect to be an empty object', function () {
    expect(db.setFile('/home/db.json').getDatabase())
      .to.be.an('object')
      .to.be.empty
  })

  it ('expect to be an not empty object', function () {
    expect(db.setFile(dbFile).getDatabase(dbFile))
      .to.be.an('object')
      .to.not.empty
  })

  it ('expect to be an object and contains subtitle', function () {
    expect(db.setFile(dbFile).get())
      .to.be.an('object')
      .to.have.property('subtitle', 'pob')
  })

  it ('expect to be a string and is equal pob', function () {
    expect(db.setFile(dbFile).get('subtitle'))
      .to.be.an('string')
      .to.be.equal('pob')
  })

  it ('expect an error if key don\'t exists in file', function () {
    expect(db.setFile(dbFile).get('potatoes'))
      .to.be.an.error
  })

  it ('expect an error if typeof is not a object', function () {
    expect(db.setFile(dbFile).massive('test'))
      .to.be.an.error
  })

  it ('expect to be an object', function () {
    expect(db.setFile(dbFile).massive({'subtitle': 'pob', 'quality': '720p'}).data)
      .to.be.an('object')
      .to.have.property('subtitle')
  })

  it ('expect an error if parameter is not a object', function () {
    expect(db.addEnv('test'))
      .to.be.an.error
  })

  it ('expect to be an object and contains search', function () {
    expect(process.env)
      .to.be.an('object')
      .to.have.property('MOOV_SEARCH')
  })
})
