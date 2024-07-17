const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    price: Float!
    category: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    searchProducts(query: String!): [Product]
    filterProducts(category: String, minPrice: Float, maxPrice: Float): [Product]
    me: User
  }

  type Mutation {
    createProduct(name: String!, description: String, price: Float!, category: String!): Product
    signup(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

const resolvers = {
  Query: {
    products: (parent, args, { db }) => db.Product.findAll(),
    product: (parent, { id }, { db }) => db.Product.findByPk(id),
    searchProducts: (parent, { query }, { db }) => {
      return db.Product.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            { name: { [db.Sequelize.Op.iLike]: `%${query}%` } },
            { description: { [db.Sequelize.Op.iLike]: `%${query}%` } },
          ],
        },
      });
    },
    filterProducts: (parent, { category, minPrice, maxPrice }, { db }) => {
      let whereClause = {};
      if (category) {
        whereClause.category = category;
      }
      if (minPrice !== undefined || maxPrice !== undefined) {
        whereClause.price = {};
        if (minPrice !== undefined) {
          whereClause.price[db.Sequelize.Op.gte] = minPrice;
        }
        if (maxPrice !== undefined) {
          whereClause.price[db.Sequelize.Op.lte] = maxPrice;
        }
      }
      return db.Product.findAll({ where: whereClause });
    },
    me: (parent, args, { user, db }) => {
      if (!user) throw new Error('Not authenticated');
      return db.User.findByPk(user.userId);
    },
  },
  Mutation: {
    createProduct: (parent, args, { db }) => db.Product.create(args),
    signup: async (parent, { username, email, password }, { db }) => {
      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({ username, email, password: hashedPassword });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },
    login: async (parent, { email, password }, { db }) => {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        throw new Error('No user found with this email');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },
  },
};

module.exports = { typeDefs, resolvers };