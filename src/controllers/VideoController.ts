import { Request, Response } from 'express';
import Video from '../models/Video';

export const createVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.create(req.body);
        res.status(201).json(video);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find().populate('user').populate('album');
        res.json(videos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.findById(req.params.id).populate('user').populate('album');
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getVideosByAlbum = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find({ album: req.params.albumId });
        res.json(videos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getVideosByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const videos = await Video.find({ user: userId });
        res.json(videos);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(video);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req: Request, res: Response) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.json({ message: 'Video deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
