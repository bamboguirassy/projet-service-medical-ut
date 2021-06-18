<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210618093456 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE pathologie_consultation (consultation_id INT NOT NULL, pathologie_id INT NOT NULL, INDEX IDX_F44A847162FF6CDF (consultation_id), INDEX IDX_F44A8471E7F789D4 (pathologie_id), PRIMARY KEY(consultation_id, pathologie_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mesure (id INT AUTO_INCREMENT NOT NULL, rendez_vous_id INT NOT NULL, tension_arterielle VARCHAR(255) DEFAULT NULL, temperature VARCHAR(255) DEFAULT NULL, pouls VARCHAR(255) DEFAULT NULL, frequence_respiratoire VARCHAR(255) DEFAULT NULL, poids VARCHAR(255) DEFAULT NULL, glycemie VARCHAR(255) DEFAULT NULL, examen_paracliniques VARCHAR(255) DEFAULT NULL, examen_cliniques VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_5F1B6E7091EF7EAA (rendez_vous_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mesure_medicament (mesure_id INT NOT NULL, medicament_id INT NOT NULL, INDEX IDX_6A48D9B443AB22FA (mesure_id), INDEX IDX_6A48D9B4AB0D61F7 (medicament_id), PRIMARY KEY(mesure_id, medicament_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mesure_symptome (mesure_id INT NOT NULL, symptome_id INT NOT NULL, INDEX IDX_BAEB5D6843AB22FA (mesure_id), INDEX IDX_BAEB5D6812B83D77 (symptome_id), PRIMARY KEY(mesure_id, symptome_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE pathologie_consultation ADD CONSTRAINT FK_F44A847162FF6CDF FOREIGN KEY (consultation_id) REFERENCES consultation (id)');
        $this->addSql('ALTER TABLE pathologie_consultation ADD CONSTRAINT FK_F44A8471E7F789D4 FOREIGN KEY (pathologie_id) REFERENCES pathologie (id)');
        $this->addSql('ALTER TABLE mesure ADD CONSTRAINT FK_5F1B6E7091EF7EAA FOREIGN KEY (rendez_vous_id) REFERENCES rendez_vous (id)');
        $this->addSql('ALTER TABLE mesure_medicament ADD CONSTRAINT FK_6A48D9B443AB22FA FOREIGN KEY (mesure_id) REFERENCES mesure (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mesure_medicament ADD CONSTRAINT FK_6A48D9B4AB0D61F7 FOREIGN KEY (medicament_id) REFERENCES medicament (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mesure_symptome ADD CONSTRAINT FK_BAEB5D6843AB22FA FOREIGN KEY (mesure_id) REFERENCES mesure (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE mesure_symptome ADD CONSTRAINT FK_BAEB5D6812B83D77 FOREIGN KEY (symptome_id) REFERENCES symptome (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE mesure_medicament DROP FOREIGN KEY FK_6A48D9B443AB22FA');
        $this->addSql('ALTER TABLE mesure_symptome DROP FOREIGN KEY FK_BAEB5D6843AB22FA');
        $this->addSql('DROP TABLE pathologie_consultation');
        $this->addSql('DROP TABLE mesure');
        $this->addSql('DROP TABLE mesure_medicament');
        $this->addSql('DROP TABLE mesure_symptome');
        $this->addSql('ALTER TABLE dossier CHANGE lien_parente lien_parente VARCHAR(45) DEFAULT NULL COLLATE utf8_general_ci COMMENT \'definir si type_patient = famille
                epoux ou enfant\'');
    }
}
