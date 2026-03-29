import Razorpay from 'razorpay';
import crypto from 'crypto';
import Drive from '../models/Drive.js';

// Initialize razorpay instance
// Assumes you pass these in .env when running
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder'
    });
};

// @desc    Create Razorpay Order
// @route   POST /api/payment/orders
// @access  Public
export const createOrder = async (req, res) => {
    try {
        const instance = getRazorpayInstance();

        const { amount, driveId } = req.body;

        const options = {
            amount: amount * 100, // amount in smallest currency unit (paise)
            currency: 'INR',
            receipt: `receipt_order_${driveId}_${Date.now()}`
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send('Some error occured');
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            driveId,
            amount
        } = req.body;

        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder');
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpaySignature)
            return res.status(400).json({ message: 'Transaction not legit!' });
        
        // Update Drive amountRaised
        const drive = await Drive.findById(driveId);
        if (drive) {
            drive.amountRaised += Number(amount);
            await drive.save();
        }

        res.json({
            message: 'Payment successful',
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
