import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_must_be_long_enough_32_chars";
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Signs a payload and returns a JWT token.
 * @param {object} payload - The payload to encrypt in the JWT.
 * @returns {Promise<string>} The signed JWT token.
 */
export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secretKey);
}

/**
 * Verifies a JWT token and returns the decrypted payload.
 * @param {string} token - The token to verify.
 * @returns {Promise<object|null>} The payload or null if verification fails.
 */
export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    // Return null on verification error (expired, invalid signature, etc.)
    return null;
  }
}
