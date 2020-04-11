const express = require('express');
const router = express.Router();

const LandingController = require('../controllers/Landing.controller');

router.get("/", LandingController.getIndex);
router.get('/about-us', LandingController.getAbout);
router.get('/faq', LandingController.getFaq);
router.get('/privacy-policy', LandingController.getPrivacy);
router.get('/terms-of-use', LandingController.getTerms);
router.get('/cancellation-policy', LandingController.getCancellation);
router.get('/contact-us', LandingController.getContact)
router.post('/contact-us', LandingController.postContact)

router.get('/buy-car/:id', LandingController.getCar);
router.post("/buy-car/:id/book-drive", LandingController.bookDrive);
router.post('/buy-car/:id/check-avail', LandingController.checkAvail);
router.post('/buy-car/:id/ship-quote', LandingController.shipQuote);

module.exports = router;