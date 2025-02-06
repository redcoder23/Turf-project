const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Academy } = require('./models');
app.use(express.json());

const { Turf, Group, Academy, Sport, History, User }
  = require('./models');
/*
 get all academies 
 get academy by name 
 delete academy by name 
 post academy by name  
*/
  
//get all academies
app.get('/academies', async (req, res) => {
    try 
    {
         const academies= await Academy.find() ;  
         if(academies.length===0)
        {
           return  res.status(404).json({error:'couldnt find the academy'});
        } 
        res.status(200).json({message:'These are the academies',academies});     
    } 
    catch(error)
     {    
        console.error('Error retrieving academies',error) ;
       res.status(500).json({error:'Could not retrieve academies'});
     }
});  

//get academy by name 

app.get('/academy/:name',async(req,res)=> 
{
    try 
    {
         const newac= await Academy.findOne({name:req.params.name}); 
         if(!newac) 
         {
            return res.status(404).json({error:'no such academy exist'}); 
         } 
         res.status(200).json({message:'found academy',newac}); 
    }   
    catch(error) 
    {
        console.error('Error retreiving academies',error); 
        res.status(500).json({error:'Couldnt retrieve academies'});
    }
});  

//delete academy by name  v 

app.delete('/academy/:name',async(req,res)=> 
{  
    try{
         const daca=await Academy.deleteOne({name:req.params.name}) ; 
         if(daca.deletedCount===0) 
         {
            return res.status(404).json({error:'no such academies exist'}); 
         } 
         res.status(200).json({message:'deleted the academy',daca});
    }
    catch(error) 
    {
         console.error('error deleting the academy',error); 
        res.status(500).json({error:'couldnt delete the academy'});
    }

});   

//insert academy by name  

app.post('/academy',async(req,res)=> 
{   
    try 
    {
       const newacademy=new Academy({ 
          name:req.body.name,
          location:req.body.location,
          sportsOffered:req.body.sportsoffered,
          contact:req.body.contact,
          images:req.body.images
      }) ;
        const savedacademy=await(newacademy.save());  
        res.status(201).json({message:'academy has been entered',newacademy});
    } 
    catch(error) 
    {  
        console.error('Error inserting academy',error); 
        res.status(500).json({error:'Couldnt insert academy'}); 
    }
}) ;   
module.exports = app;