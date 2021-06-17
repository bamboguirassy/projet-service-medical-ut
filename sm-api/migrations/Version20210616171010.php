<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210616171010 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE pathologie_consultation (id INT AUTO_INCREMENT NOT NULL, pathologie_id INT NOT NULL, consultation_id INT NOT NULL, INDEX IDX_F44A8471E7F789D4 (pathologie_id), INDEX IDX_F44A847162FF6CDF (consultation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE pathologie_consultation ADD CONSTRAINT FK_F44A8471E7F789D4 FOREIGN KEY (pathologie_id) REFERENCES pathologie (id)');
        $this->addSql('ALTER TABLE pathologie_consultation ADD CONSTRAINT FK_F44A847162FF6CDF FOREIGN KEY (consultation_id) REFERENCES consultation (id)');
        $this->addSql('ALTER TABLE dossier CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COMMENT \'definir si type_patient = famille
        epoux ou enfant\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE pathologie_consultation');
        $this->addSql('ALTER TABLE dossier CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COLLATE utf8_general_ci COMMENT \'definir si type_patient = famille
                epoux ou enfant\'');
    }
}
