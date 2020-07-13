var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/dbname') // Example for postgres

const Note = sequelize.define('notes', {note: Sequelize.TEXT, tag: Sequelize.STRING});

sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`);
  });

app.get('/', (req, res) => res.send('Notes App'));

app.get('/notes', function (req, res) {
  Note.findAll().then(notes => res.json(notes));
});

app.get('/notes/:id', function (req, res) {
  Note.findAll({where: {id: req.params.id}}).then(notes => res.json(notes));
});

app.get('/notes/search', function (req, res) {
  Note.findAll({where: {note: req.query.note, tag: req.query.tag}}).then(notes => res.json(notes));
});

app.post('/notes', function (req, res) {
  Note.create({note: req.body.note, tag: req.body.tag}).then(function (note) {
    res.json(note);
  });
});

app.put('/notes/:id', function (req, res) {
  Note.findByPk(req.params.id).then(function (note) {
    note.update({
      note: req.body.note,
      tag: req.body.tag
    }).then((note) => {
      res.json(note);
    });
  });
});

app.delete('/notes/:id', function (req, res) {
  Note.findByPk(req.params.id).then(function (note) {
    note.destroy();
  }).then((note) => {
    res.sendStatus(200);
  });
});

module.exports = app;
