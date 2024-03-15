import Joi from "joi";

export const destinationReviewValidation = Joi.object({
  destination_id: Joi.number().required(),
  comment: Joi.string().max(1500).required(),
  review_by: Joi.string().email().max(1500).required(),
  ratings: Joi.valid(
    "sangat_buruk",
    "buruk",
    "cukup_baik",
    "baik",
    "sangat_baik"
  ).required(),
});

export const updateDestinationReviewValidation = Joi.object({
  id: Joi.number().required(),
  comment: Joi.string().max(1500).optional(),
  ratings: Joi.valid(
    "sangat_buruk",
    "buruk",
    "cukup_baik",
    "baik",
    "sangat_baik"
  ).optional(),
});
