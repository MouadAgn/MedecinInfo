<?php

namespace App\Entity;

use App\Repository\PatientRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
class Patient
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 75)]
    private ?string $Name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $DoB = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $Gender = null;

    #[ORM\Column(nullable: true)]
    private ?int $Phone = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): static
    {
        $this->Name = $Name;

        return $this;
    }

    public function getDoB(): ?\DateTimeInterface
    {
        return $this->DoB;
    }

    public function setDoB(\DateTimeInterface $DoB): static
    {
        $this->DoB = $DoB;

        return $this;
    }

    public function getGender(): ?int
    {
        return $this->Gender;
    }

    public function setGender(int $Gender): static
    {
        $this->Gender = $Gender;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->Phone;
    }

    public function setPhone(?int $Phone): static
    {
        $this->Phone = $Phone;

        return $this;
    }
}
