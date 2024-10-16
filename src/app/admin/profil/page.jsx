"use client"; // Assurez-vous que cette ligne est au début de votre fichier

import { useEffect, useState } from 'react';

const Profil = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    content: '',
    image: '',
  });
  const [skillFormData, setSkillFormData] = useState({
    name: '',
    image: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [editingSkillId, setEditingSkillId] = useState(null);

  // Récupérer les descriptions et compétences au chargement de la page
  useEffect(() => {
    fetch('/api/description')
      .then((res) => res.json())
      .then((data) => setDescriptions(data));
    
    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  // Gérer le changement des inputs pour les descriptions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gérer le changement des inputs pour les compétences
  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillFormData({ ...skillFormData, [name]: value });
  };

  // Gérer le changement de fichier d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result }); // Convertir l'image en base64
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Gérer l'envoi du formulaire pour les descriptions
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/description/${editingId}` : '/api/description';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Mettez à jour la liste des descriptions
        setDescriptions((prev) => {
          if (editingId) {
            return prev.map((desc) => (desc.id === editingId ? data : desc));
          }
          return [...prev, data];
        });
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          title: '',
          subtitle: '',
          content: '',
          image: '',
        });
        setEditingId(null);
      });
  };

  // Gérer l'envoi du formulaire pour les compétences
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    const method = editingSkillId ? 'PUT' : 'POST';
    const url = editingSkillId ? `/api/skills` : '/api/skills';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: editingSkillId, ...skillFormData }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Mettez à jour la liste des compétences
        setSkills((prev) => {
          if (editingSkillId) {
            return prev.map((skill) => (skill.id === editingSkillId ? data : skill));
          }
          return [...prev, data];
        });
        // Réinitialiser le formulaire
        setSkillFormData({
          name: '',
          image: '',
        });
        setEditingSkillId(null);
      });
  };

  // Gérer la suppression
  const handleDelete = (id) => {
    fetch(`/api/description/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setDescriptions((prev) => prev.filter((desc) => desc.id !== id));
    });
  };

  // Gérer l'édition des descriptions
  const handleEdit = (description) => {
    setFormData({
      name: description.name,
      title: description.title,
      subtitle: description.subtitle,
      content: description.content,
      image: description.image,
    });
    setEditingId(description.id);
  };

  // Gérer la suppression des compétences
  const handleSkillDelete = (id) => {
    fetch(`/api/skills`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    });
  };

  // Gérer l'édition des compétences
  const handleSkillEdit = (skill) => {
    setSkillFormData({
      name: skill.name,
      image: skill.image,
    });
    setEditingSkillId(skill.id);
  };

  return (
    <div className="admin-container">
      <h1>Profil - Gérer les Descriptions</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nom" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="title" 
          placeholder="Titre" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="subtitle" 
          placeholder="Sous-titre" 
          value={formData.subtitle} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          name="content" 
          placeholder="Contenu" 
          value={formData.content} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={handleImageChange} 
          required 
        />
        <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h2>Liste des Descriptions</h2>
      <ul>
        {descriptions.map((desc) => (
          <li key={desc.id}>
            <h3>{desc.title}</h3>
            <p>{desc.content}</p>
            <img src={desc.image} alt={desc.title} width={150} height={150} />
            <button onClick={() => handleEdit(desc)}>Éditer</button>
            <button onClick={() => handleDelete(desc.id)}>Supprimer</button>
          </li>
        ))}
      </ul>

      <h1>Gérer les Compétences</h1>
      
      <form onSubmit={handleSkillSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nom de la compétence" 
          value={skillFormData.name} 
          onChange={handleSkillChange} 
          required 
        />
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
              setSkillFormData({ ...skillFormData, image: reader.result }); // Convertir l'image en base64
            };

            if (file) {
              reader.readAsDataURL(file);
            }
          }} 
          required 
        />
        <button type="submit">{editingSkillId ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <h2>Liste des Compétences</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <h3>{skill.name}</h3>
            <img src={skill.image} alt={skill.name} width={150} height={150} />
            <button onClick={() => handleSkillEdit(skill)}>Éditer</button>
            <button onClick={() => handleSkillDelete(skill.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profil;
