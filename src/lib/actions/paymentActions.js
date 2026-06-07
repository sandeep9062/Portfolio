"use server";

import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a Razorpay order
 * @param {Object} params - Order parameters
 * @param {number} params.amount - Amount in paise (e.g., 50000 for ₹500)
 * @param {string} params.currency - Currency code (default: INR)
 * @param {string} params.receipt - Receipt ID
 * @param {Object} params.notes - Additional notes
 * @returns {Promise<Object>} Order details
 */
export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
  notes = {},
}) {
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
      error: error.message || "Failed to create payment order",
    };
  }
}

/**
 * Verify Razorpay payment signature
 * @param {Object} params - Verification parameters
 * @param {string} params.razorpay_order_id - Order ID
 * @param {string} params.razorpay_payment_id - Payment ID
 * @param {string} params.razorpay_signature - Signature to verify
 * @returns {Promise<Object>} Verification result
 */
export async function verifyRazorpayPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) {
  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        success: false,
        error: "Missing payment verification parameters",
      };
    }

    // Create expected signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
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
      error: error.message || "Payment verification failed",
    };
  }
}

/**
 * Get payment details by ID
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<Object>} Payment details
 */
export async function getPaymentDetails(paymentId) {
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
      error: error.message || "Failed to fetch payment details",
    };
  }
}

/**
 * Create a refund for a payment
 * @param {Object} params - Refund parameters
 * @param {string} params.payment_id - Payment ID to refund
 * @param {number} params.amount - Amount to refund in paise (optional, full refund if not specified)
 * @param {string} params.notes - Refund notes
 * @returns {Promise<Object>} Refund details
 */
export async function createRefund({ payment_id, amount, notes = {} }) {
  try {
    if (!payment_id) {
      return {
        success: false,
        error: "Payment ID is required",
      };
    }

    const options = { notes };
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
      error: error.message || "Failed to create refund",
    };
  }
}

/**
 * Get all orders (for admin)
 * @param {Object} params - Query parameters
 * @param {number} params.count - Number of orders to fetch
 * @param {number} params.skip - Number of orders to skip
 * @returns {Promise<Object>} Orders list
 */
export async function getOrders({ count = 10, skip = 0 } = {}) {
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
      error: error.message || "Failed to fetch orders",
    };
  }
}
