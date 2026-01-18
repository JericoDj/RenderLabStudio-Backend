import { Request, Response } from 'express';
import * as AIService from '../services/AIService';
import Session from '../models/Session';
import Message from '../models/Message';

export const improvePrompt = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

        const improved = await AIService.improvePrompt(prompt);
        res.json({ improvedPrompt: improved });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const chat = async (req: Request, res: Response) => {
    try {
        const { sessionId, prompt, modelProp } = req.body; // modelProp: 'openai' | 'gemini'
        // 'modelProp' to avoid conflict with mongoose 'model' query

        if (!sessionId || !prompt) return res.status(400).json({ message: 'Session ID and prompt are required' });

        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        // 1. Preference Middleware Logic: Check and Update Preferences
        const updatedPrefs = await AIService.analyzePreferenceChange(prompt, session.preferences);

        if (updatedPrefs) {
            // Update session preferences
            if (updatedPrefs.video) session.preferences.video = { ...session.preferences.video, ...updatedPrefs.video };
            if (updatedPrefs.image) session.preferences.image = { ...session.preferences.image, ...updatedPrefs.image };
            if (updatedPrefs.chat) session.preferences.chat = { ...session.preferences.chat, ...updatedPrefs.chat };
            session.markModified('preferences');
            await session.save();
            console.log("Preferences updated based on prompt analysis.");
        }

        // 2. Generate Response
        // We might want to inject preferences into the final prompt context
        const contextPrompt = `
        Context: You are an AI assistant.
        User Preferences: ${JSON.stringify(session.preferences)}
        User Message: ${prompt}
        `;

        let responseText = '';
        if (modelProp === 'gemini') {
            responseText = await AIService.generateWithGemini(contextPrompt);
        } else {
            // Default to OpenAI
            responseText = await AIService.generateWithOpenAI(contextPrompt) || '';
        }

        // 3. Save Message
        // Log user message
        await Message.create({
            session: sessionId,
            user: session.user,
            role: 'user',
            content: prompt
        });

        // Log AI response
        const aiMessage = await Message.create({
            session: sessionId,
            user: session.user, // Linking AI response to user as requested "each message linked to user"
            role: 'assistant',
            content: responseText
        });

        res.json({
            response: responseText,
            preferencesUpdated: !!updatedPrefs,
            preferences: session.preferences
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export const signalCheck = async (req: Request, res: Response) => {
    try {
        const { sessionId, prompt } = req.body;
        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({ message: 'Session not found' });

        const updatedPrefs = await AIService.analyzePreferenceChange(prompt, session.preferences);
        res.json({
            signal: !!updatedPrefs,
            suggestedChanges: updatedPrefs
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
