<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200912122950 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE medicament_remis DROP FOREIGN KEY fk_medicament_consultation_consultation1');
        $this->addSql('ALTER TABLE symptome DROP FOREIGN KEY fk_symptome_consultation1');
        $this->addSql('DROP TABLE consultation');
        $this->addSql('DROP TABLE inputation');
        $this->addSql('DROP TABLE medicament_reception');
        $this->addSql('DROP TABLE medicament_remis');
        $this->addSql('DROP TABLE repos_medical');
        $this->addSql('DROP TABLE symptome');
        $this->addSql('ALTER TABLE dossier ADD etat TINYINT(1) NOT NULL, CHANGE cni cni VARCHAR(45) NOT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE consultation (id INT AUTO_INCREMENT NOT NULL, dossier INT NOT NULL, pathologie_diagnostiquee INT DEFAULT NULL COMMENT \'qui ne sera obligatoire dans le formulaire de creation mais avec ajout d\'\'une section pour ajouter la pathologie au cas ou c\'\'est pas définie\', docteur INT NOT NULL COMMENT \'docteur ayant consulté\', date DATE DEFAULT NULL, user_email VARCHAR(45) NOT NULL COLLATE utf8_general_ci COMMENT \'mail de l\'\'utilisateur ayant opéré l\'\'action\', INDEX fk_consultation_pathologie1_idx (pathologie_diagnostiquee), INDEX fk_consultation_dossier_idx (dossier), INDEX fk_consultation_docteur1_idx (docteur), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE inputation (id INT AUTO_INCREMENT NOT NULL, dossier INT NOT NULL, structure_hospitaliere INT NOT NULL, date DATE NOT NULL, user_email VARCHAR(45) NOT NULL COLLATE utf8_general_ci COMMENT \'mail de l\'\'utilisateur ayant opéré l\'\'action\', INDEX fk_inputation_structure_hospitaliere1_idx (structure_hospitaliere), INDEX fk_inputation_dossier1_idx (dossier), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE medicament_reception (id INT AUTO_INCREMENT NOT NULL, medicament INT NOT NULL, bon_reception INT NOT NULL, quantite INT NOT NULL, INDEX fk_medicament_has_bon_reception_medicament1_idx (medicament), INDEX fk_medicament_has_bon_reception_bon_reception1_idx (bon_reception), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE medicament_remis (id INT AUTO_INCREMENT NOT NULL, consultation INT NOT NULL, medicament INT NOT NULL, quantite INT NOT NULL, INDEX fk_medicament_consultation_medicament1_idx (medicament), INDEX fk_medicament_consultation_consultation1_idx (consultation), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE repos_medical (id INT AUTO_INCREMENT NOT NULL, dossier INT NOT NULL, docteur INT NOT NULL COMMENT \'docteur ayant prescrit le repos medical\', date DATE NOT NULL, nombre_jour INT DEFAULT NULL, user_email VARCHAR(45) NOT NULL COLLATE utf8_general_ci COMMENT \'mail de l\'\'utilisateur ayant opéré l\'\'action\', INDEX fk_repos_medical_docteur1_idx (docteur), INDEX fk_repos_medical_dossier1_idx (dossier), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE symptome (id INT AUTO_INCREMENT NOT NULL, consultation INT NOT NULL, nom VARCHAR(45) NOT NULL COLLATE utf8_general_ci, INDEX fk_symptome_consultation1_idx (consultation), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE consultation ADD CONSTRAINT fk_consultation_docteur1 FOREIGN KEY (docteur) REFERENCES docteur (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE consultation ADD CONSTRAINT fk_consultation_dossier FOREIGN KEY (dossier) REFERENCES dossier (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE consultation ADD CONSTRAINT fk_consultation_pathologie1 FOREIGN KEY (pathologie_diagnostiquee) REFERENCES pathologie (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE inputation ADD CONSTRAINT fk_inputation_dossier1 FOREIGN KEY (dossier) REFERENCES dossier (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE inputation ADD CONSTRAINT fk_inputation_structure_hospitaliere1 FOREIGN KEY (structure_hospitaliere) REFERENCES structure_partenaire (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE medicament_reception ADD CONSTRAINT fk_medicament_has_bon_reception_bon_reception1 FOREIGN KEY (bon_reception) REFERENCES bon_reception (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE medicament_reception ADD CONSTRAINT fk_medicament_has_bon_reception_medicament1 FOREIGN KEY (medicament) REFERENCES medicament (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE medicament_remis ADD CONSTRAINT fk_medicament_consultation_consultation1 FOREIGN KEY (consultation) REFERENCES consultation (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE medicament_remis ADD CONSTRAINT fk_medicament_consultation_medicament1 FOREIGN KEY (medicament) REFERENCES medicament (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE repos_medical ADD CONSTRAINT fk_repos_medical_docteur1 FOREIGN KEY (docteur) REFERENCES docteur (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE repos_medical ADD CONSTRAINT fk_repos_medical_dossier1 FOREIGN KEY (dossier) REFERENCES dossier (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE symptome ADD CONSTRAINT fk_symptome_consultation1 FOREIGN KEY (consultation) REFERENCES consultation (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE dossier DROP etat, CHANGE cni cni VARCHAR(45) DEFAULT NULL COLLATE utf8_general_ci');
    }
}
