const Merch = require('../models/merch_model');
const pageSize = 6;

const getMerch = async (req, res) => {
    const idol = req.params.idol;
    const paging = parseInt(req.query.paging) || 0;

    async function findProduct(idol) {
        switch (idol) {
            case 'straykids': case 'twice': case 'redvelvet':
                return await Merch.getMerch(idol);
        }
        return Promise.resolve({});
    }
    const {merch} = await findProduct(idol);

    if (!merch) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (merch.length == 0) {
            res.status(200).json({data: []});
        return;
    }
    res.status(200).json(merch);
};

const getMerchDetail = async (req, res) => {
    const id = req.params.id;

    const {merch} =  await Merch.getMerchDetail(id);

    if (!merch) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (merch.length == 0) {
            res.status(200).json({data: []});
        return;
    }
    res.status(200).json(merch);
};

const addMerch = async (req, res) => {
    const idol = req.body.idol;
    const name = req.body.name;
    const des = req.body.des;
    const price = req.body.price;
    const pic = req.files.file[0].filename;
    const email = req.body.email;
    await Merch.addMerch(idol,pic,email,name,des,price);
    res.sendStatus(200);
};

const deletemerch = async (req, res) => {
    const id = req.params.id;
    await Merch.deleteMerch(id);
    res.sendStatus(200);
};

const addComment = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const comment = req.body.comment;
    const date = req.body.date;
    const merch_id = req.body.merch_id;
    await Merch.addComment(name, email, comment, date, merch_id);
    res.sendStatus(200);
};

const getComment = async (req, res) => {
    const id = req.params.id;

    const {comment} =  await Merch.getComment(id);

    if (!comment) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (comment.length == 0) {
            res.status(200).json([]);
        return;
    }
    res.status(200).json(comment);
};

const getUpload = async (req, res) => {
    const email = req.params.email;

    const {merch} = await Merch.getUpload(email);

    if (!merch) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (merch.length == 0) {
            res.status(200).json([]);
        return;
    }
    res.status(200).send(merch);
};

const addCollection = async (req, res) => {
    const merch_id = req.body.merch_id;
    const merch_type = req.body.merch_type;
    const merch_pic = req.body.merch_pic;
    const email = req.body.email;

    await Merch.addCollection(merch_id, merch_type, merch_pic, email);
    res.sendStatus(200);
};

const deleteCollection = async (req, res) => {
    const id = req.params.id;
    await Merch.deleteCollection(id);
    res.sendStatus(200);
};

const getCollection = async (req, res) => {
    const email = req.params.email;

    const {merch} = await Merch.getCollection(email);

    if (!merch) {
        res.status(400).send({error:'Wrong Request'});
        return;
    }

    if (merch.length == 0) {
            res.status(200).json([]);
        return;
    }
    res.status(200).send(merch);
};

module.exports = {
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
};