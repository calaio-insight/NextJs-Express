import express = require('express');
const router = express.Router();

const homeItemService = require('../services/homeItem.service');

router.get('/getHomeItemsByHomeId', async (req: any, res: any) => {
    try {
        res.json(await homeItemService.getHomeItemsByHomeId(req.query.homeId));
    } catch (err) {
        console.log("ERROR: " + err);
    }    
});

router.get('/getHomeItemById', async (req: any, res: any) => {
    try {
        res.json(await homeItemService.getHomeItemById(req.query.homeItemId));        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

router.post('/:userId', async (req: any, res: any) => {
    try {
        let homeItemId = await homeItemService.upsertHomeItem(req.body, req.params.userId);
        res.json(homeItemId);        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

module.exports = router;
