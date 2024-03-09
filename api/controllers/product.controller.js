import Product from "../models/product.model.js";
import createError from "../utils/createError.js";

export const createProduct = async (req, res, next) => {
  // if (!req.isSeller)
  //   return next(createError(403, "Only admin can create product!"));
  const prod = await Product.findOne({ id: req.body.id });
  if (prod) {
    return next(createError(403, "ID Product already exists!"));
  }

  const newProduct = new Product({
    ...req.body,
  });

  try {
    const saveProduct = await newProduct.save();
    res.status(201).json(saveProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    // const product = await Product.findById(req.params.id);
    // console.log("🚀 ~ deleteProduct ~ product:", product)
    // if (product.userID !== req.userID)
    //   return next(createError(403, "You can delete only your product!"));

    await Product.deleteOne({ id: req.params.id });
    res.status(200).send("Product has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) next(createError(404, "Product not found"));

    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  const query = req.query;
  const filters = {
    ...(query.category && { category: query.category }),
    ...(query.userID && { userID: query.userID }),
    ...((query.min || query.max) && {
      price: {
        ...(query.min && { $gt: query.min }),
        ...(query.max && { $lt: query.max }),
      },
    }),
    ...(query.search && { title: { $regex: query.search, $options: "i" } }), // options i để search cả lowercase và uppercase
  };
  try {
    const products = await Product.find(filters).sort({ [query.sort]: -1 });
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};
