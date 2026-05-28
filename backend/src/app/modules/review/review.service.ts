import { ITokenPayload } from "../../../interfaces/token";
import { IReviewPayload } from "./review.interface";
import { Review } from "./review.model";
const createReview = async (payload: IReviewPayload, token: ITokenPayload) => {
  const result = await Review.create({
    ...payload,
    userId: token._id,
  });
  return result;
};
const getPublishedReviews = async () => {
  const result = await Review.find({
    isPublished: true,
  }).sort({ sortOrder: 1, createdAt: -1 });
  return result;
};
const getPendingReviews = async () => {
  const result = await Review.find({
    isPublished: false,
  }).sort({ createdAt: -1 });
  return result;
};
const approveReview = async (id: string) => {
  const result = await Review.findByIdAndUpdate(
    id,
    {
      isPublished: true,
    },
    {
      new: true,
    }
  );
  return result;
};
export const ReviewService = {
  createReview,
  getPublishedReviews,
  getPendingReviews,
  approveReview,
};
