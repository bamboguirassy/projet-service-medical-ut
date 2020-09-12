<?php

namespace App\Controller;

use App\Entity\StructurePartenaire;
use App\Form\StructurePartenaireType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/structurepartenaire")
 */
class StructurePartenaireController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="structure_partenaire_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_INDEX")
     */
    public function index(): array
    {
        $structurePartenaires = $this->getDoctrine()
            ->getRepository(StructurePartenaire::class)
            ->findAll();

        return count($structurePartenaires)?$structurePartenaires:[];
    }

    /**
     * @Rest\Post(Path="/create", name="structure_partenaire_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_CREATE")
     */
    public function create(Request $request): StructurePartenaire    {
        $structurePartenaire = new StructurePartenaire();
        $form = $this->createForm(StructurePartenaireType::class, $structurePartenaire);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($structurePartenaire);
        $entityManager->flush();

        return $structurePartenaire;
    }

    /**
     * @Rest\Get(path="/{id}", name="structure_partenaire_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_SHOW")
     */
    public function show(StructurePartenaire $structurePartenaire): StructurePartenaire    {
        return $structurePartenaire;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="structure_partenaire_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_EDIT")
     */
    public function edit(Request $request, StructurePartenaire $structurePartenaire): StructurePartenaire    {
        $form = $this->createForm(StructurePartenaireType::class, $structurePartenaire);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $structurePartenaire;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="structure_partenaire_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_CLONE")
     */
    public function cloner(Request $request, StructurePartenaire $structurePartenaire):  StructurePartenaire {
        $em=$this->getDoctrine()->getManager();
        $structurePartenaireNew=new StructurePartenaire();
        $form = $this->createForm(StructurePartenaireType::class, $structurePartenaireNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($structurePartenaireNew);

        $em->flush();

        return $structurePartenaireNew;
    }

    /**
     * @Rest\Delete("/{id}", name="structure_partenaire_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_EDIT")
     */
    public function delete(StructurePartenaire $structurePartenaire): StructurePartenaire    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($structurePartenaire);
        $entityManager->flush();

        return $structurePartenaire;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="structure_partenaire_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_STRUCTUREPARTENAIRE_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $structurePartenaires = Utils::getObjectFromRequest($request);
        if (!count($structurePartenaires)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($structurePartenaires as $structurePartenaire) {
            $structurePartenaire = $entityManager->getRepository(StructurePartenaire::class)->find($structurePartenaire->id);
            $entityManager->remove($structurePartenaire);
        }
        $entityManager->flush();

        return $structurePartenaires;
    }
}
