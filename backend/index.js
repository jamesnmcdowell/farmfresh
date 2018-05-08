const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./database.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signature = '@!3$%%^&1ed^&*!l@#^&***()R0441';
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

//db queries
let createUser = (user) =>
  db.query(`INSERT into users (email, password, username, firstname, lastname) VALUES ('${user.email}', '${user.password}', '${user.username}', '${user.firstname}', '${user.lastname}') RETURNING id;`)

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

let getUserDataQuery = (userId) =>
  db.query(`SELECT * from users where id = ${userId};`)
    
let getUserData = async (req, res) => {
  let token = req.headers.authorization;
  let result = tokenValidator(token);
  let userData = await getUserDataQuery(result.userId);
  res.send(userData);
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

let getMyCookBooks = (req, res) => {
  let authorization = req.headers.authorization;
  let payload = jwt.verify(authorization, signature);
  return(
      getMyCookBooksFromDB(payload.userId)
      .then(cookbooks => res.send(cookbooks))
  )
}

let postRecipe = (req, res) => {
  let recipe = req.body
  console.log('recipe: ', recipe);
  let token = req.headers.authorization;
  let validation = tokenValidator(token);
  validation &&
    postRecipeToDB(recipe, validation.userId)
    .then(response => res.send(response))
    .catch(err => res.send(err))
}

let postCookBook = (req, res) => {
  let cookbook = req.bodyParser
  let token = req.headers.authorization;
  let validation = tokenValidator(token);
  return (
    createCookBookInDB(cookbook)
    .then(response => res.send(response))
    .catch(err => res.send(err))
  )
}

let getRecipeByID = async (req, res) => {
  if (!req.headers || !req.headers.id) throw new Error('please send an id');
  res.send(await getRecipeFromDB(req.headers.id))
  
}

let searchRecipes = async (req, res) => {
  try {
    let recipes = await db.query(`SELECT * from recipes;`);
    let searchString = req.body.searchString.slice(1);
    res.send((searchString === "")? recipes : recipes.filter(c => c.title.toLowerCase().match(searchString.toLowerCase())));
  } catch (error) {
    throw new Error('this is not working out for us');
  }
}

//Middleware
app.use(bodyParser.json());
app.use(express.static('build'));
app.get('/', function (req, res) {
  res.send("Welcome to NodeJS app on Heroku!");
});
app.get('/get-user', getUserData)
app.get('/all-categories', getAllCategories)
app.get('/recipe-by-category', getRecipesByCategories)
app.get('/all-ingredients', getAllIngredients)
app.get('/recipes', getMyRecipes)
app.post('/recipes', postRecipe)
app.get('/all-recipes', getAllRecipes)
app.get('/cookbooks', getMyCookBooks)
app.post('/cookbooks', postCookBook)
app.post('/users', postUser)
app.post('/signin', signIn)
app.get('/recipe', getRecipeByID)
app.get('/search', searchTerms)
app.post('/search-recipes', searchRecipes)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Recipes running on ${port}`))
