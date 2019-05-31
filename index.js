import express from 'express';
import bodyParser from 'body-parser';
//import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { ApolloServer, gql } from 'apollo-server-express';
//import { makeExecutableSchema } from 'graphql-tools';

import graphqlHTTP from "express-graphql";


const app = express();
import TYPEDEFS from './schemas';
import RESOLVERS from './resolvers';



const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:3000/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
});


// Construct a schema, using GraphQL schema language
const PORT = 3000;

SERVER.applyMiddleware({
app: app
});

//app.use('/graphql', bodyParser.json(), graphqlExpress({ SERVER }));

// GraphiQL, a visual editor for queries
app.use('/graphql', graphqlHTTP(() => ({ schema, graphiql: true })));


app.listen(PORT, ()=>{
   console.log('Running GRAPH server ....');
});
