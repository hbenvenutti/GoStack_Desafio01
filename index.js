const express = require('express');

const server = express();

server.use(express.json());

const projects = ['teste'];


server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.post('/projects', (req,res) => {
    const { id, tasks} = req.body;
    
    const project = {
        id: id,
        tasks: tasks,
    }

    projects.push(project);
    
    return res.send("POST");
});



server.listen(3000);