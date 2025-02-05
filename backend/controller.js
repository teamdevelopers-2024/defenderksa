import productDb from "./model/ProductModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dvrvmosez',
  api_key: '294223518693917',
  api_secret: 'hqZ-nmWE9UlTWB-CAwaQYMSA7Eg',
});


class Controller {

    async  login(req,res) {
        try {
            const {email , password} = req.body
            if(email==process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASS){
                console.log('request gotted', req.body)
                return res.status(200).json({
                    error:false,
                    message:"Admin logged in successfully"
                })
            }

            res.status(400).json({
                error:true ,
                message: "invalid credentials"
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error:true ,
                message:"Internel server error"
            })
        }    
    }



    async addProduct(req,res){
        try {
            const body = req.body
            console.log("body getting here : ",req.body)
            if(!body.productName){
                return res.status(400).json({
                    error:true ,
                    message : "need a name for product"
                })
            }else if(!body.images.length){
                return res.status(400).json({
                    error:true ,
                    message : "please upload atleast 1 image"
                })
            } else if(!body.articleNumber) {
              return res.status(400).json({
                error : true , 
                message:"please eneter article number"
              })
            } else {
                await productDb.create({
                    productName : body.productName,
                    art_number : body.articleNumber,
                    isOutStock : false,
                    images: body.images,
                    video : body.video
                })
            }
            res.status(200).json({
                error:false,
                message:"product added successfully"
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({  
                error:true ,
                message : "internel server error"
            })
        }
    }


    async getAdminProducts(req,res){

        console.log('on the backend before fetching')
        try {
            console.log(req.query.count)
            if(req.query.count > 0){
                const data = await productDb.find({isOutStock:false}).limit(req.query.count)
                return res.status(200).json({
                    error:false,
                    message:"data fetched successfully",
                    data : data
                })
            }else{
                console.log('on the else case of backend before fetchig')
                const data = await productDb.find()
                 res.status(200).json({
                     error:false,
                     message:"data fetched successfully",
                     data : data
                 })
            }
          
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error:true ,
                message:"internel server error"
            })            
        }
    }


    async deleteProduct(req,res){
        try {
            const id = req.query.id
            const product = await productDb.findOne({_id:id})
            if (!product) {
                return res.status(404).json({error:true, message: "Product not found" });
              }

              if (product.images && product.images.length > 0) {
                for (const image of product.images) {
                  await cloudinary.uploader.destroy(image.publicId);
                }
              }

              if (product.video && product.video.publicId) {
                await cloudinary.uploader.destroy(product.video.publicId, { resource_type: "video" });
              }

              await productDb.deleteOne({ _id: id });
              return res.status(200).json({error:false, message: "Product and its media have been deleted successfully." });
            } catch (error) {
              console.error("Error deleting product:", error);
              return res.status(500).json({error:true, message: "An error occurred while deleting the product." });
            }
          }
          async toggleStock(req, res) {
            try {
                const id = req.query.id;
        
                // Find the product by ID
                const product = await productDb.findById(id);
        
                if (!product) {
                    return res.status(404).json({error:true , message: "Product not found" });
                }
        
                // Toggle the isOutStock property
                const updatedProduct = await productDb.findByIdAndUpdate(
                    id,
                    { isOutStock: !product.isOutStock }
                );
        
                res.status(200).json({
                    error:false,
                    message: `Product stock status updated to ${updatedProduct.isOutStock ? 'Out of Stock' : 'In Stock'}`,
                    product: updatedProduct
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({error:true, message: "An error occurred while toggling stock status" });
            }
        }
        
}



export default new Controller()