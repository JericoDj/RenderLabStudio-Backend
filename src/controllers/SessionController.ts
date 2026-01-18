import { Request, Response } from 'express';
import Session from '../models/Session';

// CRUD
export const createSession = async (req: Request, res: Response) => {
    try {
        const session = await Session.create(req.body);
        res.status(201).json(session);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllSessions = async (req: Request, res: Response) => {
    try {
        const sessions = await Session.find().populate('user');
        res.json(sessions);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSession = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id).populate('user');
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.json(session);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSession = async (req: Request, res: Response) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(session);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSession = async (req: Request, res: Response) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.json({ message: 'Session deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Preferences
export const getPreferences = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });
        res.json(session.preferences);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePreferences = async (req: Request, res: Response) => {
    try {
        // Expecting body to have { video: {...}, image: {...}, chat: {...} } or partial
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        if (req.body.video) session.preferences.video = { ...session.preferences.video, ...req.body.video };
        if (req.body.image) session.preferences.image = { ...session.preferences.image, ...req.body.image };
        if (req.body.chat) session.preferences.chat = { ...session.preferences.chat, ...req.body.chat };

        // Mongoose maps need to be marked modified if nested objects change or if using mixed type in certain ways
        session.markModified('preferences');
        await session.save();
        res.json(session.preferences);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePreferences = async (req: Request, res: Response) => {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        session.preferences = { video: {}, image: {}, chat: {} };
        session.markModified('preferences');
        await session.save();
        res.json({ message: 'Preferences reset' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
