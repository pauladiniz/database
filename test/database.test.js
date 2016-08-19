/**
 * Database test
 *
 */
'use strict'

const chai = require('chai')
const expect = chai.expect

const dbDefault = require('../bin/database')
const db = dbDefault('../../test/files/database.json')

chai.use(require('chai-fs'))

describe('Test database', function () {
  it ('Expect should return an object', function () {
    expect(db.set('subtitle', 'pob').store()).to.be.an.object
    expect(dbDefault().set('subtitle', 'pob').store()).to.be.an.object
  })
})
