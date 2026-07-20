import * as joi from 'joi';
import 'dotenv/config';

interface EnvVars {
    PORT: number;
    PRODUCT_SERVICE_HOST: string;
    PRODUCT_SERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_HOST: joi.string().required(),
    PRODUCT_SERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate( process.env )
if( error ){
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    producthost: envVars.PRODUCT_SERVICE_HOST,
    productport: envVars.PRODUCT_SERVICE_PORT,
}