<?php

namespace App\Controller;

use App\Entity\Inputation;
use App\Form\InputationType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/inputation")
 */
class InputationController extends AbstractController {

    /**
     * @Rest\Get(path="/", name="inputation_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_INPUTATION_INDEX")
     */
    public function index(): array {
        $inputations = $this->getDoctrine()
                ->getRepository(Inputation::class)
                ->findAll();

        return count($inputations) ? $inputations : [];
    }

    /**
     * @Rest\Post(path="/filter-by-date/", name="inputation_filter_date")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_INPUTATION_INDEX")
     */
    public function findByDate(Request $request): array {
        $reqData = Utils::getObjectFromRequest($request);
        if (!(isset($reqData->startDate) || isset($reqData->endDate))) {
            throw $this->createNotFoundException("Il faut un interval de date pour filtrer...");
        }
        $em = $this->getDoctrine()->getManager();
        $inputations = $em->createQuery('select i from App\Entity\Inputation i '
                        . 'where i.date>=?1 and i.date<=?2')
                ->setParameter(1, $reqData->startDate)
                ->setParameter(2, $reqData->endDate)
                ->getResult();

        return count($inputations) ? $inputations : [];
    }

    /**
     * @Rest\Post(Path="/create", name="inputation_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_CREATE")
     */
    public function create(Request $request): Inputation {
        $inputation = new Inputation();
        $form = $this->createForm(InputationType::class, $inputation);
        $form->submit(Utils::serializeRequestContent($request));
        $reqData = Utils::getObjectFromRequest($request);
        if (!isset($reqData->date)) {
            throw $this->createNotFoundException("La date de préscription de l'imputation est obligatoire");
        }
        $inputation->setDate(new \DateTime($reqData->date));
        $inputation->setUserEmail($this->getUser());

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($inputation);
        $entityManager->flush();

        return $inputation;
    }

    /**
     * @Rest\Get(path="/{id}", name="inputation_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_SHOW")
     */
    public function show(Inputation $inputation): Inputation {
        return $inputation;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="inputation_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_EDIT")
     */
    public function edit(Request $request, Inputation $inputation): Inputation {
        $form = $this->createForm(InputationType::class, $inputation);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $inputation;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="inputation_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_CLONE")
     */
    public function cloner(Request $request, Inputation $inputation): Inputation {
        $em = $this->getDoctrine()->getManager();
        $inputationNew = new Inputation();
        $form = $this->createForm(InputationType::class, $inputationNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($inputationNew);

        $em->flush();

        return $inputationNew;
    }

    /**
     * @Rest\Delete("/{id}", name="inputation_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_EDIT")
     */
    public function delete(Inputation $inputation): Inputation {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($inputation);
        $entityManager->flush();

        return $inputation;
    }

    /**
     * @Rest\Post("/delete-selection/", name="inputation_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_INPUTATION_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $inputations = Utils::getObjectFromRequest($request);
        if (!count($inputations)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($inputations as $inputation) {
            $inputation = $entityManager->getRepository(Inputation::class)->find($inputation->id);
            $entityManager->remove($inputation);
        }
        $entityManager->flush();

        return $inputations;
    }

}
