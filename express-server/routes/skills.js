const Joi = require('joi');
const pgp = require('pg-promise')()
const config = require('config');
const express = require('express');
const router = express.Router();


const connection = config.get('dbconnection');
const db = pgp(connection);

router.get('/', (req, res) => {
    
    //queries for all employees listed in database
    var result = db.any('SELECT * FROM employee_skills'
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(500).send("Connection refused, try back at a later time");
    }); 
})

//POSTS an employee in the database
router.post('/', (req, res) => {
    
    //verifies if received data is valid 
    const { error } = Joi.validate(req.body, skillPostSchema);
    if (error) return res.status(400).send(error.details[0].message); 
    const data = {
            first_name : res.body.firstName,
            last_name  : res.body.lastName,
            skill      : res.body.skill
    }

    //inserts record into database
    const insert = db.none('INSERT INTO employee_skill(first_name, last_name, skill) \
                            values(($1),($2),($3));',[data.first_name,data.last_name,data.skill]);
    
	//return object with id on successful insertion
    var result = db.one('SELECT * FROM employee_skill WHERE first_name = ($1)) \
                         AND last_name = ($2)) \
                         AND skill = ($3) \
                         ORDER BY id DESC LIMIT 1',[data.first_name,data.last_name,data.skill]
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(500).send("Connection refused, try back at a later time");
    });
})

//Search employee by id
router.get('/:id', (req, res) => {
    
    const _id = req.params.id;  
    const id = parseInt(_id);

    if(isNaN(id)) return res.status(400).send("Incorrect data format");
    
    const data = { id : id}
    //Retrieve skills listed in database
    var result = db.one('SELECT * FROM employee_skills WHERE id = ($1)', [data.id]
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(500).send("Either the connection is refused, or the id is invlaid");
    }); 
})

//Returns all skill set capture in database
router.get('/listof/skills', (req, res) => {
    
    //Retrieve skills listed in database
    var result = db.any('SELECT skill FROM employee_skills GROUP BY skill'
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch(error => {
        return res.status(500).send("Connection refused, try back at a later time") ;
    });
})

//Returns a list of employees based on the enter skill
router.get('/employeesby/:skill', (req, res) => {
    
    const skill = req.params.skill;  
    const data = { skill : skill.charAt(0).toUpperCase() + skill.substr(1)}
    
    //Retrieve selected skill
    var result = db.any('SELECT * FROM employee_skills WHERE skill = ($1);', [data.skill]
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(500).send("Either the connection is refused, or the skill does not exist") ;
    });
})

const skillPostSchema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      skill: Joi.string().required()
});

module.exports = router;