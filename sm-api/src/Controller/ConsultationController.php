<?php

namespace App\Controller;

use App\Entity\Consultation;
use App\Form\ConsultationType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/consultation")
 */
class ConsultationController extends AbstractController {

    /**
     * @Rest\Get(path="/", name="consultation_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_CONSULTATION_INDEX")
     */
    public function index(): array {
        $consultations = $this->getDoctrine()
                ->getRepository(Consultation::class)
                ->findAll();

        return count($consultations) ? $consultations : [];
    }

    /**
     * @Rest\Post(path="/filter-by-date/", name="consultation_filter_date")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_CONSULTATION_INDEX")
     */
    public function findByDate(Request $request): array {
        $reqData = Utils::getObjectFromRequest($request);
        if (!(isset($reqData->startDate) || isset($reqData->endDate))) {
            throw $this->createNotFoundException("Il faut un interval de date pour filtrer...");
        }
        $em = $this->getDoctrine()->getManager();
        $consultations = $em->createQuery('select c from App\Entity\Consultation c '
                        . 'where c.date>=?1 and c.date<=?2')
                ->setParameter(1, $reqData->startDate)
                ->setParameter(2, $reqData->endDate)
                ->getResult();

        return count($consultations) ? $consultations : [];
    }

    /**
     * @Rest\Post(Path="/create", name="consultation_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_CREATE")
     */
    public function create(Request $request): Consultation {
        $consultation = new Consultation();
        $form = $this->createForm(ConsultationType::class, $consultation);
        $form->submit(Utils::serializeRequestContent($request));
        $requestData = Utils::getObjectFromRequest($request);
        if (!$requestData->date) {
            throw $this->createNotFoundException("La date est obligatoire !!!");
        }
        $consultation->setDate(new \DateTime($requestData->date));

        $consultation->setUserEmail($this->getUser());

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($consultation);
        $entityManager->flush();

        return $consultation;
    }

    /**
     * @Rest\Get(path="/{id}", name="consultation_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_SHOW")
     */
    public function show(Consultation $consultation): Consultation {
        return $consultation;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="consultation_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_EDIT")
     */
    public function edit(Request $request, Consultation $consultation): Consultation {
        $form = $this->createForm(ConsultationType::class, $consultation);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $consultation;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="consultation_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_CLONE")
     */
    public function cloner(Request $request, Consultation $consultation): Consultation {
        $em = $this->getDoctrine()->getManager();
        $consultationNew = new Consultation();
        $form = $this->createForm(ConsultationType::class, $consultationNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($consultationNew);

        $em->flush();

        return $consultationNew;
    }

    /**
     * @Rest\Delete("/{id}", name="consultation_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_EDIT")
     */
    public function delete(Consultation $consultation): Consultation {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($consultation);
        $entityManager->flush();

        return $consultation;
    }

    /**
     * @Rest\Post("/delete-selection/", name="consultation_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_CONSULTATION_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $consultations = Utils::getObjectFromRequest($request);
        if (!count($consultations)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($consultations as $consultation) {
            $consultation = $entityManager->getRepository(Consultation::class)->find($consultation->id);
            $entityManager->remove($consultation);
        }
        $entityManager->flush();

        return $consultations;
    }

}
