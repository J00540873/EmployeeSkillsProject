const Joi = require('joi');
const express = require('express');
const app = express();
var pgp = require('pg-promise')(/*options*/)
var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'employeeskill',
    user: '',
    password: ''
};

app.use(express.json());

var db = pgp(cn)

app.get('/employee/skills/api', (req, res) => {
    
    //Retrieve skills listed in database
    var result = db.any('SELECT * FROM employee_skills').then( data => {
        return data;
    })// print the error;
    .catch(error => {
        
    });

    //returns promise
    result.then((result) => {
        res.send(result)
        console.log(result)
    })

    
})

//Post an employer in the database
app.post('/employee/skills/api', (req, res) => {
    
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send(error.details[0].message); 

    const data = {
            first_name : res.body.firstName.toLowerCase(),
            last_name  : res.body.lastName.toLowerCase(),
            skill      : res.body.skill.toLowerCase()
    }
    //Inserts record into DB
    const insert = db.none('INSERT INTO employee_skill(first_name, last_name, skill) \
    values('+ data.first_name +',' + data.last_name +','+ data.skill +');');
    
	//Return object on successful insertion
    var result = db.any('SELECT * FROM employee_skill WHERE first_name = '+ data.first_name + ' AND \
    last_name = ' + data.last_name + ' AND skill = ' + data.skill + ' ORDER BY id ASC LIMIT 1;').then( data => {
        return data;
    })// print the error;
    .catch(error => {
       
    });

    //returns promise
    result.then(function(result){
        res.send(result)
    })
})

//Returns all skill set capture in database
app.get('/employee/skills/api/listofskills', (req, res) => {
    
    //Retrieve skills listed in database
    var result = db.any('SELECT skill FROM employee_skills').then( data => {
        return data;
    }) //catch error
    .catch(error => {
        
    });

    //returns promise
    result.then(function(result){
        console.log(result);
        console.log(result.length);
        res.send(result)
    })
})

//Returns a list of employees based on the enter skill
app.get('/employee/byskills/api/:skill', (req, res) => {
    
    const data = { skill : req.params.skill}

    //Retrieve selected skill
    var result = db.any('SELECT * FROM employee_skills WHERE skill = ($1);', [data.skill]).then( data => {
        console.log(data);
        return data;
    }) //catch error
    .catch(error => {
        
    });

    //returns promise
    result.then((result) => {
        res.send(result)
        
    })
    
})

const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    skill: Joi.string().required()
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));