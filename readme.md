# Database

[![Software License][ico-license]](LICENSE)
![Code Style][ico-standard]
[![Build Status][ico-travis]][link-travis]
[![Quality Score][ico-code-quality]][link-code-quality]

[ico-standard]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/moov-org/database/master.svg?style=flat-square
[ico-code-quality]: https://img.shields.io/scrutinizer/g/moov-org/database.svg?style=flat-square

[link-travis]: https://travis-ci.org/moov-org/database
[link-code-quality]: https://scrutinizer-ci.com/g/moov-org/database/?branch=master

A simple json database storage.

## Get Start

Install the package:

```shell
$ [sudo] npm install --save moov-database
```
Call this in your module:

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

`add` method allow you to set a key => value for temporary `.data`

```js
//...

db.add('username', 'donkey')
db.add('useremail', 'donkey@mydonkeymail.com')

// OR
db
  .add('username', 'donkey')
  .add('useremail', 'donkey@mydonkeymail.com')

console.log(db.data) // {username: 'donkey', useremail: 'donkey@mydonkeymail.com'}

```

### .massive()

`massive` method allow you to add an object for `.data`

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
`store` method save your data to you `.json` file.

```js
//...

db.store()
```

### .get()

`get` method return an key if exists in your file, or return all object if any
value has passed.

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
