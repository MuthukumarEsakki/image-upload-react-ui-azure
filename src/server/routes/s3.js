/*
 *  Copyright (c) 2018 Boeing. All Rights Reserved.
 *  Printing, copying, reproducing or electronically transmitting this
 *  software and its associated documentation in whole or in part, in
 *  any form whatever, is subject to the terms of the Software License
 *  Agreement by and between The Boeing Company and LICENSEE.
 */
'use strict';
const express = require('express'),
      router = express.Router(),
      logger = require('../utils/logger')(module),
      cfenv = require('cfenv'),
      appEnv = cfenv.getAppEnv(),
      https = require('https'),
      fs = require('fs'),
      path = require('path'),
      s3Service = appEnv.getService("fellis-test-bucket-10_23_2018"),
      s3 = require('s3');

const certs = [
  fs.readFileSync(path.resolve(__dirname, './../ssl/boeing-truststore.pem'))
];

let httpsAgent = https.Agent({
  rejectUnauthorized: true,
  ca: certs
});

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const s3Bucket = appEnv.isLocal ? 'pcfpre-b3413f14-5f14-4090-a43a-bbc66c325a1a' : s3Service === null ? "" : s3Service.credentials.bucket;

//const s3BucketParams = { s3Params: { } };
const s3Client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: appEnv.isLocal ? 'pcfpre-11031928-7b9b-40e2-92ef-32267ac587ab' : s3Service === null ? "" :  s3Service.credentials.accessKey,
    secretAccessKey: appEnv.isLocal ? 'At+MTKmDUKI/2AlKEETiI/rBl3RShDOlU/n7Bwx+' : s3Service === null ? "" :  s3Service.credentials.secretKey,
    endpoint: appEnv.isLocal ? 'https://object1.cs.boeing.com:9021'  : s3Service === null ? "" :  s3Service.credentials.endpoint,
    s3ForcePathStyle: true,
    computeChecksums: false,
    //s3BucketEndpoint: true,
    httpOptions: {
      agent: httpsAgent
    },
  }
});

router.get('/', (req, res) => {
  logger.info('GET / request received to list all files in the S3 bucket');
  logger.info("S3 Params: " + JSON.stringify({ s3Params: { Bucket: s3Bucket  } }));
  const objectScanner = s3Client.listObjects({ s3Params: { Bucket: s3Bucket  } });

  let returnData = [];
  objectScanner.on('error', (err) => {
    logger.error("Error listing objects: " + err);
  });
  objectScanner.on('data', (data) => {
    logger.info("We got data back: " + JSON.stringify(data));
    returnData.push(data);
  });
  objectScanner.on('end', () => {
    logger.info("We are done processing");
    res.json({"message": "complete", "data": returnData});
  });
  objectScanner.on('progress', () => {
    logger.info("In progress");
  });
});

router.get('/submitFile', (req, res) => {
  const filePutParams ={ localFile: path.resolve(__dirname, './../../../test-ecs.json'), s3Params: { Bucket: s3Bucket, Key: "test-ecs.json"}};
  logger.info('GET /submitFile request received');
  logger.info("S3 Params: " + JSON.stringify(filePutParams));
  let uploader = s3Client.uploadFile(filePutParams);
  uploader.on('error', (err) => {
    logger.error("Error uploading!");
    res.json({"error": err});
  });
  uploader.on('progress', () => {
    logger.info("Upload in progress!");
  });
  uploader.on('end', () => {
    logger.info("Upload complete!");
    res.json({"message" : "Upload complete"})
  });
});

router.get('/getFile/:key', (req, res) => {
  logger.info('GET /getFile request recieved');
  const key = req.params.key;
  const fileGetParams = {  localFile: path.resolve(__dirname, './../../../ecs-downloads/' + key), s3Params: { Bucket: s3Bucket, Key: key}};
  let downloader = s3Client.downloadFile(fileGetParams);
  downloader.on('error', (err) => {
    logger.error("Error getting the file: " + err);
    res.json({"error": err});
  });
  downloader.on('progress', () => {
    logger.info("Download of file in progress");
  });
  downloader.on('end', () => {
    logger.info("Download success");
    res.json({"message": "Download complete"});
  })
});

module.exports = router;