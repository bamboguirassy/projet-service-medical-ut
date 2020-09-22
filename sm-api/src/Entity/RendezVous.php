<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RendezVous
 *
 * @ORM\Table(name="rendez-vous", indexes={@ORM\Index(name="fk_rendez-vous_dossier1_idx", columns={"dossier"})})
 * @ORM\Entity
 */
class RendezVous
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="datetime", nullable=false)
     */
    private $dateCreation;

    /**
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=45, nullable=false)
     */
    private $userEmail;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_rendez_vous", type="datetime", nullable=false)
     */
    private $dateRendezVous;

    /**
     * @var bool|null
     *
     * @ORM\Column(name="presence", type="boolean", nullable=true, options={"comment"="false par défaut, on le met à true si le patient se présente."})
     */
    private $presence;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=true)
     */
    private $description;

    /**
     * @var \Dossier
     *
     * @ORM\ManyToOne(targetEntity="Dossier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="dossier", referencedColumnName="id")
     * })
     */
    private $dossier;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateCreation(): ?\DateTimeInterface
    {
        return $this->dateCreation;
    }

    public function setDateCreation(\DateTimeInterface $dateCreation): self
    {
        $this->dateCreation = $dateCreation;

        return $this;
    }

    public function getUserEmail(): ?string
    {
        return $this->userEmail;
    }

    public function setUserEmail(string $userEmail): self
    {
        $this->userEmail = $userEmail;

        return $this;
    }

    public function getDateRendezVous(): ?\DateTimeInterface
    {
        return $this->dateRendezVous;
    }

    public function setDateRendezVous(\DateTimeInterface $dateRendezVous): self
    {
        $this->dateRendezVous = $dateRendezVous;

        return $this;
    }

    public function getPresence(): ?bool
    {
        return $this->presence;
    }

    public function setPresence(?bool $presence): self
    {
        $this->presence = $presence;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDossier(): ?Dossier
    {
        return $this->dossier;
    }

    public function setDossier(?Dossier $dossier): self
    {
        $this->dossier = $dossier;

        return $this;
    }


}
