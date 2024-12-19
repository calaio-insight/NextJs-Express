import express = require('express');
const router = express.Router();

const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const homeService = require('../services/home.service');
const azureBlobService = require('../services/azureBlob.service');

/* POST file upload */ 
router.post('/uploadHomeIcon/:homeId/:userId', upload.single('file'), async (req: any, res: any) => {
    console.log('CONTROLLER HIT');
    
    try {
        const fileName = 'homeIcon.png';

        // upload to file storage
        const blobUrl = await azureBlobService.uploadBlobAsync(req.file, fileName, req.params.homeId);

        // update home in db with path
        if (blobUrl){
            await homeService.updateHomeImage(req.params.homeId, req.params.userId, blobUrl);
            res.send(200); 
        }
        else{
            res.send(500);
        }    
    } catch (err) {
        console.log("ERROR: " + err);
        res.send(500);
    }    
});

module.exports = router;