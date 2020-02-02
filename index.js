const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


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


function searchInArray(array, id){
    const len = array.length;

    for (var i=0; i<len; i++){
        if (array[i].id === id){
            return i;
        };
    };

    return -1;

};

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    
    const index = searchInArray(projects, id);
    
    projects.splice(index, 1);

    return res.json(projects);
});



server.listen(3000);