import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";

const { STORAGE_ACCOUNT_NAME, STORAGE_CONN_STRING } = require('../config/config');

async function uploadBlobAsync (file: any, imageName: string, homeId: number) {
    console.log('file', file);
    const blobServiceClient = BlobServiceClient.fromConnectionString(STORAGE_CONN_STRING);

    // Create or find container for homeId
    let containerName = `home-${homeId}`;
    let container = blobServiceClient.getContainerClient(containerName);
    await container.createIfNotExists(); //TODO THIS NEEDS TO CREATE CONTAINER WITH PUBLIC BLOBS

    // Upload blob
    let blob = container.getBlockBlobClient(imageName);
    const readable = Readable.from(file.buffer);
    const response = await blob.uploadStream(readable);
    if (response.errorCode){
        console.log('ERROR', response.errorCode);
        return '';
    }

    return (`https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${imageName}`);
}

module.exports = {
    uploadBlobAsync
}