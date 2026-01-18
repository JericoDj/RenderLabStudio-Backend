import { Request, Response } from 'express';
import Payment from '../models/Payment';

export const createPayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await Payment.find().populate('user').populate('plan');
        res.json(payments);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('user').populate('plan');
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.json(payment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePayment = async (req: Request, res: Response) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(payment);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePayment = async (req: Request, res: Response) => {
    try {
        await Payment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Payment deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
