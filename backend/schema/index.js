const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  }

  type Mutation {
    createProduct(name: String!, description: String, price: Float!, category: String!): Product
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
  },
  Mutation: {
    createProduct: (parent, args, { db }) => db.Product.create(args),
  },
};

module.exports = { typeDefs, resolvers };