/**
 * Read a required environment variable.
 *
 * Fails fast with a helpful message when the variable is missing instead of
 * letting downstream libraries throw confusing errors.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Please define the ${name} environment variable inside .env.local`,
    );
  }
  return value;
}
