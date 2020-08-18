const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repIndex = repositories.findIndex(repository => repository.id == id);

  if (repIndex < 0){
    return response.status(400).json({ error: 'Repository not found'});
  };

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repIndex].likes
  };

  repositories[repIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex(repository => repository.id == id);
  
  if (repIndex < 0){
    return response.status(400).json({ error: 'Repository not found'});
  };


  repositories.splice(repIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repIndex = repositories.findIndex(repository => repository.id == id);

  if (repIndex < 0){
    return response.status(400).json({ error: 'Repository not found'});
  };
  
  repository = repositories[repIndex]

  repository.likes++

  return response.json(repository)
});

module.exports = app;
