"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    description: '',
    lien: '',
    repo: '',
    skills: [],
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('/api/projects');
    setProjects(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`/api/projects/${editing}`, formData);
    } else {
      await axios.post('/api/projects', formData);
    }
    setFormData({
      name: '',
      img: '',
      description: '',
      lien: '',
      repo: '',
      skills: [],
    });
    setEditing(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditing(project.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/projects/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h1>Gestion des Projets</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom du projet"
          required
        />
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
          placeholder="URL de l'image"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="lien"
          value={formData.lien}
          onChange={handleChange}
          placeholder="Lien du projet"
          required
        />
        <input
          type="text"
          name="repo"
          value={formData.repo}
          onChange={handleChange}
          placeholder="Lien du dépôt"
          required
        />
        <button type="submit">{editing ? 'Modifier' : 'Ajouter'}</button>
      </form>

      <h2>Liste des Projets</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - <button onClick={() => handleEdit(project)}>Modifier</button>
            <button onClick={() => handleDelete(project.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProjects;
