const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const LifelineController = require('../controllers/lifeline.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});  
  
router.post(    '/users',           UserController.create);                                                     // C
router.get(     '/users',            UserController.get);        // R
router.put(     '/users',            UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);
router.put(     '/users/:id',            UserController.updateUser);
router.post(    '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.create);                  // C
router.get(     '/companies',             passport.authenticate('jwt', {session:false}), CompanyController.getAll);                  // R

router.get(     '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.get);     // R
router.put(     '/companies/:company_id',  custom.company, CompanyController.update);  // U
router.delete(  '/companies/:company_id', passport.authenticate('jwt', {session:false}), custom.company, CompanyController.remove);  //


  

router.post(    '/lifeline',              LifelineController.create);                  
router.get(     '/lifelines',             LifelineController.getAll);

router.get(     '/lifeline/:lifeline_id',  custom.lifeline, LifelineController.get);
router.put(     '/lifeline/:lifeline_id',  custom.lifeline, LifelineController.update);
router.delete(  '/lifeline/:lifeline_id', passport.authenticate('jwt', {session:false}), custom.lifeline, LifelineController.remove);  

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
