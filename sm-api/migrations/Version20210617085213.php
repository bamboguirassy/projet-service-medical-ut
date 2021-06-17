<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210617085213 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE consultation DROP FOREIGN KEY fk_consultation_pathologie1');
        $this->addSql('DROP INDEX fk_consultation_pathologie1_idx ON consultation');
        $this->addSql('ALTER TABLE consultation DROP pathologie_diagnostiquee');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE pathologie_consultation');
        $this->addSql('ALTER TABLE consultation ADD pathologie_diagnostiquee INT DEFAULT NULL');
        $this->addSql('ALTER TABLE consultation ADD CONSTRAINT fk_consultation_pathologie1 FOREIGN KEY (pathologie_diagnostiquee) REFERENCES pathologie (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX fk_consultation_pathologie1_idx ON consultation (pathologie_diagnostiquee)');
        $this->addSql('ALTER TABLE dossier DROP description_genre_vie, CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COLLATE utf8_general_ci COMMENT \'definir si type_patient = famille
                epoux ou enfant\'');
    }
}
