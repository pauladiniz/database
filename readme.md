# Database

[![Software License][ico-license]](LICENSE)
![Code Style][ico-standard]
[![Downloads][ico-downloads]][link-downloads]
[![Build Status][ico-travis]][link-travis]
[![Quality Score][ico-code-quality]][link-code-quality]
[![Coverage Status][ico-scrutinizer]][link-scrutinizer]

[ico-standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[ico-downloads]: https://img.shields.io/npm/dt/moov-database.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/moov-org/database/master.svg?style=flat-square
[ico-code-quality]: https://img.shields.io/scrutinizer/g/moov-org/database.svg?style=flat-square
[ico-scrutinizer]:https://img.shields.io/scrutinizer/coverage/g/moov-org/database.svg?style=flat-square

[link-downloads]: http://npmjs.com/package/moov-database
[link-travis]: https://travis-ci.org/moov-org/database
[link-code-quality]: https://scrutinizer-ci.com/g/moov-org/database/?branch=master
[link-scrutinizer]: https://scrutinizer-ci.com/g/moov-org/database/?branch=master

A simple json database storage.

## Get Started

Install the package

```shell
$ [sudo] npm install --save moov-database
```

## Basic Usage

```js
const db = require('moov-database')

db
  .setFile('path/to/your/db.json')
  .add('user', 'uselessdev')
  .store()
```

## API

### .setFile(path/to/your/database.json)

The `setFile` method allow you to set a path for one database per time.

```js
//...

db.seFile('./users.json')

console.log(db.database) // ./users.json

```

### .add(key, value)

Using the `add` method you can push a new data to your `database`

```js
//...

db.add('username', 'donkey')
db.add('useremail', 'donkey@mydonkeymail.com')

// Or you can chain methods...

db
  .add('username', 'donkey')
  .add('useremail', 'donkey@mydonkeymail.com')

console.log(db.data) // {username: 'donkey', useremail: 'donkey@mydonkeymail.com'}

```

### .massive()

Using the `massive` method you can store an whole object at once to your ` database`

```js
//...

db.massive({
  users: [
    {name: 'donkey', email: 'donkey@mydonkeymail.com'},
    {name: 'cow', email: 'cow@mycowmail.com'}
  ]
})

console.log(db.data)
// {
//    users: [
//      {name: 'donkey', email: 'donkey@mydonkeymail.com'},
//      {name: 'cow', email: 'donkey@mycowmail.com'}
//    ]
// }
```

### .store()
The `store` method will save the stored data in to a `.json` file

```js
//...

db.store()
```

### .get()

Using the `get` method you can retrieve all data stored in database, or you can retrieve a single result by passing his `key` name

```js
//...

db.get('users')
// [
//   {name: 'donkey', email: 'donkey@mydonkeymail.com'},
//   {name: 'cow', email: 'donkey@mycowmail.com'}
// ]

```

### Example:

```js

const database = require('moov-database')
const db = database.setFile('./users.json')

db
  .massive({
    users: [
      {name: 'donkey', email: 'donkey@mydonkey.com'},
      {name: 'cow', email: 'cow@mycow.com'}
    ]
  })
  .add('count_users', db.get('users').length)
  .store()

db.get()
// will return
//
// {
//    users: [
//      {name: 'donkey', email: 'donkey@mydonkey.com'},
//      {name: 'cow', email: 'cow@mycow.com'}
//    ],
//    count_users: 2
// }
//
//

```

## CHANGELOG

[changelog](changelog.md)

## CONTRIBUTING

[contributing](contributing.md)

## LICENSE

[MIT](LICENSE)
