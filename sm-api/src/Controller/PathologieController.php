<?php

namespace App\Controller;

use App\Entity\Pathologie;
use App\Form\PathologieType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/pathologie")
 */
class PathologieController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="pathologie_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function index(): array
    {
        $pathologies = $this->getDoctrine()
            ->getRepository(Pathologie::class)
            ->findAll();

        return count($pathologies)?$pathologies:[];
    }

    /**
     * @Rest\Post(Path="/create", name="pathologie_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_CREATE")
     */
    public function create(Request $request): Pathologie    {
        $pathologie = new Pathologie();
        $form = $this->createForm(PathologieType::class, $pathologie);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($pathologie);
        $entityManager->flush();

        return $pathologie;
    }

    /**
     * @Rest\Get(path="/{id}", name="pathologie_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_SHOW")
     */
    public function show(Pathologie $pathologie): Pathologie    {
        return $pathologie;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="pathologie_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_EDIT")
     */
    public function edit(Request $request, Pathologie $pathologie): Pathologie    {
        $form = $this->createForm(PathologieType::class, $pathologie);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $pathologie;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="pathologie_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_CLONE")
     */
    public function cloner(Request $request, Pathologie $pathologie):  Pathologie {
        $em=$this->getDoctrine()->getManager();
        $pathologieNew=new Pathologie();
        $form = $this->createForm(PathologieType::class, $pathologieNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($pathologieNew);

        $em->flush();

        return $pathologieNew;
    }

    /**
     * @Rest\Delete("/{id}", name="pathologie_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_EDIT")
     */
    public function delete(Pathologie $pathologie): Pathologie    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($pathologie);
        $entityManager->flush();

        return $pathologie;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="pathologie_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $pathologies = Utils::getObjectFromRequest($request);
        if (!count($pathologies)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($pathologies as $pathologie) {
            $pathologie = $entityManager->getRepository(Pathologie::class)->find($pathologie->id);
            $entityManager->remove($pathologie);
        }
        $entityManager->flush();

        return $pathologies;
    }
}
