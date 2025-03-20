const Category = require('../models/category-model')
const {validationResult} = require('express-validator')
const categoriesCltr = {}

categoriesCltr.list =async(req,res) =>{

    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Something went wrong!!'})
    }
   
    // Category.find()
    //     .then((categories)=>{
    //         res.json(categories)
    //     })
    //     .catch((err)=>{
    //         res.status(500).json({error:'Something went wrong!!'})
    //     })
}

categoriesCltr.show =async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   
    try{
        const id = req.params.id
     const category =  await Category.findById(id)
     if(!category){
       res.status(404).json({error:'record not found'})
    }else{
         res.json(category)
    }
    }catch(err){
        console.log(err)
        res.status(500).json({error: 'something went wrong'})
    }

    
    // const id = req.params.id
    // Category.findById(id)
    //     .then((category)=>{
    //         if(!category){
    //             res.status(404).json({error:'record not found'})
    //         }else{
    //             res.json(category)
    //         }
    //     })
    //     .catch((err)=>{
    //         res.status(500).json({error: 'something went wrong'})
    //     })
}

categoriesCltr.create = async(req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

   
   try{
    const body = req.body
    const category= await Category.create(body)
    res.status(201).json(category);
   }catch(err){
    console.log(err)
    res.status(500).json({ error: 'something went wrong' });
   }
   
   
   
   
   
   

    // const body = req.body;
    // Category.create(body)
    //     .then((category) => {
    //         res.status(201).json(category);
    //     })
    //     .catch((err) => {
            
    //         res.status(500).json({ error: 'something went wrong' });
    //     });

}

categoriesCltr.update = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
   
    try{
        const id = req.params.id
    const body = req.body
     const category = await Category.findByIdAndUpdate(id, body, {new:true , runValidators:true})
     if(!category){
                    res.status(404).json({error: 'record not found'})
                }else{
                    res.json(category)
                }

    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }





    
    // const id = req.params.id
    // const body = req.body
    // Category.findByIdAndUpdate(id, body, {new:true , runValidators:true})
    //     .then((category)=>{
    //         if(!category){
    //             res.status(404).json({error: 'record not found'})
    //         }else{
    //             res.json(category)
    //         }
    //     })
    //     .catch((err)=>{
    //         res.json(err)
    //     })
}

categoriesCltr.remove = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    try{
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id)
        if(!category){
                       return res.status(404).json({error : 'record not found'}) // to avoid errors only one json is sent in else part also it is having json so it can not come out so eventually we can provide return to every json to come out of function, in try catch there will not be mostly if ,else only if will be there
                    }else{
                        return res.json(category)
                    }
    }catch(err){
        console.log(err)
        res.status(500).json({errror:'something went wrong'}) 
    }
    
    
    
    
    
    
    
    // const id = req.params.id
    // Category.findByIdAndDelete(id)
    //     .then((category)=>{
    //         if(!category){
    //             res.status(404).json({error : 'record not found'})
    //         }else{
    //             res.json(category)
    //         }
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //         res.status(500).json({errror:'something went wrong'})         
    //     })
}

module.exports = categoriesCltr