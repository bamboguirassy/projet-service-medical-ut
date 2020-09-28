<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200928113600 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE consultation CHANGE dossier dossier INT DEFAULT NULL, CHANGE pathologie_diagnostiquee pathologie_diagnostiquee INT DEFAULT NULL, CHANGE docteur docteur INT DEFAULT NULL');
        $this->addSql('ALTER TABLE inputation CHANGE dossier dossier INT DEFAULT NULL, CHANGE structure_hospitaliere structure_hospitaliere INT DEFAULT NULL');
        $this->addSql('ALTER TABLE medicament_reception CHANGE medicament medicament INT DEFAULT NULL, CHANGE bon_reception bon_reception INT DEFAULT NULL');
        $this->addSql('ALTER TABLE medicament_remis CHANGE consultation consultation INT DEFAULT NULL, CHANGE medicament medicament INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rendez_vous CHANGE dossier dossier INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rendez_vous RENAME INDEX fk_rendez-vous_dossier1_idx TO fk_rendezVous_dossier1_idx');
        $this->addSql('ALTER TABLE repos_medical CHANGE dossier dossier INT DEFAULT NULL, CHANGE docteur docteur INT DEFAULT NULL');
        $this->addSql('ALTER TABLE symptome CHANGE consultation consultation INT DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE consultation CHANGE docteur docteur INT NOT NULL COMMENT \'docteur ayant consulté\', CHANGE dossier dossier INT NOT NULL, CHANGE pathologie_diagnostiquee pathologie_diagnostiquee INT DEFAULT NULL COMMENT \'qui ne sera obligatoire dans le formulaire de creation mais avec ajout d\'\'une section pour ajouter la pathologie au cas ou c\'\'est pas définie\'');
        $this->addSql('ALTER TABLE inputation CHANGE dossier dossier INT NOT NULL, CHANGE structure_hospitaliere structure_hospitaliere INT NOT NULL');
        $this->addSql('ALTER TABLE medicament_reception CHANGE bon_reception bon_reception INT NOT NULL, CHANGE medicament medicament INT NOT NULL');
        $this->addSql('ALTER TABLE medicament_remis CHANGE consultation consultation INT NOT NULL, CHANGE medicament medicament INT NOT NULL');
        $this->addSql('ALTER TABLE rendez_vous CHANGE dossier dossier INT NOT NULL');
        $this->addSql('ALTER TABLE rendez_vous RENAME INDEX fk_rendezvous_dossier1_idx TO fk_rendez-vous_dossier1_idx');
        $this->addSql('ALTER TABLE repos_medical CHANGE docteur docteur INT NOT NULL COMMENT \'docteur ayant prescrit le repos medical\', CHANGE dossier dossier INT NOT NULL');
        $this->addSql('ALTER TABLE symptome CHANGE consultation consultation INT NOT NULL');
    }
}
