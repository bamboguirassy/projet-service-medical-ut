<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201127130317 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql('ALTER TABLE dossier CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COMMENT \'definir si type_patient = famille
        epoux ou enfant\'');
        $this->addSql('ALTER TABLE rendez_vous ADD consultation INT NOT NULL, DROP dossier');
        $this->addSql('ALTER TABLE rendez_vous ADD CONSTRAINT FK_65E8AA0A964685A6 FOREIGN KEY (consultation) REFERENCES consultation (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_65E8AA0A964685A6 ON rendez_vous (consultation)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE dossier CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COLLATE utf8_general_ci COMMENT \'definir si type_patient = famille
                epoux ou enfant\'');
        $this->addSql('ALTER TABLE rendez_vous DROP FOREIGN KEY FK_65E8AA0A964685A6');
        $this->addSql('DROP INDEX UNIQ_65E8AA0A964685A6 ON rendez_vous');
        $this->addSql('ALTER TABLE rendez_vous ADD dossier INT DEFAULT NULL, DROP consultation');
    }
}
