const Review = require("../models/review.model")
module.exports = {
     //GET -READ
     list(req, res){
        Review.find()
        .then((reviews) => {
            res.status(200).json({ message: "Reviews found", data: reviews });
        })
        .catch((err) => {
            res.status(404).json({ message: "Review not found" });
        });
    },
    //show ID
    show(req, res) {
        const { reviewId } = req.params;
    
        Review.findById(reviewId)
        .then((review) => {
            res.status(200).json({ message: "Review found", data: review });
        })
        .catch((err) => {
            res.status(404).json({ message: "Review not found" });
        });
    },


    //Create -POST
    create(req,res){
        const data =req.body;
        const newReview = {
            ...data,
            
        };

        Review.create(newReview)
        .then((review) => {
            res.status(201).json({ message: "Review created", data: review });
        })
        .catch((err) => {
            res
            .status(400)
            .json({ message: "Review could not be created", data: err });
        });
    },
    //Update PUT
    update(req, res){
        const { reviewId } = req.params;

    Review.findByIdAndUpdate(reviewId, req.body, { new: true })
    .then((review) => {
        res.status(200).json({ message: "Review updated", data: review });
    })
    .catch((err) => {
        res
        .status(400)
        .json({ message: "Review could not be updated", data: err });
    });
    },
    //Delete
    destroy(req, res) {
        const { reviewId } = req.params;
    
        Review.findByIdAndDelete(reviewId)
        .then((review) => {
            res.status(200).json({ message: "Review deleted", data: review });
        })
        .catch((err) => {
            res
            .status(400)
            .json({ message: "Review could not be deleted", data: err });
        });
    },
};