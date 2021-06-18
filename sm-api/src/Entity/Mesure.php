<?php

namespace App\Entity;

use App\Repository\MesureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MesureRepository::class)
 */
class Mesure
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tensionArterielle;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $temperature;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $pouls;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $frequenceRespiratoire;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $poids;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $glycemie;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $examenParacliniques;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $examenCliniques;

    /**
     * @ORM\OneToOne(targetEntity=RendezVous::class, inversedBy="mesure", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $rendezVous;

    /**
     * @ORM\ManyToMany(targetEntity=Medicament::class)
     */
    private $medicaments;

    /**
     * @ORM\ManyToMany(targetEntity=Symptome::class)
     */
    private $symptomes;

    public function __construct()
    {
        $this->medicaments = new ArrayCollection();
        $this->symptomes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTensionArterielle(): ?string
    {
        return $this->tensionArterielle;
    }

    public function setTensionArterielle(?string $tensionArterielle): self
    {
        $this->tensionArterielle = $tensionArterielle;

        return $this;
    }

    public function getTemperature(): ?string
    {
        return $this->temperature;
    }

    public function setTemperature(?string $temperature): self
    {
        $this->temperature = $temperature;

        return $this;
    }

    public function getPouls(): ?string
    {
        return $this->pouls;
    }

    public function setPouls(?string $pouls): self
    {
        $this->pouls = $pouls;

        return $this;
    }

    public function getFrequenceRespiratoire(): ?string
    {
        return $this->frequenceRespiratoire;
    }

    public function setFrequenceRespiratoire(?string $frequenceRespiratoire): self
    {
        $this->frequenceRespiratoire = $frequenceRespiratoire;

        return $this;
    }

    public function getPoids(): ?string
    {
        return $this->poids;
    }

    public function setPoids(?string $poids): self
    {
        $this->poids = $poids;

        return $this;
    }

    public function getGlycemie(): ?string
    {
        return $this->glycemie;
    }

    public function setGlycemie(?string $glycemie): self
    {
        $this->glycemie = $glycemie;

        return $this;
    }

    public function getExamenParacliniques(): ?string
    {
        return $this->examenParacliniques;
    }

    public function setExamenParacliniques(?string $examenParacliniques): self
    {
        $this->examenParacliniques = $examenParacliniques;

        return $this;
    }

    public function getExamenCliniques(): ?string
    {
        return $this->examenCliniques;
    }

    public function setExamenCliniques(?string $examenCliniques): self
    {
        $this->examenCliniques = $examenCliniques;

        return $this;
    }

    public function getRendezVous(): ?RendezVous
    {
        return $this->rendezVous;
    }

    public function setRendezVous(RendezVous $rendezVous): self
    {
        $this->rendezVous = $rendezVous;

        return $this;
    }

    /**
     * @return Collection|Medicament[]
     */
    public function getMedicament(): Collection
    {
        return $this->medicaments;
    }

    public function addMedicament(Medicament $medicaments): self
    {
        if (!$this->medicaments->contains($medicaments)) {
            $this->medicaments[] = $medicaments;
        }

        return $this;
    }

    public function removeMedicament(Medicament $medicaments): self
    {
        if ($this->medicaments->contains($medicaments)) {
            $this->medicaments->removeElement($medicaments);
        }

        return $this;
    }

    /**
     * @return Collection|Symptome[]
     */
    public function getSymptomes(): Collection
    {
        return $this->symptomes;
    }

    public function addSymptome(Symptome $symptome): self
    {
        if (!$this->symptomes->contains($symptome)) {
            $this->symptomes[] = $symptome;
        }

        return $this;
    }

    public function removeSymptome(Symptome $symptome): self
    {
        if ($this->symptomes->contains($symptome)) {
            $this->symptomes->removeElement($symptome);
        }

        return $this;
    }
}
