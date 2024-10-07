import skills from "../data/skillsdata";

function Skills() {
  return (
    <div className="skills-container">
      <h2>My Skills</h2>
      <ul className="logo-container">
        {skills.map((skill, index) => (
          <li key={index}>
            <img className="logo" src={skill.img} alt={skill.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
