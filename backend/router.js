import express from 'express'
import controller from './controller.js'
const router = express.Router()


router.post("/addProduct",controller.addProduct)
router.post("/login",controller.login)


router.get("/getProducts",controller.getAdminProducts)


router.delete("/deleteProduct",controller.deleteProduct)


router.put('/toggleStock',controller.toggleStock)

export default router