'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.allRoutes = undefined;

var _express = require('express');

var _main = require('../controllers/main.controller');

var mainController = _interopRequireWildcard(_main);

var _misc = require('../controllers/misc.controller');

var miscController = _interopRequireWildcard(_misc);

var _authentication = require('../middlewares/authentication');

var PrototypeAuth = _interopRequireWildcard(_authentication);

var _ufs = require('../controllers/ufs');

var demosController = _interopRequireWildcard(_ufs);

var _constants = require('../config/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//
const router = (0, _express.Router)();

/* Mount Authorisation to all prototype paths when in Prod.
   Requires credentials to match those in in Heroku env settings
*/
if (!(0, _constants.isDevelopment)()) {
   router.get('/prototypes*', PrototypeAuth.authenticationMiddleware);
}

// Misc routes
router.get('/robots.txt', mainController.robots);
router.get('/', mainController.index);

// API Routes
// router.post('/api/v1/recalls', recallsController.recalls);

/* *************************************************************** *

    UFS ROUTES AND CONTROLLERS

 * *************************************************************** */

// Tiny MCE demo Introducer stuff (this is the noddy journey with the 0-10 scoring drop down)
router.get('/prototypes/example-journey/introducer', demosController.tinyMCEGet);
router.post('/prototypes/example-journey/introducer', demosController.tinyMCEPost);
router.get('/prototypes/example-journey/introducer/view', demosController.tinyMCEViewGet);

// Tiny MCE demo case for support
router.get('/prototypes/example-journey/application', demosController.tinyMCEApplicationIndexGet);
router.get('/prototypes/example-journey/application/start', demosController.tinyMCEApplicationGet);
router.post('/prototypes/example-journey/application/start', demosController.tinyMCEApplicationPost);
router.get('/prototypes/example-journey/application/view', demosController.tinyMCEApplicationViewGet);

// upload script
router.get('/prototypes/uploadStuff', demosController.uploadStuffGet);
router.post('/prototypes/uploadStuff', demosController.uploadStuffPost);

// JWT
router.get('/prototypes/jwt', demosController.JWTGet);
router.post('/prototypes/jwt', demosController.JWTPost);

// Embedded PDF
router.get('/prototypes/example-journey/embedded-pdf', demosController.embeddedPDFGet);
router.post('/prototypes/example-journey/embedded-pdf', demosController.embeddedPDFPost);
router.get('/prototypes/example-journey/embedded-pdf/view', demosController.embeddedPDFViewGet);

router.get('/prototypes/example-journey/embedded-pdf/start', demosController.embeddedPDFStartGet);
router.post('/prototypes/example-journey/embedded-pdf/start', demosController.embeddedPDFStartPost);
// router.get('/prototypes/example-journey/embedded-pdf/start-uploaded', demosController.embeddedPDFStartGet);
// router.post('/prototypes/example-journey/embedded-pdf/start-uploaded', demosController.embeddedPDFStartPost);
router.get('/prototypes/example-journey/embedded-pdf/view-pdf', demosController.embeddedPDFViewPDFGet);

// Create route from view path
router.get('*', miscController.viewFileRoute);

// MOT history vehicle type
// router.post('/prototypes/mot-history-data/cvs/what-vehicle', mothController.postMothType);

const allRoutes = exports.allRoutes = router;