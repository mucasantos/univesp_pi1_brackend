const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../configs/connect");

const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    price: {
      type: "MONEY",
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Supply = sequelize.define(
  "supply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const ProductSupply = sequelize.define(
  "product_supply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    supply_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supply,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 50,
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  Product,
  Supply,
  ProductSupply,
};
