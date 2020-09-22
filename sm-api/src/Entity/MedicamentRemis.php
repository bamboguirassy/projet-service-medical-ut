<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MedicamentRemis
 *
 * @ORM\Table(name="medicament_remis", indexes={@ORM\Index(name="fk_medicament_consultation_medicament1_idx", columns={"medicament"}), @ORM\Index(name="fk_medicament_consultation_consultation1_idx", columns={"consultation"})})
 * @ORM\Entity
 */
class MedicamentRemis
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
     * @var int
     *
     * @ORM\Column(name="quantite", type="integer", nullable=false)
     */
    private $quantite;

    /**
     * @var \Consultation
     *
     * @ORM\ManyToOne(targetEntity="Consultation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="consultation", referencedColumnName="id")
     * })
     */
    private $consultation;

    /**
     * @var \Medicament
     *
     * @ORM\ManyToOne(targetEntity="Medicament")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="medicament", referencedColumnName="id")
     * })
     */
    private $medicament;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(int $quantite): self
    {
        $this->quantite = $quantite;

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

    public function getMedicament(): ?Medicament
    {
        return $this->medicament;
    }

    public function setMedicament(?Medicament $medicament): self
    {
        $this->medicament = $medicament;

        return $this;
    }


}
