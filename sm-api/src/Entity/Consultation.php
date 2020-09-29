<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @ORM\OneToMany(targetEntity=Symptome::class, mappedBy="consultation")
     */
    private $symptomes;

    /**
     * @ORM\OneToMany(targetEntity=MedicamentRemis::class, mappedBy="consultation")
     */
    private $medicamentPrescrits;

    public function __construct()
    {
        $this->symptomes = new ArrayCollection();
        $this->medicamentPrescrits = new ArrayCollection();
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

    public function getPathologieDiagnostiquee()
    {
        return $this->pathologieDiagnostiquee;
    }

    public function setPathologieDiagnostiquee($pathologieDiagnostiquee): self
    {
        $this->pathologieDiagnostiquee = $pathologieDiagnostiquee;

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
            $symptome->setConsultation1($this);
        }

        return $this;
    }

    public function removeSymptome(Symptome $symptome): self
    {
        if ($this->symptomes->contains($symptome)) {
            $this->symptomes->removeElement($symptome);
            // set the owning side to null (unless already changed)
            if ($symptome->getConsultation1() === $this) {
                $symptome->setConsultation1(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|MedicamentRemis[]
     */
    public function getMedicamentPrescrits(): Collection
    {
        return $this->medicamentPrescrits;
    }

    public function addMedicamentPrescrit(MedicamentRemis $medicamentPrescrit): self
    {
        if (!$this->medicamentPrescrits->contains($medicamentPrescrit)) {
            $this->medicamentPrescrits[] = $medicamentPrescrit;
            $medicamentPrescrit->setConsultation1($this);
        }

        return $this;
    }

    public function removeMedicamentPrescrit(MedicamentRemis $medicamentPrescrit): self
    {
        if ($this->medicamentPrescrits->contains($medicamentPrescrit)) {
            $this->medicamentPrescrits->removeElement($medicamentPrescrit);
            // set the owning side to null (unless already changed)
            if ($medicamentPrescrit->getConsultation1() === $this) {
                $medicamentPrescrit->setConsultation1(null);
            }
        }

        return $this;
    }

}
