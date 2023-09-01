// Importing required modules
import { DataTypes, Model } from 'sequelize';
import connectToDB from './db.js';
import url from 'url';
import util from 'util';
import bcrypt from 'bcrypt';

export const db = await connectToDB('postgresql:///gumbo_db');

// Defining the User Model
export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

// Init the User Model
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

// Init the Item Model
Item.init({
  item_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  item_Name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  item_Definition: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
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

// Init the Cart Model
Cart.init({
  cart_Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
}, {
  modelName: 'cart',
  sequelize: db,
});

User.hasMany(Cart, {foreignKey: 'user_Id'});
Cart.belongsTo(User, {foreignKey: 'user_Id'});
Item.hasMany(Cart, {foreignKey: 'product_Id'});
Cart.belongsTo(Item, {foreignKey: 'product_Id'});

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing the fetching Database...");
  await db.sync();
  console.log("Finished Syncing Database");
}