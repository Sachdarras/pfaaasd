-- CreateTable
CREATE TABLE `Description` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `image` LONGTEXT NOT NULL,
    UNIQUE INDEX `Description_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `lien` VARCHAR(191) NOT NULL,
    `repo` VARCHAR(191) NOT NULL,
    UNIQUE INDEX `Project_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` LONGTEXT NOT NULL,
    `order` INTEGER NOT NULL,
    UNIQUE INDEX `Skill_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectSkill` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
    UNIQUE INDEX `_ProjectSkill_AB_unique`(`A`, `B`),
    INDEX `_ProjectSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectSkill` ADD CONSTRAINT `_ProjectSkill_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectSkill` ADD CONSTRAINT `_ProjectSkill_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Ajouter la description
INSERT INTO Description (name, title, subtitle, content, image) VALUES 
('Alexandre-Sacha Darras', 'Développeur web full-stack JavaScript', 'À propos de moi', 'Après 10 ans passés dans le milieu du spectacle comme régisseur et concepteur lumières, il était temps de changer de vie. Je me suis donc orienté vers un métier qui reste créatif. C''est pour cela que mon regard s''est posé sur le développement web. Pour cela, je recherche une alternance pour une durée de 15 mois, afin de préparer un diplôme de Concepteur Développeur d''Applications de niveau Bac+4.', '/assets/images/profil.jpg');

-- Ajouter les compétences
INSERT INTO Skill (name, image, `order`) VALUES
('HTML', '/assets/skills/html-1.svg', 1),
('CSS', '/assets/skills/css-3.svg', 2),
('JavaScript', '/assets/skills/javascript-1.svg', 3),
('Git', '/assets/skills/git-icon.svg', 4),
('GitHub', '/assets/skills/github-icon-1.svg', 5),
('Figma', '/assets/skills/figma-5.svg', 6),
('NPM', '/assets/skills/npm.svg', 7),
('Git Bash', '/assets/skills/git-bash.svg', 8),
('Node.js', '/assets/skills/nodejs-1.svg', 9),
('Leaflet', '/assets/skills/leaflet-seeklogo.svg', 10),
('React', '/assets/skills/react-2.svg', 11),
('Sass', '/assets/skills/sass-1.svg', 12),
('MySQL', '/assets/skills/mysql.png', 13),
('Three.js', '/assets/skills/three-js-icon.svg', 14),
('Prisma', '/assets/skills/prisma.svg', 15),
('NextJs', '/assets/skills/next-js.svg', 16);
 


-- Ajouter les projets
INSERT INTO Project (name, img, description, lien, repo) VALUES
('go past or back to future', '/assets/project/gopastorbacktofuture.png', 'Voyage Temporel Humoristique : une chronologie animée décalée de l''histoire de l''humanité, de l''âge de pierre aux voyages dans l''espace. Avec des personnages loufoques et des clins d''œil humoristiques, découvrez le passé de manière ludique et pédagogique !', 'https://sachdarras.github.io/WCS-P1-Chronologie-Anim-e/', 'https://github.com/Sachdarras/WCS-P1-Chronologie-Anim-e'),
('Crew-Dragon-Location-Map', '/assets/project/Crewdragonlocationmap.png', 'J''ai créé une carte interactive qui permet de localiser tous les élèves de ma promotion à travers la France. Cette carte facilite la communication et les rencontres entre les membres de la promo, en leur permettant de visualiser où se trouvent leurs camarades géographiquement.', 'https://sachdarras.github.io/Crew-Dragon-Location-Map/', 'https://github.com/Sachdarras/Crew-Dragon-Location-Map'),
('Star-Wild', '/assets/project/Star Wild.png', 'Bienvenue sur Star Wild, votre passerelle virtuelle vers les merveilles et les mystères du système solaire, présentée dans une expérience immersive en 3D. Explorez les planètes, les lunes et les astéroïdes avec un système de carte interactif qui vous permet de plonger dans les détails de chaque corps céleste.', 'https://star-wild.netlify.app/', 'https://github.com/Sachdarras/JS-RemoteFR-CrewDragon-P2-Team3'),
('AgendStrauss', '/assets/project/agendstrauss.png', 'L''agend strauss est un ensemble de fonctionnalités avec une todo-list, une calculatrice, un agenda et une horloge numérique.', 'https://agendstrauss.netlify.app/', 'https://github.com/Sachdarras/agendStrauss'),
('Échappée Célébrement Fantasque', '/assets/project/ECF.png', 'Échappée Célèbrement Fantasque est une plateforme en ligne unique qui propose aux utilisateurs de choisir des sujets thématiques et de les explorer en compagnie de célébrités ou de personnages fictifs...', 'https://echappee-celebrement-fantasque.netlify.app/', 'https://github.com/Sachdarras/wcs-Protojam-goupeA'),
('Origins Digital', '/assets/project/orginsdigital.png', 'Origin Digital est une plateforme innovante dédiée au visionnage de vidéos...', 'https://origins-digital.remote-fr-2.wilders.dev/', 'https://github.com/WildCodeSchool-2024-02/JS-RemoteFR-CrewDragon-P3-Origins-Digital');

-- Lier les compétences aux projets (relation many-to-many)
INSERT INTO `_ProjectSkill` (A, B) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 7), (2, 8), (2, 10), (2, 9),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 7), (3, 8), (3, 11), (3, 12), (3, 14), (3, 9),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 7), (4, 8), (4, 11), (4, 12), (4, 9),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 7), (5, 8), (5, 11), (5, 12), (5, 9),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 7), (6, 8), (6, 11), (6, 12), (6, 9);

-- Insert User
INSERT INTO `User` (id, email, password, role) VALUES
(1, 'sachdarras@gmail.com', '$2b$10$OnttE.Gpq/8lRLFcHhIR5.qFg9Kuz5dFZB3ACH1N0HbLb41QLG2Ra', 'admin');
