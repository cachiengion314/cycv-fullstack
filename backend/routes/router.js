const express = require(`express`)
const router = express.Router()
const controller = require(`../controller/controller`)
const authenticate = require(`../services/authenticate`)
const { isAuth } = require(`../middleware/isAuth`)

router.post(`/auth/login`, authenticate.generateToken)
router.post(`/auth/signup`, authenticate.createUser)

// API section => controlling data in server via api
router.get(`/api/weather`, controller.weather)
// public api
router.get(`/api/get-specific-savefile-showcase`, controller.getSpecificSaveFileShowcase)
router.get(`/api/get-all-savefile-showcase`, controller.getAllSaveFileShowCase)
// private api
router.get(`/api/get-all-savefile-showcase-of-user`, isAuth, controller.getAllSaveFileShowCaseOfUser)
router.delete(`/api/remove-savefile-showcase`, isAuth, controller.removeSaveFileShowCase)
router.put(`/api/update-savefile-showcase`, isAuth, controller.updateSaveFileShowCase)
router.post(`/api/add-savefile-showcase`, isAuth, controller.addSaveFileToShowCase)

// router.get(`/*`, controller.notfound);
module.exports = router