"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import { requireEnv } from "@/lib/env";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: requireEnv("RAZORPAY_KEY_ID"),
  key_secret: requireEnv("RAZORPAY_KEY_SECRET"),
});

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

interface OrderParams {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

/**
 * Create a Razorpay order
 * @param params.amount - Amount in paise (e.g., 50000 for ₹500)
 * @param params.currency - Currency code (default: INR)
 * @param params.receipt - Receipt ID
 * @param params.notes - Additional notes
 */
export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
  notes = {},
}: OrderParams) {
  try {
    if (!amount || amount <= 0) {
      return {
        success: false,
        error: "Valid amount is required",
      };
    }

    const options = {
      amount: Math.round(amount), // Amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes,
    };

    const order = await razorpay.orders.create(options);

    return {
      success: true,
      data: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      },
    };
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to create payment order"),
    };
  }
}

interface PaymentVerificationParams {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Verify Razorpay payment signature
 */
export async function verifyRazorpayPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: PaymentVerificationParams) {
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        success: false,
        error: "Missing payment verification parameters",
      };
    }

    // Create expected signature
    const generatedSignature = crypto
      .createHmac("sha256", requireEnv("RAZORPAY_KEY_SECRET"))
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return {
        success: false,
        error: "Invalid payment signature",
      };
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    return {
      success: true,
      data: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        order_id: payment.order_id,
        captured: payment.captured,
        created_at: payment.created_at,
      },
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    return {
      success: false,
      error: errorMessage(error, "Payment verification failed"),
    };
  }
}

/**
 * Get payment details by ID
 * @param paymentId - Razorpay payment ID
 */
export async function getPaymentDetails(paymentId: string) {
  try {
    if (!paymentId) {
      return {
        success: false,
        error: "Payment ID is required",
      };
    }

    const payment = await razorpay.payments.fetch(paymentId);

    return {
      success: true,
      data: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        order_id: payment.order_id,
        captured: payment.captured,
        created_at: payment.created_at,
        email: payment.email,
        contact: payment.contact,
      },
    };
  } catch (error) {
    console.error("Get payment details error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to fetch payment details"),
    };
  }
}

interface RefundParams {
  payment_id: string;
  amount?: number;
  notes?: Record<string, string>;
}

/**
 * Create a refund for a payment
 * @param params.payment_id - Payment ID to refund
 * @param params.amount - Amount to refund in paise (optional, full refund if not specified)
 * @param params.notes - Refund notes
 */
export async function createRefund({
  payment_id,
  amount,
  notes = {},
}: RefundParams) {
  try {
    if (!payment_id) {
      return {
        success: false,
        error: "Payment ID is required",
      };
    }

    const options: { notes: Record<string, string>; amount?: number } = {
      notes,
    };
    if (amount) {
      options.amount = Math.round(amount);
    }

    const refund = await razorpay.payments.refund(payment_id, options);

    return {
      success: true,
      data: {
        id: refund.id,
        amount: refund.amount,
        status: refund.status,
        payment_id: refund.payment_id,
        created_at: refund.created_at,
      },
    };
  } catch (error) {
    console.error("Refund creation error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to create refund"),
    };
  }
}

/**
 * Get all orders (for admin)
 * @param params.count - Number of orders to fetch
 * @param params.skip - Number of orders to skip
 */
export async function getOrders({
  count = 10,
  skip = 0,
}: { count?: number; skip?: number } = {}) {
  try {
    const orders = await razorpay.orders.all({ count, skip });

    return {
      success: true,
      data: orders.items.map((order) => ({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
      })),
    };
  } catch (error) {
    console.error("Get orders error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to fetch orders"),
    };
  }
}
