import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render("index");
});
  
router.get('/about', (req, res) => {
    res.render("about_view");
});

router.get('/paths', (req, res) => {
    res.render("paths_view");
});

router.get('/profile', (req, res) => {
    res.render("profile_view");
});

export default router;