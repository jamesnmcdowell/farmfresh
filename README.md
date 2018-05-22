# farmfresh

> farmfresh is a platform that enbales local farms to connect directly with customers.
<br>

![farmfresh](https://user-images.githubusercontent.com/19500679/40376850-699d8690-5dbd-11e8-96a3-412d47018bbb.jpg)
---

## Table of Contents
- [Setup](#setup)
- [Demo](#demo)
- [Features](#features)
- [Libraries/APIs](#external)
- [Todos](#todos)
- [Contributors](#contributors)
- [License](#license)

---
## Setup

> Install dependies for both frontend and backend and setup postgres database using sql file
```shell
$ git clone git@github.com:jamesnmcdowell/farmfresh.git
$
$ #frontend
$ yarn install 
$ yarn start
$
$ #postgres
$ createdb farmfresh 
$ cat db.sql | psql farmfresh
$
$ #backend
$ yarn install 
$ node index.js

```
## Demo
> https://farm-fresh-app.herokuapp.com
* Create a dummy account to browse the app
* Or use email: james / password: james

## Features

* Customers can use predictive search bar to query for products
* Customers can search for products based on category
* Customers search results return closest location to them
* Vendor can add both products and selling locations to database
* Client-side routing with react router
* Authentication using JSON web tokens and bcrypt
* GraphQL server that enables sophisticated client-side querying
* State management with redux
* Responsive mobile-first CSS Grid/ Flexbox Layout

## External
> Libraries and APIs used within the application
* [React](https://reactjs.org/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Redux](https://redux.js.org/)
* [Recompose](https://github.com/acdlite/recompose)
* [Lodash](https://lodash.com/)
* [Node](https://nodejs.org/)
* [Apollo Sever](https://github.com/apollographql/apollo-server)
* [GraphQL](https://graphql.org/)
* [Koa](https://koajs.com/)
* [JSON Web Token (JWT)](https://jwt.io/)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js)



## Todos
* Create map view of search results detailing locations
* Expand on vendor dashboard so that vendors can edit and delete locaions/ products

## Contributors
* [James](https://github.com/jamesnmcdowell)
* [Chris](https://github.com/chrisgoodell)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](https://github.com/jamesnmcdowell/griddle/blob/master/LICENSE)**
