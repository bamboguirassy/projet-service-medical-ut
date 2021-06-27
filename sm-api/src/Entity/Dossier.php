<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Dossier
 *
 * @ORM\Table(name="dossier")
 * @ORM\Entity
 */
class Dossier
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
     * @var string
     *
     * @ORM\Column(name="numero", type="string", length=45, nullable=false)
     */
    private $numero;

    /**
     * @var string
     *
     * @ORM\Column(name="prenoms", type="string", length=45, nullable=false)
     */
    private $prenoms;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=45, nullable=false)
     */
    private $nom;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_naissance", type="date", nullable=false)
     */
    private $dateNaissance;

    /**
     * @var string
     *
     * @ORM\Column(name="cni", type="string", length=45, nullable=true)
     */
    private $cni;

    /**
     * @var string|null
     *
     * @ORM\Column(name="telephone", type="string", length=45, nullable=true)
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="type_patient", type="string", length=45, nullable=false, options={"comment"="per, pats, famille"})
     */
    private $typePatient;

    /**
     * @var string|null
     *
     * @ORM\Column(name="lien_parente", type="string", length=45, nullable=true, options={"comment"="definir si type_patient = famille
epoux ou enfant"})
     */
    private $lienParente;

    /**
     * @var string
     *
     * @ORM\Column(name="matricule", type="string", length=45, nullable=false)
     */
    private $matricule;

    /**
     * @var string|null
     *
     * @ORM\Column(name="prenom_travailleur", type="string", length=45, nullable=true)
     */
    private $prenomTravailleur;

    /**
     * @var string|null
     *
     * @ORM\Column(name="nom_travailleur", type="string", length=45, nullable=true)
     */
    private $nomTravailleur;

    /**
     * @var string
     *
     * @ORM\Column(name="genre", type="string", length=45, nullable=false, options={"comment"="homme ou femme"})
     */
    private $genre;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_creation", type="date", nullable=false)
     */
    private $dateCreation;

    /**
     * @var string
     *
     * @ORM\Column(name="user_email", type="string", length=45, nullable=false, options={"comment"="mail de l'utilisateur ayant opéré l'action"})
     */
    private $userEmail;

    /**
     * @ORM\Column(type="boolean")
     */
    private $etat;

    /**
     * @ORM\Column(type="string", length=145)
     */
    private $structure;

    /**
     * @ORM\OneToMany(targetEntity=Consultation::class, mappedBy="dossier")
     */
    private $consultations;

    /**
     * @ORM\OneToMany(targetEntity=ReposMedical::class, mappedBy="dossier")
     */
    private $reposMedicals;

    /**
     * @ORM\OneToMany(targetEntity=Inputation::class, mappedBy="dossier")
     */
    private $inputations;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $historiqueMaladies;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $niveauInstruction;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $situationMatrimoniale;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $genreVie;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $professionMari;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $antecedentMedicaux;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $antecedentChurirgicaux;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $antecedentFamiliaux;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $dateMariage;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $descriptionGenreVie;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $emailPatient;

    public function __construct()
    {
        $this->consultations = new ArrayCollection();
        $this->reposMedicals = new ArrayCollection();
        $this->rendezVous = new ArrayCollection();
        $this->inputations = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNumero()
    {
        return $this->numero;
    }

    public function setNumero(string $numero): self
    {
        $this->numero = $numero;

        return $this;
    }

    public function getPrenoms()
    {
        return $this->prenoms;
    }

    public function setPrenoms(string $prenoms): self
    {
        $this->prenoms = $prenoms;

        return $this;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDateNaissance()
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance($dateNaissance): self
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    public function getCni()
    {
        return $this->cni;
    }

    public function setCni(string $cni): self
    {
        $this->cni = $cni;

        return $this;
    }

    public function getTelephone()
    {
        return $this->telephone;
    }

    public function setTelephone($telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getTypePatient()
    {
        return $this->typePatient;
    }

    public function setTypePatient(string $typePatient): self
    {
        $this->typePatient = $typePatient;

        return $this;
    }

    public function getLienParente()
    {
        return $this->lienParente;
    }

    public function setLienParente($lienParente): self
    {
        $this->lienParente = $lienParente;

        return $this;
    }

    public function getMatricule()
    {
        return $this->matricule;
    }

    public function setMatricule(string $matricule): self
    {
        $this->matricule = $matricule;

        return $this;
    }

    public function getPrenomTravailleur()
    {
        return $this->prenomTravailleur;
    }

    public function setPrenomTravailleur($prenomTravailleur): self
    {
        $this->prenomTravailleur = $prenomTravailleur;

        return $this;
    }

    public function getNomTravailleur()
    {
        return $this->nomTravailleur;
    }

    public function setNomTravailleur($nomTravailleur): self
    {
        $this->nomTravailleur = $nomTravailleur;

        return $this;
    }

    public function getGenre()
    {
        return $this->genre;
    }

    public function setGenre(string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getDateCreation()
    {
        return $this->dateCreation;
    }

    public function setDateCreation($dateCreation): self
    {
        $this->dateCreation = $dateCreation;

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

    public function getEtat()
    {
        return $this->etat;
    }

    public function setEtat(bool $etat): self
    {
        $this->etat = $etat;

        return $this;
    }

    public function getStructure()
    {
        return $this->structure;
    }

    public function setStructure(string $structure): self
    {
        $this->structure = $structure;

        return $this;
    }

    /**
     * @return Collection|Consultation[]
     */
    public function getConsultations(): Collection
    {
        return $this->consultations;
    }

    public function addConsultation(Consultation $consultation): self
    {
        if (!$this->consultations->contains($consultation)) {
            $this->consultations[] = $consultation;
            $consultation->setDossier1($this);
        }

        return $this;
    }

    public function removeConsultation(Consultation $consultation): self
    {
        if ($this->consultations->contains($consultation)) {
            $this->consultations->removeElement($consultation);
            // set the owning side to null (unless already changed)
            if ($consultation->getDossier1() === $this) {
                $consultation->setDossier1(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ReposMedical[]
     */
    public function getReposMedicals(): Collection
    {
        return $this->reposMedicals;
    }

    public function addReposMedical(ReposMedical $reposMedical): self
    {
        if (!$this->reposMedicals->contains($reposMedical)) {
            $this->reposMedicals[] = $reposMedical;
            $reposMedical->setDossier1($this);
        }

        return $this;
    }

    public function removeReposMedical(ReposMedical $reposMedical): self
    {
        if ($this->reposMedicals->contains($reposMedical)) {
            $this->reposMedicals->removeElement($reposMedical);
            // set the owning side to null (unless already changed)
            if ($reposMedical->getDossier1() === $this) {
                $reposMedical->setDossier1(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Inputation[]
     */
    public function getInputations(): Collection
    {
        return $this->inputations;
    }

    public function addInputation(Inputation $inputation): self
    {
        if (!$this->inputations->contains($inputation)) {
            $this->inputations[] = $inputation;
            $inputation->setDossier1($this);
        }

        return $this;
    }

    public function removeInputation(Inputation $inputation): self
    {
        if ($this->inputations->contains($inputation)) {
            $this->inputations->removeElement($inputation);
            // set the owning side to null (unless already changed)
            if ($inputation->getDossier1() === $this) {
                $inputation->setDossier1(null);
            }
        }

        return $this;
    }

    public function getHistoriqueMaladies(): ?string
    {
        return $this->historiqueMaladies;
    }

    public function setHistoriqueMaladies(?string $historiqueMaladies): self
    {
        $this->historiqueMaladies = $historiqueMaladies;

        return $this;
    }

    public function getNiveauInstruction(): ?string
    {
        return $this->niveauInstruction;
    }

    public function setNiveauInstruction(?string $niveauInstruction): self
    {
        $this->niveauInstruction = $niveauInstruction;

        return $this;
    }

    public function getSituationMatrimoniale(): ?string
    {
        return $this->situationMatrimoniale;
    }

    public function setSituationMatrimoniale(?string $situationMatrimoniale): self
    {
        $this->situationMatrimoniale = $situationMatrimoniale;

        return $this;
    }

    public function getGenreVie(): ?string
    {
        return $this->genreVie;
    }

    public function setGenreVie(?string $genreVie): self
    {
        $this->genreVie = $genreVie;

        return $this;
    }

    public function getProfessionMari(): ?string
    {
        return $this->professionMari;
    }

    public function setProfessionMari(?string $professionMari): self
    {
        $this->professionMari = $professionMari;

        return $this;
    }

    public function getAntecedentMedicaux(): ?string
    {
        return $this->antecedentMedicaux;
    }

    public function setAntecedentMedicaux(?string $antecedentMedicaux): self
    {
        $this->antecedentMedicaux = $antecedentMedicaux;

        return $this;
    }

    public function getAntecedentChurirgicaux(): ?string
    {
        return $this->antecedentChurirgicaux;
    }

    public function setAntecedentChurirgicaux(?string $antecedentChurirgicaux): self
    {
        $this->antecedentChurirgicaux = $antecedentChurirgicaux;

        return $this;
    }

    public function getAntecedentFamiliaux(): ?string
    {
        return $this->antecedentFamiliaux;
    }

    public function setAntecedentFamiliaux(?string $antecedentFamiliaux): self
    {
        $this->antecedentFamiliaux = $antecedentFamiliaux;

        return $this;
    }

    public function getDateMariage(): ?string
    {
        return $this->dateMariage;
    }

    public function setDateMariage(?string $dateMariage): self
    {
        $this->dateMariage = $dateMariage;

        return $this;
    }

    public function getDescriptionGenreVie(): ?string
    {
        return $this->descriptionGenreVie;
    }

    public function setDescriptionGenreVie(?string $descriptionGenreVie): self
    {
        $this->descriptionGenreVie = $descriptionGenreVie;

        return $this;
    }

    public function getEmailPatient(): ?string
    {
        return $this->emailPatient;
    }

    public function setEmailPatient(?string $emailPatient): self
    {
        $this->emailPatient = $emailPatient;

        return $this;
    }
}
