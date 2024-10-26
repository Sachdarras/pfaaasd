"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie'; // Import de js-cookie

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    description: '',
    lien: '',
    repo: '',
    skills: [],
  });
  const [editing, setEditing] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

  useEffect(() => {
    fetchProjects();
    fetchSkills();
    // Vérifiez l'authentification à partir des cookies
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      setMessage('Erreur lors de la récupération des projets.');
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkillsList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
      setMessage('Erreur lors de la récupération des compétences.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (skillId) => {
    setFormData((prevFormData) => {
      const skills = [...prevFormData.skills];
      if (skills.includes(skillId)) {
        return { ...prevFormData, skills: skills.filter((id) => id !== skillId) };
      } else {
        return { ...prevFormData, skills: [...skills, skillId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`/api/projects/${editing}`, formData);
        setMessage('Projet modifié avec succès.');
      } else {
        await axios.post('/api/projects', formData);
        setMessage('Projet ajouté avec succès.');
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
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setMessage('Erreur lors de la soumission du formulaire.');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      skills: project.skills.map(skill => skill.id),
    });
    setEditing(project.id);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?');
    if (confirmed) {
      try {
        await axios.delete(`/api/projects/${id}`);
        setMessage('Projet supprimé avec succès.');
        fetchProjects();
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error);
        setMessage('Erreur lors de la suppression du projet.');
      }
    }
  };

  // Si l'utilisateur n'est pas authentifié, ne pas rendre le contenu
  if (!isAuthenticated) {
    return null; // Vous pouvez aussi afficher un loader ici
  }

  return (
    <>
      <nav className='navadmin'>
        <Link href="/admin">Retour à l'Admin</Link>
      </nav>
      <div className="admin-projects">
        <h1 className="admin-title">Gestion des Projets</h1>
        {message && <p className="status-message">{message}</p>}
        <form className="project-form" onSubmit={handleSubmit}>
          <input
            className="input-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom du projet"
            required
          />
          <input
            className="input-img"
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="URL de l'image"
            required
          />
          <textarea
            className="input-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            className="input-lien"
            type="text"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            placeholder="Lien du projet"
            required
          />
          <input
            className="input-repo"
            type="text"
            name="repo"
            value={formData.repo}
            onChange={handleChange}
            placeholder="Lien du dépôt"
            required
          />

          <label className="skills-label" htmlFor="skills">Compétences liées:</label>
          <div className="custom-dropdown">
            <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Sélectionner des compétences
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {skillsList.map((skill) => (
                  <label key={skill.id} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill.id)}
                      onChange={() => handleCheckboxChange(skill.id)}
                    />
                    {skill.name}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button className="submit-button" type="submit">{editing ? 'Modifier' : 'Ajouter'}</button>
        </form>

        <h2 className="project-list-title">Liste des Projets</h2>
        <ul className="project-list">
          {projects.map((project) => (
            <li className="project-card" key={project.id}>
              <h3 className="project-name">{project.name}</h3>
              <Image className="project-img" src={project.img} alt={project.name} width={100} height={100} />
              <p className="project-description">{project.description}</p>
              <h4 className="skills-title">Compétences:</h4>
              <ul className="skills-list">
                {project.skills.length > 0 ? (
                  project.skills.map((skill) => (
                    <li className="skill-item" key={skill.id}>
                      <Image className="skill-img" src={skill.image} alt={skill.name} width={30} height={30} />
                      {skill.name}
                    </li>
                  ))
                ) : (
                  <li className="no-skills">Aucune compétence associée.</li>
                )}
              </ul>
              <p className="projectlink">
                <strong>Lien:</strong> <a href={project.lien} target="_blank" rel="noopener noreferrer">{project.lien}</a>
              </p>
              <p className="project-repo">
                <strong>Repo:</strong> <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.repo}</a>
              </p>
              <button className="edit-button" onClick={() => handleEdit(project)}>Modifier</button>
              <button className="delete-button" onClick={() => handleDelete(project.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminProjects;
