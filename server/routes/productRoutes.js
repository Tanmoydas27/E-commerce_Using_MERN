const router = require('express').Router();
const Product = require('../models/productModel.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const multer = require('multer');
const  cloudinary_js_config = require('../dbConfig/cloudinaryConfig.js');
const Payment = require('../models/paymentModal.js');


router.post('/add-product', authMiddleware,async (req,res)=>{
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.send({
            success:true,
            message:'Product Added Successfully',
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        });
    }
});

router.post('/get-products',async(req,res)=>{
    try {
        
        const products = await Product.find(req.body).populate('seller').sort({createdAt:-1});
        res.send({
            success:true,
            data:products,
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        });
    }
});

router.get('/get-product-by-id/:id',authMiddleware,async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id).populate('seller');
        res.send({
            success:true,
            data:product,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        });
    }
});

router.put('/edit-product/:id',authMiddleware,async(req,res)=>{
    try {
        await Product.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            success:true,
            message:"Product Updated Successfully",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.delete('/delete-product/:id', authMiddleware, async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success:true,
            message:"Product Deleted Successfully",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

const storage = multer.diskStorage({
    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname);
    },
});

router.post('/upload-image-to-product', authMiddleware, multer({storage: storage}).single('file'),async(req, res)=>{
    try {
        const result = await cloudinary_js_config.uploader.upload(req.file.path,{
            folder:'ProductMarket',
        });

        const productId = req.body.productId;
        await Product.findByIdAndUpdate(productId,{$push:{images:result.secure_url}});
        res.send({
            success:true,
            message: 'Image Uploaded Successfully',
            data: result.secure_url,
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.put('/update-product-status/:id',authMiddleware, async(req,res)=>{
    try {
        const {status} =req.body;
        await Product.findByIdAndUpdate(req.params.id,{status});
        res.send({
            success:true,
            message:'Product Status Updated Successfully',
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});



module.exports = router;
