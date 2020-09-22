<?php

namespace App\Controller;

use App\Entity\MedicamentReception;
use App\Form\MedicamentReceptionType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/medicamentreception")
 */
class MedicamentReceptionController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="medicament_reception_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_INDEX")
     */
    public function index(): array
    {
        $medicamentReceptions = $this->getDoctrine()
            ->getRepository(MedicamentReception::class)
            ->findAll();

        return count($medicamentReceptions)?$medicamentReceptions:[];
    }

    /**
     * @Rest\Post(Path="/create", name="medicament_reception_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_CREATE")
     */
    public function create(Request $request): MedicamentReception    {
        $medicamentReception = new MedicamentReception();
        $form = $this->createForm(MedicamentReceptionType::class, $medicamentReception);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($medicamentReception);
        $entityManager->flush();

        return $medicamentReception;
    }

    /**
     * @Rest\Get(path="/{id}", name="medicament_reception_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_SHOW")
     */
    public function show(MedicamentReception $medicamentReception): MedicamentReception    {
        return $medicamentReception;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="medicament_reception_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_EDIT")
     */
    public function edit(Request $request, MedicamentReception $medicamentReception): MedicamentReception    {
        $form = $this->createForm(MedicamentReceptionType::class, $medicamentReception);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $medicamentReception;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="medicament_reception_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_CLONE")
     */
    public function cloner(Request $request, MedicamentReception $medicamentReception):  MedicamentReception {
        $em=$this->getDoctrine()->getManager();
        $medicamentReceptionNew=new MedicamentReception();
        $form = $this->createForm(MedicamentReceptionType::class, $medicamentReceptionNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($medicamentReceptionNew);

        $em->flush();

        return $medicamentReceptionNew;
    }

    /**
     * @Rest\Delete("/{id}", name="medicament_reception_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_EDIT")
     */
    public function delete(MedicamentReception $medicamentReception): MedicamentReception    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($medicamentReception);
        $entityManager->flush();

        return $medicamentReception;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="medicament_reception_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTRECEPTION_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $medicamentReceptions = Utils::getObjectFromRequest($request);
        if (!count($medicamentReceptions)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($medicamentReceptions as $medicamentReception) {
            $medicamentReception = $entityManager->getRepository(MedicamentReception::class)->find($medicamentReception->id);
            $entityManager->remove($medicamentReception);
        }
        $entityManager->flush();

        return $medicamentReceptions;
    }
}
