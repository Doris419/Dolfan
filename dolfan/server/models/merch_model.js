const {pool} = require('../../util/db.js');

const getMerch = async (idol) => {
    var type = 0;
    if(idol==='straykids'){
        type=1;
    }else if(idol==='twice'){
        type=2;
    }else if(idol==='redvelvet'){
        type=3;
    }

    const merchQuery = 'SELECT * FROM merch WHERE type = ? AND status = 1';
    const merchBindings = type;

    const [merch] = await pool.query(merchQuery, merchBindings);

    return {
        merch
    };
};

const addMerch = async (idol,pic,email,name,des,price) => {
    var icode = 0;
    if(idol==='Stray Kids'){
        icode = 1;
    }else if (idol==="TWICE"){
        icode = 2;
    }else if (idol==="Red Velvet"){
        icode = 3;
    }
    var picname = "/" + pic;
    const merchQuery = 'INSERT INTO merch (type,pic,owner_email,name,des,price,status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const merchBindings = [icode,picname,email,name,des,price,1];

    const [result] = await pool.query(merchQuery, merchBindings);

    return result.insertId;
};

const getMerchDetail = async (id) => {

    const merchQuery = 'SELECT * FROM merch WHERE id = ?';
    const merchBindings = id;

    const [merch] = await pool.query(merchQuery, merchBindings);

    return {
        merch
    };
};

const deleteMerch = async (id) => {
    const merchQuery = 'UPDATE merch SET status = 0 WHERE id = ?';
    const merchBindings = [id];

    const [result] = await pool.query(merchQuery, merchBindings);

    return result;
};

const addComment = async (name, email, comment, date, merch_id) => {
    const merchQuery = 'INSERT INTO comment (name,email,comment,date, merch_id) VALUES (?, ?, ?, ?, ?)';
    const merchBindings = [name, email, comment, date, merch_id];

    const [result] = await pool.query(merchQuery, merchBindings);

    return result;
}

const getComment = async (id) => {

    const commentQuery = 'SELECT * FROM comment WHERE merch_id = ?';
    const commentBindings = id;

    const [comment] = await pool.query(commentQuery, commentBindings);

    return {
        comment
    };
};

const getUpload = async (email) => {

    const merchQuery = `SELECT * FROM merch WHERE owner_email = ?`;
    const merchBindings = email;

    const [merch] = await pool.query(merchQuery, merchBindings);
    
    return {
        merch
    };
};

const addCollection = async (merch_id, merch_type, merch_pic, email) => {

    const collectionQuery = 'INSERT INTO collection (id, type, pic, email) VALUES (?, ?, ?, ?)';
    const collectionBindings = [merch_id, merch_type, merch_pic, email];

    const [result] = await pool.query(collectionQuery, collectionBindings);

    return result.insertId;
};

const deleteCollection = async (id) => {
    const collectionQuery = 'DELETE FROM collection WHERE id = ?';
    const collectionBindings = [id];

    const [result] = await pool.query(collectionQuery, collectionBindings);

    return result;
};

const getCollection = async (email) => {

    const merchQuery = `SELECT * FROM collection WHERE email = ?`;
    const merchBindings = email;

    const [merch] = await pool.query(merchQuery, merchBindings);
    
    return {
        merch
    };
};

module.exports = {
    getMerch,
    addMerch,
    getMerchDetail,
    deleteMerch,
    addComment,
    getComment,
    getUpload,
    addCollection,
    deleteCollection,
    getCollection
};