import Joi from "joi";

export const destinationReview = Joi.object({
  id: Joi.number().required(),
  destination_id: Joi.number().required(),
  comment: Joi.string().max(1500).required(),
  review_by: Joi.string().max(1500).required(),
  ratings: Joi.valid(
    "sangat_buruk",
    "buruk",
    "cukup_baik",
    "baik",
    "sangat_baik"
  ),
});

