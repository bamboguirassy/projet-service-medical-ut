<?php

namespace App\Controller;

use App\Entity\PathologieConsultation;
use App\Form\PathologieConsultationType;
use App\Repository\PathologieConsultationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/pathologie/consultation")
 */
class PathologieConsultationController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="pathologie_consultation_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_INDEX")
     */
    public function index(PathologieConsultationRepository $pathologieConsultationRepository): array
    {
        return $pathologieConsultationRepository->findAll();
    }

    /**
     * @Rest\Post(Path="/create", name="pathologie_consultation_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_CREATE")
     */
    public function create(Request $request): PathologieConsultation    {
        $pathologieConsultation = new PathologieConsultation();
        $form = $this->createForm(PathologieConsultationType::class, $pathologieConsultation);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($pathologieConsultation);
        $entityManager->flush();

        return $pathologieConsultation;
    }

    /**
     * @Rest\Get(path="/{id}", name="pathologie_consultation_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_SHOW")
     */
    public function show(PathologieConsultation $pathologieConsultation): PathologieConsultation    {
        return $pathologieConsultation;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="pathologie_consultation_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_EDIT")
     */
    public function edit(Request $request, PathologieConsultation $pathologieConsultation): PathologieConsultation    {
        $form = $this->createForm(PathologieConsultationType::class, $pathologieConsultation);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $pathologieConsultation;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="pathologie_consultation_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_CLONE")
     */
    public function cloner(Request $request, PathologieConsultation $pathologieConsultation):  PathologieConsultation {
        $em=$this->getDoctrine()->getManager();
        $pathologieConsultationNew=new PathologieConsultation();
        $form = $this->createForm(PathologieConsultationType::class, $pathologieConsultationNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($pathologieConsultationNew);

        $em->flush();

        return $pathologieConsultationNew;
    }

    /**
     * @Rest\Delete("/{id}", name="pathologie_consultation_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_EDIT")
     */
    public function delete(PathologieConsultation $pathologieConsultation): PathologieConsultation    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($pathologieConsultation);
        $entityManager->flush();

        return $pathologieConsultation;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="pathologie_consultation_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIECONSULTATION_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $pathologieConsultations = Utils::getObjectFromRequest($request);
        if (!count($pathologieConsultations)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($pathologieConsultations as $pathologieConsultation) {
            $pathologieConsultation = $entityManager->getRepository(PathologieConsultation::class)->find($pathologieConsultation->id);
            $entityManager->remove($pathologieConsultation);
        }
        $entityManager->flush();

        return $pathologieConsultations;
    }
}
