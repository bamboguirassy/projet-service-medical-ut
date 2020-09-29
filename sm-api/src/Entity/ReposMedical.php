<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ReposMedical
 *
 * @ORM\Table(name="repos_medical", indexes={@ORM\Index(name="fk_repos_medical_docteur1_idx", columns={"docteur"}), @ORM\Index(name="fk_repos_medical_dossier1_idx", columns={"dossier"})})
 * @ORM\Entity
 */
class ReposMedical
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
     * @ORM\Column(name="date", type="date", nullable=false)
     */
    private $date;

    /**
     * @var int|null
     *
     * @ORM\Column(name="nombre_jour", type="integer", nullable=true)
     */
    private $nombreJour;

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

    public function getId()
    {
        return $this->id;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getNombreJour()
    {
        return $this->nombreJour;
    }

    public function setNombreJour($nombreJour): self
    {
        $this->nombreJour = $nombreJour;

        return $this;
    }

    public function getUserEmail()
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

    public function setDocteur($docteur): self
    {
        $this->docteur = $docteur;

        return $this;
    }

    public function getDossier()
    {
        return $this->dossier;
    }

    public function setDossier($dossier): self
    {
        $this->dossier = $dossier;

        return $this;
    }

}
