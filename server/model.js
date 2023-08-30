// Importing required modules
import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from 'url';
import util from 'util';
import bcrypt from 'bcrypt';

// Fetching or setting a default Database URI
const dbURI = process.env.DATABASE_URL || 'dbConnected';
const db = await connectToDB(dbURI); // Establishing database connection

// Defining the User Model
export class User extends Model {
  // Custom utility for inspecting the object, helpful for debugging
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// Initializing the User Model with its schema
User.init({
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  modelName: 'users',
  sequelize: db,
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

// Defining the Item Model
export class Item extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// Init the Item Model with its schema
Item.init({
  item_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  item_Name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  item_Definition: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  modelName: 'items',
  sequelize: db,
});

// Defining the Cart Model
export class Cart extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// Init the Cart Model with its schema
Cart.init({
  cart_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  product_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  modelName: 'cart',
  sequelize: db,
});

// Defining relationships between models
User.hasMany(Cart, {foreignKey: 'user_Id'});
Cart.belongsTo(User, {foreignKey: 'user_Id'});
Item.hasMany(Cart, {foreignKey: 'product_Id'});
Cart.belongsTo(Item, {foreignKey: 'product_Id'});

// Syncing the models with the database if this module is the entry point
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing the fetching Database...");
  await db.sync();
  console.log("Finished Syncing Database");
}

//exporting the models for other parts of the application
export { Cart, Item, User };