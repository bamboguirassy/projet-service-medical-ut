<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Consultation
 *
 * @ORM\Table(name="consultation", indexes={@ORM\Index(name="fk_consultation_pathologie1_idx"), @ORM\Index(name="fk_consultation_dossier_idx", columns={"dossier"}), @ORM\Index(name="fk_consultation_docteur1_idx", columns={"docteur"})})
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
     * @ORM\OneToMany(targetEntity=Symptome::class, mappedBy="consultation")
     */
    private $symptomes;

    /**
     * @ORM\OneToMany(targetEntity=MedicamentRemis::class, mappedBy="consultation")
     */
    private $medicamentRemis;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $medicamentPrescrits;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $motifConsultations;

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
    private $examenCliniques;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $examenParacliniques;

    /**
     * @ORM\OneToOne(targetEntity=RendezVous::class, mappedBy="consultation", cascade={"persist", "remove"})
     */
    private $rendezVous;

    public function __construct()
    {
        $this->symptomes = new ArrayCollection();
        $this->medicamentRemis = new ArrayCollection();
    }

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
            $symptome->setConsultation($this);
        }

        return $this;
    }

    public function removeSymptome(Symptome $symptome): self
    {
        if ($this->symptomes->contains($symptome)) {
            $this->symptomes->removeElement($symptome);
            // set the owning side to null (unless already changed)
            if ($symptome->getConsultation() === $this) {
                $symptome->setConsultation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MedicamentRemis[]
     */
    public function getMedicamentRemis(): Collection
    {
        return $this->medicamentRemis;
    }

    public function addMedicamentRemis(MedicamentRemis $medicamentRemis): self
    {
        if (!$this->medicamentRemis->contains($medicamentRemis)) {
            $this->medicamentRemis[] = $medicamentRemis;
            $medicamentRemis->setConsultation($this);
        }

        return $this;
    }

    public function removeMedicamentRemis(MedicamentRemis $medicamentRemis): self
    {
        if ($this->medicamentRemis->contains($medicamentRemis)) {
            $this->medicamentRemis->removeElement($medicamentRemis);
            // set the owning side to null (unless already changed)
            if ($medicamentRemis->getConsultation() === $this) {
                $medicamentRemis->setConsultation(null);
            }
        }

        return $this;
    }

    public function getMedicamentPrescrits()
    {
        return $this->medicamentPrescrits;
    }

    public function setMedicamentPrescrits($medicamentPrescrits): self
    {
        $this->medicamentPrescrits = $medicamentPrescrits;

        return $this;
    }

    public function getMotifConsultations()
    {
        return $this->motifConsultations;
    }

    public function setMotifConsultations($motifConsultations): self
    {
        $this->motifConsultations = $motifConsultations;

        return $this;
    }

    public function getTensionArterielle()
    {
        return $this->tensionArterielle;
    }

    public function setTensionArterielle($tensionArterielle): self
    {
        $this->tensionArterielle = $tensionArterielle;

        return $this;
    }

    public function getTemperature()
    {
        return $this->temperature;
    }

    public function setTemperature($temperature): self
    {
        $this->temperature = $temperature;

        return $this;
    }

    public function getPouls()
    {
        return $this->pouls;
    }

    public function setPouls($pouls): self
    {
        $this->pouls = $pouls;

        return $this;
    }

    public function getFrequenceRespiratoire()
    {
        return $this->frequenceRespiratoire;
    }

    public function setFrequenceRespiratoire($frequenceRespiratoire): self
    {
        $this->frequenceRespiratoire = $frequenceRespiratoire;

        return $this;
    }

    public function getPoids()
    {
        return $this->poids;
    }

    public function setPoids($poids): self
    {
        $this->poids = $poids;

        return $this;
    }

    public function getGlycemie()
    {
        return $this->glycemie;
    }

    public function setGlycemie($glycemie): self
    {
        $this->glycemie = $glycemie;

        return $this;
    }

    public function getExamenCliniques()
    {
        return $this->examenCliniques;
    }

    public function setExamenCliniques($examenCliniques): self
    {
        $this->examenCliniques = $examenCliniques;

        return $this;
    }

    public function getExamenParacliniques()
    {
        return $this->examenParacliniques;
    }

    public function setExamenParacliniques($examenParacliniques): self
    {
        $this->examenParacliniques = $examenParacliniques;

        return $this;
    }

    public function getRendezVous(): ?RendezVous
    {
        return $this->rendezVous;
    }

    public function setRendezVous(RendezVous $rendezVous): self
    {
        $this->rendezVous = $rendezVous;

        // set the owning side of the relation if necessary
        if ($rendezVous->getConsultation() !== $this) {
            $rendezVous->setConsultation($this);
        }

        return $this;
    }

}
