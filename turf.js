const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Turf, Group, Academy, Sport, History, User }
    = require('./models');

app.use(express.json());

app.put('/turfs/:name', async (req, res) => {
    try {
        const up = await Turf.findOneAndUpdate(

            { name: req.params.name },   //find by 
            { $set: req.body },    // changes the body
            { new: true }  // returns true if the document is changed 
        );
        if (!up) {
            return res.status(404).json({ error: 'No such turfs could be found' });
        }
        res.json(up);// the changed document is returned back to the client 
    }
    catch (error) {
        console.error("error updating the turf:", error);
        res.status(500).json({ error: 'error updating the turf' });
    };
});

app.post('/turfs', async (req, res) => {
    try {
        const newturf = new Turf({
            name: res.body.name,
            address: res.body.address,
            isOpen: res.body.isOpen,
            timings: res.body.timings,
            sports: res.body.sports,
            ownerName: res.body.ownerName,
            contact: res.body.contact,
            img: res.body.img
        });
        const savedturf = await (newturf.save());
        res.status(201).json({ savedturf });
    }
    catch (error) {
        console.error('error creating the turf', error);
        res.status(500).json({ error: 'error creating the tuf' });
    }
});

app.delete('/turfs/:name', async (req, res) => {
    try {
        const deletedturf = await Turf.findOneAndDelete
            ({ name: req.params.name })
        if (!deletedturf) {
            return res.status(404).json({ error: 'file doesnt exist' });
        }
        res.json(({ message: 'turf deleted successfully', deletedtur }));
    }
    catch (error) {
        console.error('error deleting turf:', error);
        res.status(500).json({ error: 'error deleting the turf' });
    }

}
);

app.get('/turfs/:name', async (req, res) => {
       try  
    {
            const turfname=await Turf.findOne({name:req.params.name}); 
          if(!turfname) 
          {
            res.status(404).json({error:'No such turfs exsist'}); 
          } 
          res.json({message:'found the turf',turfname}); 
    }
      catch (error) {
            console.error('error cant find the turf',error);
            res.status(500).json({error:'Couldnt find the turf'});
    }
});
