import { Router } from 'express';
import * as AIController from '../controllers/AIController';

const router = Router();

router.post('/improve-prompt', AIController.improvePrompt);
router.post('/chat', AIController.chat);
router.post('/signal', AIController.signalCheck);

// Preference endpoints specific to AI context if distinct from session routes
// However, I mapped them nicely in session routes. 
// "create json image preference format for each conversation" -> this is handled via Session updates or the chat flow.
// I will adhere to the prompt's request for specific route path structure if implied, but /chat handling logic covers the dynamic updates.
// The user asked for "post method- create json image preference format for each conversation".
// If they want a dedicated AI-ish endpoint for it:
// router.post('/preferences', ... ) -> creates/updates prefs.
// I'll stick to the Session routes for direct preference manipulation as it's cleaner Restful design.

export default router;
