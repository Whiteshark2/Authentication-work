const express=require('express')
const router=express.Router()
const passport=require('passport')

const userController=require('../controllers/user_controller')

router.get('/',userController.home)

router.get('/signup',userController.signup)
router.post('/create',userController.create)

router.get('/signin',userController.signin)

router.post('/createSession',passport.authenticate(
    'local',{failureRedirect:'/signin'},
),userController.createSession)

router.get('/logout',userController.logout)


router.get('/result',passport.checkAuthentication,userController.result)

module.exports=router