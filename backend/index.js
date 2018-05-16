// const db = require('./database.js');

const koa = require('koa'); 
const Router =  require('koa-router'); 
const koaBody = require('koa-bodyparser'); 
const { graphqlKoa: graphql, 
        graphiqlKoa: graphiql
      } = require('apollo-server-koa');
const signature = '@!3$%%^&1ed^&*!l@#^&***()R0441';
const koaJWT = require('koa-jwt');
let jwtParser = koaJWT({ secret: signature, passthrough: true, cookie: "token" });
const bcrypt = require('bcrypt');
const schema = require('./schema');
const { koa: middleware } = require('graphql-voyager/middleware');

const app = new koa();
const router = new Router();
const port = process.env.PORT || 5000;


router.use(jwtParser);

// router.use((ctx, next) => {console.dir(ctx.state); return next();});

// jwtParser
router.all('/graphql', koaBody(), 
  graphql(ctx => {
    return {
    schema,
    context: ctx.state
  }}));


// api.get('/graphql', graphql({ schema}));
// graphql(ctx => ({ schema, context: ctx.state }))

// api.use('/api', koaBody(), graphql({ schema }));

router.get('/graphiql', graphiql({ endpointURL: '/graphql' }));
router.all('/voyager', middleware({ endpointUrl: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => console.log(`farmfresh running on ${port}`))
