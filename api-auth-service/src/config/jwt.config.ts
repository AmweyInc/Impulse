import { registerAs } from "@nestjs/config";

export default registerAs('JWT',() => ({
    key: process.env.JWT_KEY,
    expiresIn: process.env.JWT_EXPIRES,
}))