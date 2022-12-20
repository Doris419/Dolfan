const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const {upload} = require('../../util/util');

const cpUpload = upload.fields([
    { name: 'file', maxCount: 1 }
]);

const {
    wrapAsync
} = require('../../util/util');

const {
    getMerch,
    getMerchDetail,
    addMerch,
    deletemerch,
    addComment,
    getComment,
    getUpload,
    addCollection,
    deleteCollection,
    getCollection
} = require('../controllers/merch_controller');

router.route('/merch/:idol')
    .get(wrapAsync(getMerch));

router.route('/merch/detail/:type/:id')
    .get(wrapAsync(getMerchDetail));

router.route('/addmerch')
    .post(cpUpload,wrapAsync(addMerch));

router.route('/deletemerch/:id')
    .get(wrapAsync(deletemerch));

router.route('/addcomment')
    .post(wrapAsync(addComment));

router.route('/merch/comment/:id')
    .get(wrapAsync(getComment));

router.route('/merch/upload/:email')
    .get(wrapAsync(getUpload));

router.route('/addcollection')
    .post(wrapAsync(addCollection));

router.route('/deletecollection/:id')
    .get(wrapAsync(deleteCollection));

router.route('/merch/collection/:email')
    .get(wrapAsync(getCollection));

module.exports = router;