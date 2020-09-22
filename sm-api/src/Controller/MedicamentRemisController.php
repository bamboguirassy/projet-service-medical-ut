<?php

namespace App\Controller;

use App\Entity\MedicamentRemis;
use App\Form\MedicamentRemisType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/medicamentremis")
 */
class MedicamentRemisController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="medicament_remis_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_INDEX")
     */
    public function index(): array
    {
        $medicamentRemis = $this->getDoctrine()
            ->getRepository(MedicamentRemis::class)
            ->findAll();

        return count($medicamentRemis)?$medicamentRemis:[];
    }

    /**
     * @Rest\Post(Path="/create", name="medicament_remis_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_CREATE")
     */
    public function create(Request $request): MedicamentRemis    {
        $medicamentRemi = new MedicamentRemis();
        $form = $this->createForm(MedicamentRemisType::class, $medicamentRemi);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($medicamentRemi);
        $entityManager->flush();

        return $medicamentRemi;
    }

    /**
     * @Rest\Get(path="/{id}", name="medicament_remis_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_SHOW")
     */
    public function show(MedicamentRemis $medicamentRemi): MedicamentRemis    {
        return $medicamentRemi;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="medicament_remis_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_EDIT")
     */
    public function edit(Request $request, MedicamentRemis $medicamentRemi): MedicamentRemis    {
        $form = $this->createForm(MedicamentRemisType::class, $medicamentRemi);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $medicamentRemi;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="medicament_remis_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_CLONE")
     */
    public function cloner(Request $request, MedicamentRemis $medicamentRemi):  MedicamentRemis {
        $em=$this->getDoctrine()->getManager();
        $medicamentRemiNew=new MedicamentRemis();
        $form = $this->createForm(MedicamentRemisType::class, $medicamentRemiNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($medicamentRemiNew);

        $em->flush();

        return $medicamentRemiNew;
    }

    /**
     * @Rest\Delete("/{id}", name="medicament_remis_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_EDIT")
     */
    public function delete(MedicamentRemis $medicamentRemi): MedicamentRemis    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($medicamentRemi);
        $entityManager->flush();

        return $medicamentRemi;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="medicament_remis_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENTREMIS_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $medicamentRemis = Utils::getObjectFromRequest($request);
        if (!count($medicamentRemis)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($medicamentRemis as $medicamentRemi) {
            $medicamentRemi = $entityManager->getRepository(MedicamentRemis::class)->find($medicamentRemi->id);
            $entityManager->remove($medicamentRemi);
        }
        $entityManager->flush();

        return $medicamentRemis;
    }
}
