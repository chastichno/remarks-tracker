const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

// Project Model

const Project = require('../../models/Project');

// @route GET api/projects
// @desc  Get All Projects
// @acess Public
router.get('/', (req, res) => {
    Project.find()
        .sort({ date: -1 })
        .then((projects) => res.json(projects));
});

// @route GET specific api/projects
// @desc  Get One Project
// @acess Public
router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(404).json({ success: false }));
});


// @route POST api/projects
// @desc  Create an Project
// @acess Private
router.post('/', auth, (req, res) => {
    // router.post('/', (req, res) => {

    const newProject = new Project({
        title: req.body.title,
        users: req.body.users
    });

    newProject.save()
        .then(project => res.json(project));
});

// @route DELETE api/projects
// @desc  Delete an Project
// @acess Private
router.delete('/:id', auth, (req, res) => {
    Project.findById(req.params.id)
        .then(project => project.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

// export default router;
module.exports = router;