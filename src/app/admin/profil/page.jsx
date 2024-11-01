"use client"; // Assurez-vous que cette ligne est au début de votre fichier

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Importez Link pour la navigation
import { useRouter } from 'next/navigation'; // Ajoutez cette ligne pour importer useRouter
import Cookies from 'js-cookie'; // Importer js-cookie
import Image from 'next/image'; // Importer le composant Image de Next.js

const ProfilAdmin = () => {
  const router = useRouter(); // Obtenez une instance du routeur
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('userId'); // Récupérer l'ID de l'utilisateur à partir des cookies
    if (!userId) {
      router.push('/auth/signin'); // Rediriger vers la page de connexion si non authentifié
    } else {
      setIsAuthenticated(true); // L'utilisateur est authentifié
    }
  }, [router]); // Ajoutez router comme dépendance

  useEffect(() => {
    // Récupération des descriptions
    fetch('/api/description')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des descriptions');
        }
        return res.json();
      })
      .then((data) => setDescriptions(data))
      .catch((error) => console.error('Erreur:', error));

    // Récupération des compétences
    fetch('/api/skills')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la récupération des compétences');
        }
        return res.json();
      })
      .then((data) => setSkills(data))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/description/${editingId}` : '/api/description';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setDescriptions((prev) => {
          if (editingId) {
            return prev.map((desc) => (desc.id === editingId ? data : desc));
          }
          return [...prev, data];
        });
        setFormData({ name: '', title: '', subtitle: '', content: '', image: '' });
        setEditingId(null);
      });
  };

  const handleDelete = (id) => {
    fetch(`/api/description/${id}`, { method: 'DELETE' }).then(() => {
      setDescriptions((prev) => prev.filter((desc) => desc.id !== id));
    });
  };

  const handleEdit = (description) => {
    setFormData({ ...description });
    setEditingId(description.id);
  };

  // Gestion des compétences

  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setSkillFormData({ ...skillFormData, [name]: value });
  };

  const handleSkillImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSkillFormData({ ...skillFormData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    const method = editingSkillId ? 'PUT' : 'POST';
    const url = editingSkillId ? `/api/skills/${editingSkillId}` : '/api/skills';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSkills((prev) => {
          if (editingSkillId) {
            return prev.map((skill) => (skill.id === editingSkillId ? data : skill));
          }
          return [...prev, data];
        });
        setSkillFormData({ name: '', image: '' });
        setEditingSkillId(null);
      });
  };

  const handleSkillDelete = (id) => {
    fetch(`/api/skills/${id}`, { method: 'DELETE' }).then(() => {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    });
  };

  const handleSkillEdit = (skill) => {
    setSkillFormData({ ...skill });
    setEditingSkillId(skill.id);
  };

  const handleSkillMove = (index, direction) => {
    const newSkills = [...skills];
    const [movedSkill] = newSkills.splice(index, 1);

    if (direction === 'up' && index > 0) {
      newSkills.splice(index - 1, 0, movedSkill); // Déplacer vers le haut
    } else if (direction === 'down' && index < newSkills.length - 1) {
      newSkills.splice(index + 1, 0, movedSkill); // Déplacer vers le bas
    }

    setSkills(newSkills);

    // Mettez à jour l'ordre dans la base de données
    const skillsUpdate = newSkills.map((skill, newIndex) => ({
      id: skill.id,
      order: newIndex,
    }));

    // Faites un appel PATCH à votre API pour mettre à jour l'ordre
    fetch('/api/skills/order', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skillsUpdate),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la mise à jour de l\'ordre des compétences');
        }
      })
      .catch((error) => console.error('Erreur lors de la mise à jour de l\'ordre:', error));
  };
// Votre code existant ici...

return (
  <>
    <nav className='navadmin'>
      <Link href="/admin">Retour à l'Admin</Link>
    </nav>
    <div className="admin-container">
      <h1>Profil - Gérer les Descriptions</h1>

      <h2>Liste des Descriptions</h2>
      <ul>
        {descriptions.map((desc) => (
          <li key={desc.id}>
            <h3>{desc.name}</h3>
            <p>{desc.title}</p>
            <p>{desc.subtitle}</p>
            <p>{desc.content}</p>
            <Image src={desc.image} alt={desc.name} width={150} height={150} />
            <div className="skill-actions">
              <button onClick={() => handleEdit(desc)}>Éditer</button>
              <button onClick={() => handleDelete(desc.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulaire pour modifier les descriptions */}
      {editingId && (
        <form className="formdesc" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Modifier la Description' : 'Ajouter une Description'}</h2>
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
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
          <button type="button" onClick={() => setEditingId(null)}>Annuler</button>
        </form>
      )}
    </div>

    <div className="skill-container">
      <h2>Liste des Compétences</h2>
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
          accept="image/*"
          onChange={handleSkillImageChange}
          required
        />
        <button type="submit">{editingSkillId ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
      <ul>
        {skills.map((skill, index) => (
          <li key={skill.id}>
            <h3>{skill.name}</h3>
            <Image src={skill.image} alt={skill.name} width={150} height={150} />
            <div className="skill-actions">
              <button onClick={() => handleSkillEdit(skill)}>Éditer</button>
              <button onClick={() => handleSkillDelete(skill.id)}>Supprimer</button>
              <button onClick={() => handleSkillMove(index, 'up')} disabled={index === 0}>Monter</button>
              <button onClick={() => handleSkillMove(index, 'down')} disabled={index === skills.length - 1}>Descendre</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
);


};

export default ProfilAdmin;
