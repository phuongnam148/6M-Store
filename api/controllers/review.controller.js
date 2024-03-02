import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Product from "../models/product.model.js";


export const createReview = async (req, res, next) => {
    try {
        if (req.isSeller)
            return next(createError(403, "Sellers can't create a review!"))

        const newReview = new Review({
            userID: req.userID,
            productID: req.body.productID,
            desc: req.body.desc,
            star: req.body.star,
        })

        try {
            const review = await Review.findOne({
                userID: req.userID,
                productID: req.body.productID,
            })
            if (review) return next(createError(403, "You have already created a review for this product!"));

            const savedReview = await newReview.save()

            await Product.findByIdAndUpdate(req.body.productID, { $inc: { totalStars: req.body.star, starNumber: 1 } })

            res.status(201).send(savedReview)


        } catch (error) {
            next(error)
        }

    } catch (error) {
        next(error);
    }

}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ productID: req.params.productID })
        res.status(200).send(reviews)
    } catch (error) {
        next(error);
    }
}

export const deleteReview = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
    res.send("test")
}