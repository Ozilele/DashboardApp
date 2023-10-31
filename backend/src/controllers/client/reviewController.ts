import { Request, Response } from "express";
import { review_model as ReviewModel } from "../../model/reviewModel.js";
import { Review, Req } from "../../types/types.js";

export const getReviews = async (req: Request, res: Response) => {
  const hotelID: string = req.query.hotelID as string || "";
  const section: number = parseInt(req?.query?.section as string) - 1 || 0;
  const limitReviews: number = parseInt(req?.query?.limit as string) || 5;

  let totalReviews : number;
  try {
    const reviews : Review[] = await ReviewModel.find({ hotel: hotelID }).skip(section * limitReviews).limit(limitReviews).populate({ path: "author", select: "-password -email" });
    if(reviews) {
      totalReviews = await ReviewModel.countDocuments({
        hotel: hotelID
      });
      console.log(totalReviews);
      if(totalReviews == 0) {
        return res.status(200).json({
          message: "No reviews found",
          allReviews: 0,  
        });
      }
      return res.status(200).json({
        message: "Reviews found",
        reviews,
        allReviews: totalReviews
      }); 
    } else {
      return res.status(404).json({
        message: "Error getting the reviews"
      });
    }
  }
  catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const didUserPostHotelReview = async (req: Req, res: Response) => {
  const hotelID: string = req.query.hotelID as string || "";
  const userID: string = req?.user?._id.toString();

  const userReviewOfHotel: Review | null = await ReviewModel.findOne({ author: userID, hotel: hotelID }).lean();
  console.log(userReviewOfHotel);
  if(userReviewOfHotel) {
    return res.status(200).json({
      review: userReviewOfHotel
    });
  }
  return res.sendStatus(204); // No content
}

export const postReview = async (req: Req, res: Response) => {
  const hotelID: string = req.body.hotelID as string;
  const rating: number = req.body.rating as number;
  const content: string = req.body.content as string;
  const userID: string = req?.user?._id.toString();

  if(hotelID && rating && userID) {
    try {
      const review : Review = await ReviewModel.create({
        rating,
        content,
        hotel: hotelID,
        author: userID,
      });
      if(review) {
        return res.status(201).json({
          message: "Successfully added new review"
        });
      } else {
        return res.status(404).json({
          message: "New review not added"
        });
      }
    } catch(err) {
      return res.status(404).json({
        message: "New review not added"
      });
    }
  }
  return res.status(500).json({
    message: "Network error"
  });
}
