import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const db = process.env.DB;
export const secret = process.env.JWT_SECRET;
export const client = process.env.CLIENT_BASE_URL;
