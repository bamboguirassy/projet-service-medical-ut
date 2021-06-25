<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PathologieConsultation
 *
 * @ORM\Table(name="pathologie_consultation", indexes={@ORM\Index(name="IDX_F44A847162FF6CDF", columns={"consultation_id"}), @ORM\Index(name="IDX_F44A8471E7F789D4", columns={"pathologie_id"})})
 * @ORM\Entity
 */
class PathologieConsultation
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
     * @var \Consultation
     *
     * @ORM\ManyToOne(targetEntity="Consultation")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="consultation_id", referencedColumnName="id")
     * })
     */
    private $consultation;

    /**
     * @var \Pathologie
     *
     * @ORM\ManyToOne(targetEntity="Pathologie")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="pathologie_id", referencedColumnName="id")
     * })
     */
    private $pathologie;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getPathologie(): ?Pathologie
    {
        return $this->pathologie;
    }

    public function setPathologie(?Pathologie $pathologie): self
    {
        $this->pathologie = $pathologie;

        return $this;
    }


}
