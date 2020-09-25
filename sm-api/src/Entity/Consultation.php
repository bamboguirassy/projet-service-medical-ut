<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Consultation
 *
 * @ORM\Table(name="consultation", indexes={@ORM\Index(name="fk_consultation_pathologie1_idx", columns={"pathologie_diagnostiquee"}), @ORM\Index(name="fk_consultation_dossier_idx", columns={"dossier"}), @ORM\Index(name="fk_consultation_docteur1_idx", columns={"docteur"})})
 * @ORM\Entity
 */
class Consultation
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
     * @var \DateTime|null
     *
     * @ORM\Column(name="date", type="date", nullable=true)
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=45, nullable=false, options={"comment"="mail de l'utilisateur ayant opéré l'action"})
     */
    private $userEmail;

    /**
     * @var \Docteur
     *
     * @ORM\ManyToOne(targetEntity="Docteur")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="docteur", referencedColumnName="id")
     * })
     */
    private $docteur;

    /**
     * @var \Dossier
     *
     * @ORM\ManyToOne(targetEntity="Dossier")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="dossier", referencedColumnName="id")
     * })
     */
    private $dossier;

    /**
     * @var \Pathologie
     *
     * @ORM\ManyToOne(targetEntity="Pathologie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pathologie_diagnostiquee", referencedColumnName="id")
     * })
     */
    private $pathologieDiagnostiquee;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(?\DateTimeInterface $date): self
    {
        $this->date = $date;

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

    public function getDocteur()
    {
        return $this->docteur;
    }

    public function setDocteur(?Docteur $docteur): self
    {
        $this->docteur = $docteur;

        return $this;
    }

    public function getDossier()
    {
        return $this->dossier;
    }

    public function setDossier(?Dossier $dossier): self
    {
        $this->dossier = $dossier;

        return $this;
    }

    public function getPathologieDiagnostiquee()
    {
        return $this->pathologieDiagnostiquee;
    }

    public function setPathologieDiagnostiquee(?Pathologie $pathologieDiagnostiquee): self
    {
        $this->pathologieDiagnostiquee = $pathologieDiagnostiquee;

        return $this;
    }

}
