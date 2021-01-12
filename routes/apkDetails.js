const express = require('express');
const router = express.Router();
const multer = require('multer');
 
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,   'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});
 
var upload = multer({storage: storage});
var util = require('util');
var ApkReader = require('node-apk-parser');

router.post('/apkDetails',upload.single("file"), (req, res) => {
    //console.log(req.file);
     var reader = ApkReader.readFile(req.file.path)
     var manifest = reader.readManifestSync()
     var details = util.inspect(manifest, { depth: null });
    res.json({name:req.file.filename,version:manifest.versionName,fileSize:req.file.size});
});
module.exports = router;