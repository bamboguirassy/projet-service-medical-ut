<?php

namespace App\Controller;

use App\Entity\BonReception;
use App\Entity\MedicamentReception;
use App\Form\BonReceptionType;
use App\Form\MedicamentReceptionType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/bonreception")
 */
class BonReceptionController extends AbstractController
{

    /**
     * @Rest\Get(path="/", name="bon_reception_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_BONRECEPTION_INDEX")
     */
    public function index(): array
    {
        $bonReceptions = $this->getDoctrine()
                ->getRepository(BonReception::class)
                ->findAll();

        return count($bonReceptions) ? $bonReceptions : [];
    }

    /**
     * @Rest\Post(Path="/create", name="bon_reception_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_CREATE")
     */
    public function create(Request $request)
    {
        $reqData = Utils::getObjectFromRequest($request);
        $bon=$reqData->bonReception;
        $medocs=$reqData->medicamentReceptions;
        $bonReception = new BonReception();
        $form = $this->createForm(BonReceptionType::class, $bonReception);
        $entityManager = $this->getDoctrine()->getManager();
        if (!isset($bon->date)) {
            throw $this->createNotFoundException("La date du bon est obligatoire");
        }
        $form->submit((array)$bon);
        $bonReception->setDate(new \DateTime($bon->date));
        $bonReception->setUserEmail($this->getUser());
        $bonReception->setNumero(strtoupper(uniqid()));
        $bonReception->setNom("Bon de réception - ".$bonReception->getNumero());
        $entityManager->persist($bonReception);
        foreach ($medocs as $rowMedicamentRecu) {
            $medicamentReception=new MedicamentReception();
            $form = $this->createForm(MedicamentReceptionType::class, $medicamentReception);
            $form->submit((array)$rowMedicamentRecu);
            $medicamentReception->setBonReception($bonReception);
            if ($medicamentReception->getQuantite()<1) {
                throw $this->createNotFoundException("La quantité de médicament receptionnée ne peut pas être null");
            }
            $entityManager->persist($medicamentReception);
            $medicamentReception->getMedicament()->setQuantiteStock($medicamentReception->getMedicament()->getQuantiteStock()+$medicamentReception->getQuantite());
        }
        $entityManager->flush();
        return $bonReception;
    }

    /**
     * @Rest\Get(path="/{id}", name="bon_reception_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_SHOW")
     */
    public function show(BonReception $bonReception): BonReception
    {
        return $bonReception;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="bon_reception_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_EDIT")
     */
    public function edit(Request $request, BonReception $bonReception): BonReception
    {
        $requestData = Utils::getObjectFromRequest($request);
        $form = $this->createForm(BonReceptionType::class, $bonReception);
        $form->submit(Utils::serializeRequestContent($request));
        $bonReception->setDate(new \DateTime($requestData->date));
        $this->getDoctrine()->getManager()->flush();

        return $bonReception;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="bon_reception_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_CLONE")
     */
    public function cloner(Request $request, BonReception $bonReception): BonReception
    {
        $em = $this->getDoctrine()->getManager();
        $bonReceptionNew = new BonReception();
        $form = $this->createForm(BonReceptionType::class, $bonReceptionNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($bonReceptionNew);

        $em->flush();

        return $bonReceptionNew;
    }

    /**
     * @Rest\Delete("/{id}", name="bon_reception_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_EDIT")
     */
    public function delete(BonReception $bonReception): BonReception
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($bonReception);
        $entityManager->flush();

        return $bonReception;
    }

    /**
     * @Rest\Post("/delete-selection/", name="bon_reception_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_BONRECEPTION_DELETE")
     */
    public function deleteMultiple(Request $request): array
    {
        $entityManager = $this->getDoctrine()->getManager();
        $bonReceptions = Utils::getObjectFromRequest($request);
        if (!count($bonReceptions)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($bonReceptions as $bonReception) {
            $bonReception = $entityManager->getRepository(BonReception::class)->find($bonReception->id);
            $entityManager->remove($bonReception);
        }
        $entityManager->flush();

        return $bonReceptions;
    }
}
