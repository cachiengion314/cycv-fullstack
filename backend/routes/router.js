const express = require(`express`)
const router = express.Router()
const controller = require(`../controller/controller`)
const authenticate = require(`../services/authenticate`)
const { isAuth } = require(`../middleware/isAuth`)

router.post(`/auth/login`, authenticate.generateToken)
router.post(`/auth/signup`, authenticate.createUser)

// API section => controlling data in server via api
router.get(`/api/weather`, controller.weather)

router.get(`/api/get-all-savefile-showcase`, controller.getAllSaveFileShowCase)
// need auth
router.get(`/api/get-all-savefile-showcase-of-user`, isAuth, controller.getAllSaveFileShowCaseOfUser)
router.delete(`/api/remove-savefile-showcase`, isAuth, controller.removeSaveFileShowCase)
router.put(`/api/update-savefile-showcase`, isAuth, controller.updateSaveFileShowCase)
router.post(`/api/add-savefile-showcase`, isAuth, controller.addSaveFileToShowCase)
router.get(`/api/get-savesdata/:token`, isAuth, controller.getSavesData)
router.post(`/api/add-savedata/:token`, isAuth, controller.addSaveData)
router.put(`/api/update-savedata/:token`, isAuth, controller.updateSaveData)
router.delete(`/api/remove-savedata/:token`, isAuth, controller.removeSaveData)

// router.get(`/*`, controller.notfound);
module.exports = router