/**
 * Database test
 */
'use strict'

const path = require('path')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-fs'))

const database = require('../bin/database')

const file = path.join(__dirname, '../test/files/db.json')
const db = database.setFile(file)

describe('Test database', function () {
  before(function () {
    db.add('subtitle', 'pob').store()
    db.addEnv({'MOOV_SEARCH': 'dope'})
  });

  it ('expect to return an error if file is not a json', function () {
    expect(() => { database.setFile('../db.txt') }).to.throw('The database file must be a json file')
  })

  it ('expect database to be a string and equal parameter', function () {
    expect(db.database)
      .to.be.a('string')
      .to.be.equal(file)
  })

  it ('expect to be an object and contains subtitle property', function () {
    expect(db.add('subtitle', 'pob').data)
      .to.be.an('object')
      .to.have.property('subtitle', 'pob')
  })

  it ('expect file to exists and is a json', function () {
    expect(file)
      .to.be.a.file()
      .with.json
  })

  it ('expect an error if file can\'t be created', function () {
    expect(database.setFile('/home/db.json').add('key', 'value').store())
      .to.be.an.error
  })

  it ('expect to be an empty object', function () {
    expect(database.setFile('/home/db.json').get())
      .to.be.an('object')
      .to.be.empty
  })

  it ('expect to be an not empty object', function () {
    expect(database.setFile(file).get())
      .to.be.an('object')
      .to.not.empty
  })

  it ('expect to be an object and contains subtitle', function () {
    expect(db.get())
      .to.be.an('object')
      .to.have.property('subtitle', 'pob')
  })

  it ('expect to be a string and is equal pob', function () {
    expect(db.get('subtitle'))
      .to.be.an('string')
      .to.be.equal('pob')
  })

  it ('expect an error if key don\'t exists in file', function () {
    expect(() => { db.get('potatoes') })
      .to.throw('potatoes is undefined')
  })

  it ('expect an error if typeof is not a object', function () {
    expect(() => { db.massive('test') })
      .to.throw('data must be an object')
  })

  it ('expect to be an object', function () {
    expect(db.massive({'subtitle': 'pob', 'quality': '720p'}).data)
      .to.be.an('object')
      .to.have.property('subtitle')
  })

  it ('expect an error if parameter is not a object', function () {
    expect(() => { db.addEnv('test') })
      .to.throw('data must be an object')
  })

  it ('expect to be an object and contains search', function () {
    expect(process.env)
      .to.be.an('object')
      .to.have.property('MOOV_SEARCH')
  })
})
