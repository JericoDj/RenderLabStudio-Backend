import { Router } from 'express';
import * as AlbumController from '../controllers/AlbumController';

const router = Router();

router.post('/', AlbumController.createAlbum);
router.get('/', AlbumController.getAllAlbums);
router.get('/user/:userId', AlbumController.getAlbumsByUser);
router.get('/:id', AlbumController.getAlbum);
router.put('/:id', AlbumController.updateAlbum);
router.delete('/:id', AlbumController.deleteAlbum);

export default router;
