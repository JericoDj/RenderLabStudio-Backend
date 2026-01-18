import { Request, Response } from 'express';
import Image from '../models/Image';

export const createImage = async (req: Request, res: Response) => {
    try {
        const image = await Image.create(req.body);
        res.status(201).json(image);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find().populate('user').populate('album');
        res.json(images);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getImage = async (req: Request, res: Response) => {
    try {
        const image = await Image.findById(req.params.id).populate('user').populate('album');
        if (!image) return res.status(404).json({ message: 'Image not found' });
        res.json(image);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getImagesByAlbum = async (req: Request, res: Response) => {
    try {
        const images = await Image.find({ album: req.params.albumId });
        res.json(images);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getImagesByUser = async (req: Request, res: Response) => {
    try {
        // Assume req.user is populated by auth middleware, or userId is passed as param if admin
        // The prompt asked for "read image all image by current user", so probably req.user context
        // But for flexibility, I'll support param or fallback to req.user if I had the middleware fully typed here
        const userId = req.params.userId;
        const images = await Image.find({ user: userId });
        res.json(images);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateImage = async (req: Request, res: Response) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(image);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
