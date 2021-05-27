<?php

namespace App\Controller;

use App\Entity\Symptome;
use App\Form\SymptomeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/symptome")
 */
class SymptomeController extends AbstractController {

    /**
     * @Rest\Get(path="/", name="symptome_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_SYMPTOME_INDEX")
     */
    public function index(): array {
        $symptomes = $this->getDoctrine()
                ->getRepository(Symptome::class)
                ->findAll();

        return count($symptomes) ? $symptomes : [];
    }

    /**
     * @Rest\Get(path="/{id}/consultation", name="symptome_consultation")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_SYMPTOME_INDEX")
     */
    public function findByConsultation(\App\Entity\Consultation $consultation): array {
        $symptomes = $this->getDoctrine()
                ->getRepository(Symptome::class)
                ->findByConsultation($consultation);

        return count($symptomes) ? $symptomes : [];
    }

    /**
     * @Rest\Post(Path="/create", name="symptome_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_CREATE")
     */
    public function create(Request $request): Symptome {

        $symptome = new Symptome();
        $form = $this->createForm(SymptomeType::class, $symptome);
        $form->submit(Utils::serializeRequestContent($request));
        
        $reqData = Utils::getObjectFromRequest($request);
        if (!isset($reqData->nom)) {
            throw $this->createNotFoundException("Aucun symtome trouvé pour ajout");
        }
        $entityManager = $this->getDoctrine()->getManager();
        $symptomeNames = $reqData->nom;
        foreach ($symptomeNames as $nom) {
            $symptom = new Symptome();
            $symptom->setNom($nom);
            $symptom->setConsultation($symptome->getConsultation());
            $entityManager->persist($symptom); 
        }

        $entityManager->flush();

        return $symptome;
    }

    /**
     * @Rest\Get(path="/{id}", name="symptome_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_SHOW")
     */
    public function show(Symptome $symptome): Symptome {
        return $symptome;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="symptome_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_EDIT")
     */
    public function edit(Request $request, Symptome $symptome): Symptome {
        $form = $this->createForm(SymptomeType::class, $symptome);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $symptome;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="symptome_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_CLONE")
     */
    public function cloner(Request $request, Symptome $symptome): Symptome {
        $em = $this->getDoctrine()->getManager();
        $symptomeNew = new Symptome();
        $form = $this->createForm(SymptomeType::class, $symptomeNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($symptomeNew);

        $em->flush();

        return $symptomeNew;
    }

    /**
     * @Rest\Delete("/{id}", name="symptome_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_EDIT")
     */
    public function delete(Symptome $symptome): Symptome {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($symptome);
        $entityManager->flush();

        return $symptome;
    }

    /**
     * @Rest\Post("/delete-selection/", name="symptome_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_SYMPTOME_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $symptomes = Utils::getObjectFromRequest($request);
        if (!count($symptomes)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($symptomes as $symptome) {
            $symptome = $entityManager->getRepository(Symptome::class)->find($symptome->id);
            $entityManager->remove($symptome);
        }
        $entityManager->flush();

        return $symptomes;
    }

}
