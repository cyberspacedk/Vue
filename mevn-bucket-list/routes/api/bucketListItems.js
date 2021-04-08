const {Router} = require('express');
const router = Router();

const BucketListItem = require('../../models/BucketListItem');

router.get("/", async (req, res)=> {
    try {
        const bucketListItems = await BucketListItem.find();
        if(!bucketListItems) throw Error("List is empty");
        const sorted = bucketListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        }); 
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
});

router.post("/", async (req, res)=> {
    try {
        const newBucketListItem = new BucketListItem(req.body); 
        const bucketListItem = await newBucketListItem.save();
        if(!bucketListItem) throw Error("Error while saving"); 
        res.status(200).json(bucketListItem)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
});

router.put("/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        const response = await BucketListItem.findByIdAndUpdate(id, req.body); 
        if(!response) throw Error("Error while updating");
        const updated = {...response._doc, ...req.body}; 
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({message: error.message});
    }   
});

router.delete("/:id", async (req, res)=> {
    try {
        const {id} = req.params;
        console.log("🚀 ~ file: bucketListItems.js ~ line 45 ~ router.delete ~ id", id)
        const removed = await BucketListItem.findByIdAndDelete(id); 
        if(!removed) throw Error("Error while deleting"); 
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
});

module.exports = router;