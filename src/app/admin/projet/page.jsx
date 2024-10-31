"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Importez Link pour la navigation

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ name: '', img: '', description: '', lien: '', repo: '', skills: [] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des projets:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData({ 
      name: project.name, 
      img: project.img, 
      description: project.description, 
      lien: project.lien, 
      repo: project.repo, 
      skills: project.skills || [] 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = selectedProject ? 'PUT' : 'POST';
    const url = selectedProject ? `/api/projects/${selectedProject.id}` : '/api/projects';

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la soumission du projet.');
      }

      const data = await response.json();
      setProjects((prev) => (selectedProject ? prev.map((proj) => (proj.id === data.id ? data : proj)) : [...prev, data]));
      setSelectedProject(null);
      setFormData({ name: '', img: '', description: '', lien: '', repo: '', skills: [] });
      setError('');
      setSuccessMessage('Mise à jour réussie !');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        const response = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du projet.');
        }
        setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className='admin-projects'>
      <nav className='navadmin'>
        <Link href="/admin">Retour à l'Admin</Link>
      </nav>
      <h2>Gestion des Projets</h2>
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type="text" name="img" value={formData.img} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Lien</label>
            <input type="url" name="lien" value={formData.lien} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Dépôt</label>
            <input type="url" name="repo" value={formData.repo} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <button type="submit" disabled={loading}>
              {selectedProject ? 'Mettre à jour' : 'Créer'} un Projet
            </button>
          </div>
        </form>
        {loading && <div className="spinner">Chargement...</div>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <h3>Liste des Projets</h3>
      <div className="project-list">
        {projects.map((project) => (
          <div className="project-card" key={project.id}>
            <h4 className="project-name">{project.name}</h4>
            {project.img && <img src={project.img} alt={project.name} className="project-image" />}
            <p className="project-description">{project.description}</p>
            <p className="projectlink">
              <a href={project.lien} target="_blank" rel="noopener noreferrer">Lien</a> | 
              <a href={project.repo} target="_blank" rel="noopener noreferrer">Dépôt</a>
            </p>
            <div className="skills-list">
              Compétences : 
              {project.skills && project.skills.length > 0 ? (
                project.skills.map((skill) => (
                  <div className="skill-item" key={skill.id}>
                    <img 
                      src={skill.img} 
                      alt={skill.name} 
                      className="skill-img" 
                      title={skill.name} // Affiche le nom de la compétence lors du survol
                    />
                  </div>
                ))
              ) : (
                <span className="no-skills">Aucune compétence</span>
              )}
            </div>
            <div>
              <button className="edit-button" onClick={() => handleEdit(project)}>Modifier</button>
              <button className="delete-button" onClick={() => handleDelete(project.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
