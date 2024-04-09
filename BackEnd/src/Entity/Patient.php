<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
#[ApiResource()]
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

    /**
     * @var Collection<int, User>
     */
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'patients')]
    private Collection $medecin;

    /**
     * @var Collection<int, Treatment>
     */
    #[ORM\OneToMany(targetEntity: Treatment::class, mappedBy: 'patient')]
    private Collection $treatment;

    /**
     * @var Collection<int, Appointment>
     */
    #[ORM\OneToMany(targetEntity: Appointment::class, mappedBy: 'patient')]
    private Collection $appointment;

    public function __construct()
    {
        $this->medecin = new ArrayCollection();
        $this->treatment = new ArrayCollection();
        $this->appointment = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, User>
     */
    public function getMedecin(): Collection
    {
        return $this->medecin;
    }

    public function addMedecin(User $medecin): static
    {
        if (!$this->medecin->contains($medecin)) {
            $this->medecin->add($medecin);
        }

        return $this;
    }

    public function removeMedecin(User $medecin): static
    {
        $this->medecin->removeElement($medecin);

        return $this;
    }

    /**
     * @return Collection<int, Treatment>
     */
    public function getTreatment(): Collection
    {
        return $this->treatment;
    }

    public function addTreatment(Treatment $treatment): static
    {
        if (!$this->treatment->contains($treatment)) {
            $this->treatment->add($treatment);
            $treatment->setPatient($this);
        }

        return $this;
    }

    public function removeTreatment(Treatment $treatment): static
    {
        if ($this->treatment->removeElement($treatment)) {
            // set the owning side to null (unless already changed)
            if ($treatment->getPatient() === $this) {
                $treatment->setPatient(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointment(): Collection
    {
        return $this->appointment;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointment->contains($appointment)) {
            $this->appointment->add($appointment);
            $appointment->setPatient($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointment->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getPatient() === $this) {
                $appointment->setPatient(null);
            }
        }

        return $this;
    }
}
