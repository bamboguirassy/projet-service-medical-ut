<?php

namespace App\Controller;

use App\Entity\Medicament;
use App\Form\MedicamentType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/medicament")
 */
class MedicamentController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="medicament_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_MEDICAMENT_INDEX")
     */
    public function index(): array
    {
        $medicaments = $this->getDoctrine()
            ->getRepository(Medicament::class)
            ->findAll();

        return count($medicaments)?$medicaments:[];
    }

    /**
     * @Rest\Post(Path="/create", name="medicament_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_CREATE")
     */
    public function create(Request $request, \App\Service\FileUploader $uploader): Medicament    {
        $medicament = new Medicament();
        $form = $this->createForm(MedicamentType::class, $medicament);
        $form->submit(Utils::serializeRequestContent($request));

        //check if file provided
        if ($medicament->getFilepath()) {
            $host = $request->getHttpHost();
            $scheme = $request->getScheme();
            file_put_contents($medicament->getFilename(), base64_decode($medicament->getFilepath()));
            $file = new \Symfony\Component\HttpFoundation\File\File($medicament->getFilename());
            $authorizedExtensions = ['jpeg', 'jpg', 'png'];
            if (!in_array($file->guessExtension(), $authorizedExtensions)) {
                throw new BadRequestHttpException('Fichier non pris en charge');
            }
            $newFileName = $uploader->setTargetDirectory('medoc_image_directory')->upload($file, null); // old fileName
            $medicament->setFilepath("$scheme://$host/" . $uploader->getTargetDirectory() . $newFileName);
            $medicament->setFilename($newFileName);
        }
        
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($medicament);
        $entityManager->flush();

        return $medicament;
    }

    /**
     * @Rest\Get(path="/{id}", name="medicament_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_SHOW")
     */
    public function show(Medicament $medicament): Medicament    {
        return $medicament;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="medicament_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_EDIT")
     */
    public function edit(Request $request, Medicament $medicament): Medicament    {
        $form = $this->createForm(MedicamentType::class, $medicament);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $medicament;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="medicament_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_CLONE")
     */
    public function cloner(Request $request, Medicament $medicament):  Medicament {
        $em=$this->getDoctrine()->getManager();
        $medicamentNew=new Medicament();
        $form = $this->createForm(MedicamentType::class, $medicamentNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($medicamentNew);

        $em->flush();

        return $medicamentNew;
    }

    /**
     * @Rest\Delete("/{id}", name="medicament_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_EDIT")
     */
    public function delete(Medicament $medicament): Medicament    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($medicament);
        $entityManager->flush();

        return $medicament;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="medicament_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MEDICAMENT_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $medicaments = Utils::getObjectFromRequest($request);
        if (!count($medicaments)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($medicaments as $medicament) {
            $medicament = $entityManager->getRepository(Medicament::class)->find($medicament->id);
            $entityManager->remove($medicament);
        }
        $entityManager->flush();

        return $medicaments;
    }
}
