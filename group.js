const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Turf, Group, Academy, Sport, History, User }
  = require('./models');

app.use(express.json());

//get all the groups
app.get('/group', async (req, res) => {
  try {
    const name = await Group.find();
    if (name.length === 0) {
      return res.status(404).json({ error: 'No such groups exist' });
    }
    res.status(200).json({ message: 'Below are the found groups', name });
  }
  catch (error) {
    console.error('error retrieving groups:', error);
    res.status(500).json({ error: 'couldnt find the groups' });
  }
});

//get group by name
app.get('/group/:groupname', async (req, res) => {
  try {
    const group = await Group.findOne({ groupname: req.params.groupname });
    if (!group) {
      return res.status(404).json({ error: 'group not found' });
    }
    res.status(200).json({ message: 'found the group', group });
  }
  catch (error) {
    console.error('error finding group:', error);
    res.status(500).json({ error: 'couldnt retrieve group' });
  }
});

//delete group by name 

app.delete('/group/:groupname', async (req, res) => {
  try {
    const result = await Group.deleteOne({ groupname: req.params.groupname });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'no such groups exist' });
    }
    res.status(200).json({ message: 'Given group deleted from the model', result });
  }
  catch (error) {
    console.error('error deleting group', error);
    res.status(500).json({ error: 'couldnt delete the group' });
  }
});


// insert group by name  
app.post('/groups', async (req, res) => {
  try {
    const existinggroup = await Group.findone({ groupname: req.body.groupname });
    if (existinggroup) {
      return res.json(400).json({ error: 'group already exists' });
    }
    const newgroup = new Group({
      groupname: req.body.groupname,
      members: req.body.members,
      createdAt: req.body.createdAt
    });
    const savedgroup = await (newgroup.save());
    res.status(201).json({ message: 'group created', savedgroup });
  }
  catch (error) {
    console.error('couldnt create the group', error);
    res.status(500).json({ error: 'couldnt create the group' });
  }
});

module.exports = app;