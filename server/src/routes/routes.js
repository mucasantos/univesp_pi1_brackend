const { Router } = require("express");
const jwt = require("jsonwebtoken");

const { QueryTypes } = require("sequelize");

const {
  sequelize,
  Product,
  Supply,
  ProductSupply,
} = require("../models/models");

const routes = new Router();

routes.get("/status", (req, res) => {
  res.send({ message: "Server is running" });
});

routes.get("/db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send({ message: "Connection has been established successfully." });
  } catch (error) {
    res.send({ message: "Unable to connect to the database:", error });
  }
});

routes.post("/login", (req, res) => {
  const privateKey = "@frexco-token";

  const { name, password } = req.body;
  if (name === "admin" && password === "admin") {
    const userData = {
      name: "admin",
      password: "admin",
    };

    jwt.sign(userData, privateKey, (err, token) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

        return;
      }

      res.status(200).send({ token: token });
      res.end();
    });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Products CRUD

routes.get("/products", async (req, res) => {
  const products = await Product.findAll();

  res.send(products);
});

routes.post("/products", async (req, res) => {
  const { name, category, price, measure } = req.body;
  try {
    const product = await Product.create({
      name: name,
      category: category,
      price: price,
      measure: measure,
    });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Erro ao criar o produto", error });
  }
});

routes.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, price, measure } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send({ message: "Produto não encontrado" });
      return;
    }

    await product.update({
      name: name,
      category: category,
      price: price,
      measure: measure,
    });

    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o produto", error });
  }
});

routes.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send({ message: "Produto não encontrado" });
      return;
    }

    await product.destroy();

    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar o produto", error });
  }
});

// Supplies CRUD

routes.get("/supplies", async (req, res) => {
  const supplies = await Supply.findAll();

  res.send(supplies);
});

routes.post("/supplies", async (req, res) => {
  const { name, city, state } = req.body;

  try {
    const supply = await Supply.create({
      name: name,
      city: city,
      state: state,
    });
    res.send(supply);
  } catch (error) {
    res.status(500).send({ message: "Erro ao criar o estoque", error });
  }
});

routes.put("/supplies/:id", async (req, res) => {
  const { id } = req.params;
  const { name, city, state } = req.body;

  try {
    const supply = await Supply.findByPk(id);

    if (!supply) {
      res.status(404).send({ message: "Estoque não encontrado" });
      return;
    }

    await supply.update({
      name: name,
      city: city,
      state: state,
    });

    res.send(supply);
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o estoque", error });
  }
});

routes.delete("/supplies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const supply = await Supply.findByPk(id);

    if (!supply) {
      res.status(404).send({ message: "Estoque não encontrado" });
      return;
    }

    await supply.destroy();

    res.send(supply);
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar o estoque", error });
  }
});

routes.get("/productsupplies", async (req, res) => {
  const productSupplies = await sequelize.query(
    `SELECT product_supply.id as id, product_id, supply_id, amount, product_supply.measure as product_supply_measure, supply_id ,supply.name as supply_name, state, city, product_id, product.name as product_name, product.category as product_category, price, product.measure as product_measure
    FROM product_supply
    join supply on supply_id=supply.id
    join product on product_id = product.id
    ORDER BY supply_id ASC;`,
    { type: QueryTypes.SELECT }
  );

  res.send(productSupplies);
});

routes.post("/productsupplies", async (req, res) => {
  const { selectedProduct, selectedSupply, amount, measure } = req.body;

  try {
    const productSupply = await ProductSupply.create({
      product_id: selectedProduct,
      supply_id: selectedSupply,
      amount: amount,
      measure: measure,
    });
    res.send(productSupply);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao criar o produto no estoque", error });
  }
});

routes.put("/productsupplies/:id", async (req, res) => {
  const { id } = req.params;
  const { selectedProduct, selectedSupply, amount, measure } = req.body;

  try {
    const productSupply = await ProductSupply.findByPk(id);

    if (!productSupply) {
      res.status(404).send({ message: "Produto no estoque não encontrado" });
      return;
    }

    await productSupply.update({
      product_id: selectedProduct,
      supply_id: selectedSupply,
      amount: amount,
      measure: measure,
    });

    res.send(productSupply);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar o produto no estoque", error });
  }
});

routes.delete("/productsupplies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productSupply = await ProductSupply.findByPk(id);

    if (!productSupply) {
      res.status(404).send({ message: "Produto no estoque não encontrado" });
      return;
    }

    await productSupply.destroy();

    res.send(productSupply);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao deletar o produto no estoque", error });
  }
});

module.exports = routes;
