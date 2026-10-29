import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

/**
 * One document per message submission attempt, keyed by client IP and
 * auto-stamped with `createdAt` (via the schema's timestamps option). A TTL
 * index removes records older than the rate-limit window so the collection
 * stays bounded. The rate-limit decision itself uses a time-based query, so
 * it is correct even before the TTL index has been created.
 */
const WINDOW_SEC = Math.floor(
  (Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000) / 1000,
);

export interface IRateLimit extends Document {
  ip: string;
}

const rateLimitSchema = new mongoose.Schema<IRateLimit>(
  {
    ip: { type: String, required: true, index: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

// Auto-expire records after the rate-limit window (background cleanup).
rateLimitSchema.index({ createdAt: 1 }, { expireAfterSeconds: WINDOW_SEC });

const RateLimit: Model<IRateLimit> =
  (mongoose.models.RateLimit as Model<IRateLimit>) ||
  mongoose.model<IRateLimit>("RateLimit", rateLimitSchema);

export default RateLimit;
