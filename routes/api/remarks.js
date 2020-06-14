const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Remark Model

const Remark = require('../../models/Remark');

// @route GET api/remarks
// @desc  Get All Remarks
// @acess Public
router.get('/', (req, res) => {
    Remark.find()
        .sort({ date: -1 })
        .then((remarks) => res.json(remarks));
});

// @route GET specific api/remarks
// @desc  Get One Remark
// @acess Public
router.get('/:id', (req, res) => {
    Remark.findById(req.params.id)
        .then(remark => res.json(remark))
        .catch(err => res.status(404).json({ success: false }));
});


// @route POST api/remarks
// @desc  Create an Remark
// @acess Private
router.post('/', auth, (req, res) => {
    // router.post('/', (req, res) => {

    const newRemark = new Remark({
        title: req.body.title,
        project: req.body.project,
        severity: req.body.severity
    });

    newRemark.save()
        .then(remark => res.json(remark));
});

// @route DELETE api/remarks
// @desc  Delete an Remark
// @acess Private
router.delete('/:id', auth, (req, res) => {
    Remark.findById(req.params.id)
        .then(remark => remark.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// export default router;
module.exports = router;