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