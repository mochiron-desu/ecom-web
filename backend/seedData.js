require('dotenv').config();
const db = require('./models');

const seedProducts = [
  {
    name: "Organic Bananas",
    description: "Fresh, organic bananas. Bunch of 5-7.",
    price: 1.99,
    category: "Fruits"
  },
  {
    name: "Whole Milk",
    description: "1 gallon of fresh whole milk.",
    price: 3.49,
    category: "Dairy"
  },
  {
    name: "Whole Wheat Bread",
    description: "Freshly baked whole wheat bread. 1 loaf.",
    price: 2.99,
    category: "Bakery"
  },
  {
    name: "Chicken Breast",
    description: "Boneless, skinless chicken breast. 1 lb package.",
    price: 5.99,
    category: "Meat"
  },
  {
    name: "Romaine Lettuce",
    description: "Crisp romaine lettuce. 1 head.",
    price: 1.79,
    category: "Vegetables"
  },
  {
    name: "Cheddar Cheese",
    description: "Sharp cheddar cheese. 8 oz block.",
    price: 3.99,
    category: "Dairy"
  },
  {
    name: "Tomatoes",
    description: "Ripe red tomatoes. 4 pack.",
    price: 2.49,
    category: "Vegetables"
  },
  {
    name: "Greek Yogurt",
    description: "Plain Greek yogurt. 32 oz container.",
    price: 4.99,
    category: "Dairy"
  },
  {
    name: "Pasta",
    description: "Penne pasta. 16 oz box.",
    price: 1.49,
    category: "Pantry"
  },
  {
    name: "Olive Oil",
    description: "Extra virgin olive oil. 16.9 fl oz bottle.",
    price: 7.99,
    category: "Pantry"
  }
];

async function seedDatabase() {
  try {
    await db.sequelize.sync({ force: true }); // This will drop the table if it exists
    await db.Product.bulkCreate(seedProducts);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();