"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    img: null, // Remplacer l'URL par null pour un fichier local
    description: '',
    lien: '',
    repo: '',
    skills: [],
  });
  const [preview, setPreview] = useState(null); // État pour l'aperçu de l'image
  const [editing, setEditing] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (!userId) {
      router.push('/auth/signin');
    } else {
      setIsAuthenticated(true);
      fetchProjects();
      fetchSkills();
    }
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkillsList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des compétences:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      img: file,
    });
    setPreview(file ? URL.createObjectURL(file) : null); // Mise à jour de l'aperçu de l'image
  };

  const handleCheckboxChange = (skillId) => {
    setFormData((prevFormData) => {
      const skills = [...prevFormData.skills];
      return skills.includes(skillId)
        ? { ...prevFormData, skills: skills.filter((id) => id !== skillId) }
        : { ...prevFormData, skills: [...skills, skillId] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('lien', formData.lien);
    formDataToSubmit.append('repo', formData.repo);
    formDataToSubmit.append('skills', JSON.stringify(formData.skills));

    if (formData.img) {
      formDataToSubmit.append('img', formData.img);
    }

    try {
      if (editing) {
        await axios.put(`/api/projects/${editing}`, formDataToSubmit, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post('/api/projects', formDataToSubmit, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setFormData({
        name: '',
        img: null,
        description: '',
        lien: '',
        repo: '',
        skills: [],
      });
      setPreview(null); // Réinitialisation de l'aperçu
      setEditing(null);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      skills: project.skills.map((skill) => skill.id),
      img: null,
    });
    setPreview(null); // Reset de l'aperçu lors de l'édition
    setEditing(project.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <nav className="navadmin">
        <Link href="/admin">Retour à l'Admin</Link>
      </nav>
      <div className="admin-projects">
        <h1 className="admin-title">Gestion des Projets</h1>
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
            type="file"
            name="img"
            onChange={handleFileChange}
            accept="image/*"
          />
          {preview && ( // Affichage de l'aperçu de l'image
            <div className="image-preview">
              <Image src={preview} alt="Aperçu de l'image" width={100} height={100} />
            </div>
          )}
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
          <label className="skills-label" htmlFor="skills">
            Compétences liées:
          </label>
          <div className="custom-dropdown">
            <div
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
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
          <button className="submit-button" type="submit">
            {editing ? 'Modifier' : 'Ajouter'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminProjects;
