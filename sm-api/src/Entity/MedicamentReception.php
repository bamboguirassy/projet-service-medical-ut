<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MedicamentReception
 *
 * @ORM\Table(name="medicament_reception", indexes={@ORM\Index(name="fk_medicament_has_bon_reception_medicament1_idx", columns={"medicament"}), @ORM\Index(name="fk_medicament_has_bon_reception_bon_reception1_idx", columns={"bon_reception"})})
 * @ORM\Entity
 */
class MedicamentReception
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
     * @var \BonReception
     *
     * @ORM\ManyToOne(targetEntity="BonReception")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="bon_reception", referencedColumnName="id")
     * })
     */
    private $bonReception;

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

    public function getBonReception(): ?BonReception
    {
        return $this->bonReception;
    }

    public function setBonReception(?BonReception $bonReception): self
    {
        $this->bonReception = $bonReception;

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
