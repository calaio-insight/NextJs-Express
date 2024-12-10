const express = require('express');
const router = express.Router();

const homeService = require('../services/home.service');

/* GET homes by userId */ 
router.get('/getHomesByUserId', async (req: any, res: any) => {
    try {
        res.json(await homeService.getHomesByUserId(req.query.userId));
    } catch (err) {
        console.log("ERROR: " + err);
    }    
});

/* GET home by homeId */ 
router.get('/getHomeById', async (req: any, res: any) => {
    try {
        res.json(await homeService.getHomeById(req.query.homeId, req.query.userId));        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

/* POST home */ 
router.post('/:userId', async (req: any, res: any) => {
    try {
        let homeId = await homeService.upsertHome(req.body, req.params.userId);
        res.json(homeId);        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

module.exports = router;
