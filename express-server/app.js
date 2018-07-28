const Joi = require('joi');
const pgp = require('pg-promise')()
const config = require('config');
const express = require('express');
const app = express();
const skills = require('./routes/skills');

app.use(express.json());
app.use('/employee/skills/api',skills);

console.log(`NODE is currently in ${app.get('env')} mode`);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));