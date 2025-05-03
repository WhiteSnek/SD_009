import { config } from "dotenv";

config( { path: `.env` } );

export const { 
    PORT, NODE_ENV,
    ACECLOUDAPI_BASE_URL,
    ARCJET_ENV, ARCJET_KEY
} = process.env