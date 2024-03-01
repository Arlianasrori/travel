import nodemailer from "nodemailer";

export const nodeMailer = nodemailer.createTransport({
  service : "gmail",
  host: "arlianasrori@gmail.com",
  auth: {
    user: "arlianasrori@gmail.com",
    pass: "ilfz mfhx ahkx jnyo",
  },
});