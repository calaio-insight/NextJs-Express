import express = require('express');
const router = express.Router();

const userTrustedNeighborService = require('../services/userTrustedNeighbor.service');

router.get('/getUserTrustedNeighborsByUserId', async (req: any, res: any) => {
    try {
        res.json(await userTrustedNeighborService.getUserTrustedNeighborsByUserId(req.query.userId));
    } catch (err) {
        console.log("ERROR: " + err);
    }    
});

router.get('/getPossibleTrustedNeighborByUserEmail', async (req: any, res: any) => {
    try {
        res.json(await userTrustedNeighborService.getPossibleTrustedNeighborByUserEmail(req.query.userEmail));        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

router.post('/', async (req: any, res: any) => {
    try {
        let userTrustedNeighborId = await userTrustedNeighborService.insertUserTrustedNeighbor(req.body);
        res.json(userTrustedNeighborId);        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

router.delete('/:userTrustedNeighborId/:userId', async (req: any, res: any) => {
    try {
        res.json(await userTrustedNeighborService.deleteUserTrustedNeighbor(req.query.userTrustedNeighborId, req.query.userId));        
    } catch (err) {
        console.log("ERROR: " + err);
    }    
}); 

module.exports = router;
