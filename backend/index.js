// const db = require('./database.js');

const koa = require('koa'); 
const koaRouter =  require('koa-router'); 
const koaBody = require('koa-bodyparser'); 
const { graphqlKoa: graphql, 
        graphiqlKoa: graphiql
      } = require('apollo-server-koa');
const signature = '@!3$%%^&1ed^&*!l@#^&***()R0441';
const koaJWT = require('koa-jwt');
let jwtParser = koaJWT({ secret: signature });
const bcrypt = require('bcrypt');
const schema = require('./schema');

const app = new koa();
const api = new koaRouter();
const port = process.env.PORT || 5000;

//authorization
let createToken = (userId) => {
  let tokenPayload = {userId: userId};
  tokenPayload.token = jwt.sign({userId: userId}, signature, {expiresIn: '7d'});
  return JSON.stringify(tokenPayload)
}

let validateCredentials = (res, email, password) => {
  let userId
  let userQuery = db.query(`SELECT email, password, id from users WHERE email = '${email}';`)
  .then(users => {userId = users[0].id; return users[0]})
  .then(user => bcrypt.compare(password, user.password))
  .then(response => response ? userId : error)
  .then(userId => createToken(userId))
  .then(token => { console.log(token); return res.send(token)})
  .catch(error => res.send(error));
}


let tokenValidator = (token) =>
  jwt.verify(token, signature)

//handlers
let signIn = (req, res) => {
  let credentials = req.body;
  let {email, password} = credentials;
  validateCredentials(res, email, password);
}
let postUser = (req, res) => {
  let credentials = req.body;
  bcrypt.hash(credentials.password, 10)
  .then(hash => Object.assign({}, credentials, {password: hash}))
  .then(user => createUser(user))
  .then(arrayWithIdObject => arrayWithIdObject[0].id)
  .then(id => createToken(id))
  .then(token => res.send(token))
  .catch(error => res.send(error));
}

let getMyRecipes = (req, res) => {
  let authorization = req.headers.authorization;
  let payload = jwt.verify(authorization, signature);
  return (
    getMyRecipesFromDB(payload.userId)
    .then(recipes => res.send(recipes))
  )
}

api.post('/graphql', koaBody(), graphql({ schema }));
api.get('/graphql', graphql({ schema}));
api.get('/graphiql', graphiql({ endpointURL: '/graphql' }));

app.use(api.routes());
app.use(api.allowedMethods());
app.listen(port, () => console.log(`farmfresh running on ${port}`))
