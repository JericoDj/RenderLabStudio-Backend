import { Router } from 'express';
import * as ImageController from '../controllers/ImageController';
import * as VideoController from '../controllers/VideoController';

const router = Router();

// Images
router.post('/images', ImageController.createImage);
router.get('/images', ImageController.getAllImages);
router.get('/images/user/:userId', ImageController.getImagesByUser);
router.get('/images/album/:albumId', ImageController.getImagesByAlbum);
router.get('/images/:id', ImageController.getImage);
router.put('/images/:id', ImageController.updateImage);
router.delete('/images/:id', ImageController.deleteImage);

// Videos
router.post('/videos', VideoController.createVideo);
router.get('/videos', VideoController.getAllVideos);
router.get('/videos/user/:userId', VideoController.getVideosByUser);
router.get('/videos/album/:albumId', VideoController.getVideosByAlbum);
router.get('/videos/:id', VideoController.getVideo);
router.put('/videos/:id', VideoController.updateVideo);
router.delete('/videos/:id', VideoController.deleteVideo);

export default router;
