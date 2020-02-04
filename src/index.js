const express = require('express');
const searchInArray = require('./utils/searchInArray');

const server = express();

server.use(express.json());

const projects = [];

let counter = 0;

server.use((req, res, next) => {
    counter += 1;
    console.log(`Requisitions: ${counter}`);

    return next();
});

function checkID(req, res, next) {
    const { id } = req.params;

    const index = searchInArray(projects, id);

    if (index === -1){
        return res.send("Bad request;\nID does not exists");
    };

    return next();
};


server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req,res) => {
    const { id, title, tasks} = req.body;
    
    const project = {
        id: id,
        title: title,
        tasks: tasks,
    }

    projects.push(project);

    return res.json(projects);
});


server.delete('/projects/:id', checkID, (req, res) => {
    const { id } = req.params;
    
    const index = searchInArray(projects, id);
    
    projects.splice(index, 1);

    return res.json(projects);
});

server.put('/projects/:id', checkID, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const index = searchInArray(projects, id);

    projects[index].title = title;

    return res.json(projects);
});

server.post('/projects/:id/tasks', checkID, (req, res) => {
    const { id } = req.params;
    const { tasks } = req.body;

    const index = searchInArray(projects, id);

    projects[index].tasks.push(tasks);

    return res.json(projects);
});

server.listen(3000);