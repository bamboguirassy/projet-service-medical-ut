<?php

namespace App\Controller;

use App\Entity\Docteur;
use App\Form\DocteurType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/docteur")
 */
class DocteurController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="docteur_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_DOCTEUR_INDEX")
     */
    public function index(): array
    {
        $docteurs = $this->getDoctrine()
            ->getRepository(Docteur::class)
            ->findAll();

        return count($docteurs)?$docteurs:[];
    }

    /**
     * @Rest\Post(Path="/create", name="docteur_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_CREATE")
     */
    public function create(Request $request, \App\Service\FileUploader $uploader): Docteur    {
        $docteur = new Docteur();
        $form = $this->createForm(DocteurType::class, $docteur);
        $form->submit(Utils::serializeRequestContent($request));
        
        //check if file provided
        if ($docteur->getFilepath()) {
            $host = $request->getHttpHost();
            $scheme = $request->getScheme();
            file_put_contents($docteur->getFilename(), base64_decode($docteur->getFilepath()));
            $file = new \Symfony\Component\HttpFoundation\File\File($docteur->getFilename());
            $authorizedExtensions = ['jpeg', 'jpg', 'png'];
            if (!in_array($file->guessExtension(), $authorizedExtensions)) {
                throw new BadRequestHttpException('Fichier non pris en charge');
            }
            $newFileName = $uploader->setTargetDirectory('docteur_image_directory')->upload($file, null); // old fileName
            $docteur->setFilepath("$scheme://$host/" . $uploader->getTargetDirectory() . $newFileName);
            $docteur->setFilename($newFileName);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($docteur);
        $entityManager->flush();

        return $docteur;
    }

    /**
     * @Rest\Get(path="/{id}", name="docteur_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_SHOW")
     */
    public function show(Docteur $docteur): Docteur    {
        return $docteur;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="docteur_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_EDIT")
     */
    public function edit(Request $request, Docteur $docteur): Docteur    {
        $form = $this->createForm(DocteurType::class, $docteur);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $docteur;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="docteur_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_CLONE")
     */
    public function cloner(Request $request, Docteur $docteur):  Docteur {
        $em=$this->getDoctrine()->getManager();
        $docteurNew=new Docteur();
        $form = $this->createForm(DocteurType::class, $docteurNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($docteurNew);

        $em->flush();

        return $docteurNew;
    }

    /**
     * @Rest\Delete("/{id}", name="docteur_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_EDIT")
     */
    public function delete(Docteur $docteur): Docteur    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($docteur);
        $entityManager->flush();

        return $docteur;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="docteur_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOCTEUR_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $docteurs = Utils::getObjectFromRequest($request);
        if (!count($docteurs)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($docteurs as $docteur) {
            $docteur = $entityManager->getRepository(Docteur::class)->find($docteur->id);
            $entityManager->remove($docteur);
        }
        $entityManager->flush();

        return $docteurs;
    }
}
