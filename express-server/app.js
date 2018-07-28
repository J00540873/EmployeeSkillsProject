const Joi = require('joi');
const pgp = require('pg-promise')(/*options*/)
const express = require('express');
const app = express();

app.use(express.json());

var cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'employeeskill',
    user: '',
    password: ''
};
const db = pgp(cn)

app.get('/employee/skills/api', (req, res) => {
    
    //Retrieve skills listed in database
    var result = db.any('SELECT * FROM employee_skills'
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(500).send("Connection refused, try back at a later time");
    }); 
})

//Post an employer in the database
app.post('/employee/skills/api', (req, res) => {
    
    const { error } = Joi.validate(req.body, skillPostSchema);
    if (error) return res.status(400).send(error.details[0].message); 

    const data = {
            first_name : res.body.firstName,
            last_name  : res.body.lastName,
            skill      : res.body.skill
    }
    //Inserts record into database
    const insert = db.none('INSERT INTO employee_skill(first_name, last_name, skill) \
                            values(($1),($2),($3));',[data.first_name,data.last_name,data.skill]);
    
	//Return object on successful insertion
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
app.get('/employee/skills/api/:id', (req, res) => {
    
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
        return res.status(404).send("id not found");
    }); 
})

//Returns all skill set capture in database
app.get('/employee/skills/api/listofskills', (req, res) => {
    
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
app.get('/employee/byskills/api/:skill', (req, res) => {
    
    const skill = req.params.skill;  
    const data = { skill : skill.charAt(0).toUpperCase() + skill.substr(1)}
    
    //Retrieve selected skill
    var result = db.any('SELECT * FROM employee_skills WHERE skill = ($1);', [data.skill]
    //returns promise
    ).then( data => {
        return res.send(data);
    //handles error 
    }).catch( error => {
        return res.status(404).send("skill does not exist") ;
    });
})

const skillPostSchema = Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      skill: Joi.string().required()
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));