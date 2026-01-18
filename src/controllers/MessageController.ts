import { Request, Response } from 'express';
import Message from '../models/Message';

export const createMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.create(req.body);
        res.status(201).json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find().populate('user').populate('session');
        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.findById(req.params.id).populate('user');
        if (!message) return res.status(404).json({ message: 'Message not found' });
        res.json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMessage = async (req: Request, res: Response) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
