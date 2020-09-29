<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Inputation
 *
 * @ORM\Table(name="inputation", indexes={@ORM\Index(name="fk_inputation_structure_hospitaliere1_idx", columns={"structure_hospitaliere"}), @ORM\Index(name="fk_inputation_dossier1_idx", columns={"dossier"})})
 * @ORM\Entity
 */
class Inputation
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
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=45, nullable=false, options={"comment"="mail de l'utilisateur ayant opéré l'action"})
     */
    private $userEmail;

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
     * @var \StructurePartenaire
     *
     * @ORM\ManyToOne(targetEntity="StructurePartenaire")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="structure_hospitaliere", referencedColumnName="id")
     * })
     */
    private $structureHospitaliere;

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

    public function getUserEmail()
    {
        return $this->userEmail;
    }

    public function setUserEmail(string $userEmail): self
    {
        $this->userEmail = $userEmail;

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

    public function getStructureHospitaliere()
    {
        return $this->structureHospitaliere;
    }

    public function setStructureHospitaliere($structureHospitaliere): self
    {
        $this->structureHospitaliere = $structureHospitaliere;

        return $this;
    }


}
