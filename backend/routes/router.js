const express = require(`express`);
const router = express.Router();
const controller = require(`../controller/controller`);
const authenticate = require(`../services/authenticate`);

router.post(`/auth/login`, authenticate.generateToken);
router.post(`/auth/signup`, authenticate.createUser);

// API section => controlling data in server via api
router.get(`/api/weather`, controller.weather);
router.get(`/api/get-savesdata/:id`, controller.getSavesData);

router.post(`/api/add-savedata/:id`, controller.addSaveData);

router.put(`/api/update-savedata/:id`, controller.updateSaveData);
router.delete(`/api/remove-savedata/:id`, controller.removeSaveData);

// router.get(`/*`, controller.notfound);

module.exports = router;