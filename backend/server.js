require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./schema');
const db = require('./models');

const app = express();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
          return { user, db };
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      }
      return { db };
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Sync database and start server
db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Database synced');
  startServer();
}).catch((err) => {
  console.error('Failed to sync database:', err);
});