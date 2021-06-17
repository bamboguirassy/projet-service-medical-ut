<?php

namespace App\Entity;

use App\Repository\PathologieConsultationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=PathologieConsultationRepository::class)
 */
class PathologieConsultation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Pathologie::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $pathologie;

    /**
     * @ORM\ManyToOne(targetEntity=Consultation::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private $consultation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPathologie(): ?Pathologie
    {
        return $this->pathologie;
    }

    public function setPathologie(?Pathologie $pathologie): self
    {
        $this->pathologie = $pathologie;

        return $this;
    }

    public function getConsultation(): ?Consultation
    {
        return $this->consultation;
    }

    public function setConsultation(?Consultation $consultation): self
    {
        $this->consultation = $consultation;

        return $this;
    }
}
