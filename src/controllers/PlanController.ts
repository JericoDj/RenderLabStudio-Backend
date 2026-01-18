import { Request, Response } from 'express';
import Plan from '../models/Plan';

export const createPlan = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.create(req.body);
        res.status(201).json(plan);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllPlans = async (req: Request, res: Response) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPlan = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePlan = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(plan);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deletePlan = async (req: Request, res: Response) => {
    try {
        await Plan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Plan deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
