<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240410134206 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE appointment (id INT AUTO_INCREMENT NOT NULL, patient_id INT DEFAULT NULL, date DATE NOT NULL, time TIME NOT NULL, comment VARCHAR(255) DEFAULT NULL, INDEX IDX_FE38F8446B899279 (patient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(75) NOT NULL, do_b DATE NOT NULL, gender SMALLINT NOT NULL, phone INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE patient_user (patient_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4029B816B899279 (patient_id), INDEX IDX_4029B81A76ED395 (user_id), PRIMARY KEY(patient_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE treatment (id INT AUTO_INCREMENT NOT NULL, patient_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, date_start DATETIME NOT NULL, date_end DATETIME NOT NULL, dosage VARCHAR(30) NOT NULL, comment VARCHAR(255) DEFAULT NULL, INDEX IDX_98013C316B899279 (patient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(75) NOT NULL, email VARCHAR(80) NOT NULL, password VARCHAR(255) NOT NULL, role INT NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8446B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
        $this->addSql('ALTER TABLE patient_user ADD CONSTRAINT FK_4029B816B899279 FOREIGN KEY (patient_id) REFERENCES patient (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE patient_user ADD CONSTRAINT FK_4029B81A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE treatment ADD CONSTRAINT FK_98013C316B899279 FOREIGN KEY (patient_id) REFERENCES patient (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8446B899279');
        $this->addSql('ALTER TABLE patient_user DROP FOREIGN KEY FK_4029B816B899279');
        $this->addSql('ALTER TABLE patient_user DROP FOREIGN KEY FK_4029B81A76ED395');
        $this->addSql('ALTER TABLE treatment DROP FOREIGN KEY FK_98013C316B899279');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE patient_user');
        $this->addSql('DROP TABLE treatment');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
