<?php

// src/Entity/User.php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Group")
     * @ORM\JoinTable(name="fos_user_group",
     *      joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="group_id", referencedColumnName="id")}
     * )
     */
    protected $groups;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=145, nullable=true)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=145, nullable=true)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="telephone", type="string", length=145, nullable=true)
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(name="source", type="string", length=145, nullable=true)
     */
    private $source;

    /**
     * @var string
     *
     * @ORM\Column(name="path_image", type="string", length=255, nullable=true)
     */
    private $pathImage;

    /**
     * @var string
     *
     * @ORM\Column(name="file_name", type="string", length=145, nullable=true)
     */
    private $fileName;

    /**
     * @ORM\Column(type="string", length=45, nullable=true)
     */
    private $fonction;

    public function __construct() {
        parent::__construct();
        $this->groups = new ArrayCollection();
    }

    public function getId() {
        return $this->id;
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function setPrenom($prenom): self {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom): self {
        $this->nom = $nom;

        return $this;
    }

    public function getTelephone() {
        return $this->telephone;
    }

    public function setTelephone($telephone): self {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPathImage() {
        return $this->pathImage;
    }

    public function setPathImage($pathImage): self {
        $this->pathImage = $pathImage;

        return $this;
    }

    public function getSource() {
        return $this->source;
    }

    public function setSource(string $source): self {
        $this->source = $source;

        return $this;
    }

    /**
     * @return Collection|Group[]
     */
    public function getGroups(): Collection {
        return $this->groups;
    }

    /**
     * @return Collection|Group[]
     */
    public function setGroups($groups) {
        $this->groups = $groups;
    }

    /* public function addGroup(Group $group): self
      {
      if (!$this->groups->contains($group)) {
      $this->groups[] = $group;
      }
      return $this;
      }
      public function removeGroup(Group $group): self
      {
      if ($this->groups->contains($group)) {
      $this->groups->removeElement($group);
      }
      return $this;
      } */

    /**
     * @return string|null
     */
    public function getFileName() {
        return $this->fileName;
    }

    /**
     * @param string $fileName
     * @return User
     */
    public function setFileName($fileName): self {
        $this->fileName = $fileName;
        return $this;
    }

    public function getFonction()
    {
        return $this->fonction;
    }

    public function setFonction($fonction): self
    {
        $this->fonction = $fonction;

        return $this;
    }

   

}