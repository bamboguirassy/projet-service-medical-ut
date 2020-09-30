<?php

namespace App\Controller;

use App\Entity\RendezVous;
use App\Form\RendezVousType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/rendezvous")
 */
class RendezVousController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="rendez_vous_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_RENDEZVOUS_INDEX")
     */
    public function index(): array
    {
        $rendezVouses = $this->getDoctrine()
            ->getRepository(RendezVous::class)
            ->findAll();

        return count($rendezVouses)?$rendezVouses:[];
    }
    
    /**
     * @Rest\Get(path="/{id}/dossier", name="rendez_vous_dossier")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_RENDEZVOUS_INDEX")
     */
    public function findByDossier(\App\Entity\Dossier $dossier): array
    {
        $rendezVouses = $this->getDoctrine()
            ->getRepository(RendezVous::class)
            ->findByDossier($dossier);

        return count($rendezVouses)?$rendezVouses:[];
    }

    /**
     * @Rest\Post(path="/filter-by-date/", name="rendezvous_filter_date")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_RENDEZVOUS_INDEX")
     */
    public function findByDate(Request $request): array {
        $reqData = Utils::getObjectFromRequest($request);
        if (!(isset($reqData->startDate) || isset($reqData->endDate))) {
            throw $this->createNotFoundException("Il faut un interval de date pour filtrer...");
        }
        $em = $this->getDoctrine()->getManager();
        $rendezVouses = $em->createQuery('select rv from App\Entity\RendezVous rv '
                        . 'where rv.dateRendezVous>=?1 and rv.dateRendezVous<=?2')
                ->setParameter(1, $reqData->startDate)
                ->setParameter(2, $reqData->endDate)
                ->getResult();

        return count($rendezVouses) ? $rendezVouses : [];
    }

    /**
     * @Rest\Post(Path="/create", name="rendez_vous_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_CREATE")
     */
    public function create(Request $request): RendezVous    {
        $rendezVous = new RendezVous();
        $form = $this->createForm(RendezVousType::class, $rendezVous);
        $form->submit(Utils::serializeRequestContent($request));
        $requestData = Utils::getObjectFromRequest($request);
        if(!$requestData->dateRendezVous) {
            throw $this->createNotFoundException("La date de rendez-vous est obligatoire !!!");
        }
        $rendezVous->setDateRendezVous(new \DateTime($requestData->dateRendezVous));
        $rendezVous->setDateCreation(new \DateTime());
        $rendezVous->setPresence(false);
        $rendezVous->setUserEmail($this->getUser());
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($rendezVous);
        $entityManager->flush();

        return $rendezVous;
    }

    /**
     * @Rest\Get(path="/{id}", name="rendez_vous_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_SHOW")
     */
    public function show(RendezVous $rendezVous): RendezVous    {
        return $rendezVous;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="rendez_vous_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_EDIT")
     */
    public function edit(Request $request, RendezVous $rendezVous): RendezVous    {
        $form = $this->createForm(RendezVousType::class, $rendezVous);
        $form->submit(Utils::serializeRequestContent($request));
        $requestData = Utils::getObjectFromRequest($request);
        if(!$requestData->dateRendezVous) {
            throw $this->createNotFoundException("La date de rendez-vous est obligatoire !!!");
        }
        $rendezVous->setDateRendezVous(new \DateTime($requestData->dateRendezVous));

        $this->getDoctrine()->getManager()->flush();

        return $rendezVous;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="rendez_vous_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_CLONE")
     */
    public function cloner(Request $request, RendezVous $rendezVous):  RendezVous {
        $em=$this->getDoctrine()->getManager();
        $rendezVousNew=new RendezVous();
        $form = $this->createForm(RendezVousType::class, $rendezVousNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($rendezVousNew);

        $em->flush();

        return $rendezVousNew;
    }

    /**
     * @Rest\Delete("/{id}", name="rendez_vous_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_EDIT")
     */
    public function delete(RendezVous $rendezVous): RendezVous    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($rendezVous);
        $entityManager->flush();

        return $rendezVous;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="rendez_vous_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_RENDEZVOUS_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $rendezVouses = Utils::getObjectFromRequest($request);
        if (!count($rendezVouses)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($rendezVouses as $rendezVous) {
            $rendezVous = $entityManager->getRepository(RendezVous::class)->find($rendezVous->id);
            $entityManager->remove($rendezVous);
        }
        $entityManager->flush();

        return $rendezVouses;
    }
}
