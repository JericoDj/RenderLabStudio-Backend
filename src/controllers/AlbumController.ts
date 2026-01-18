import { Request, Response } from 'express';
import Album from '../models/Album';

export const createAlbum = async (req: Request, res: Response) => {
    try {
        const album = await Album.create(req.body);
        res.status(201).json(album);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find().populate('user');
        res.json(albums);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAlbum = async (req: Request, res: Response) => {
    try {
        const album = await Album.findById(req.params.id).populate('user');
        if (!album) return res.status(404).json({ message: 'Album not found' });
        res.json(album);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAlbumsByUser = async (req: Request, res: Response) => {
    try {
        const albums = await Album.find({ user: req.params.userId });
        res.json(albums);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAlbum = async (req: Request, res: Response) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(album);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAlbum = async (req: Request, res: Response) => {
    try {
        await Album.findByIdAndDelete(req.params.id);
        res.json({ message: 'Album deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
