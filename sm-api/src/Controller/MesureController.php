<?php

namespace App\Controller;

use App\Entity\Medicament;
use App\Entity\Mesure;
use App\Form\MesureType;
use App\Repository\MesureRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Doctrine\Common\Collections\Collection;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/mesure")
 */
class MesureController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="mesure_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_MESURE_INDEX")
     */
    public function index(MesureRepository $mesureRepository): array
    {
        return $mesureRepository->findAll();
    }

    /**
     * @Rest\Post(Path="/create", name="mesure_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_CREATE")
     */
    public function create(Request $request): Mesure
    {
        $mesure = new Mesure();
        $form = $this->createForm(MesureType::class, $mesure);
        $form->submit(Utils::serializeRequestContent($request));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($mesure);
        $entityManager->flush();

        return $mesure;
    }

    /**
     * @Rest\Get(path="/{id}", name="mesure_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_SHOW")
     */
    public function show(Mesure $mesure): Mesure
    {
        return $mesure;
    }


    /**
     * @Rest\Put(path="/{id}/edit", name="mesure_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_EDIT")
     */
    public function edit(Request $request, Mesure $mesure): Mesure
    {
        $form = $this->createForm(MesureType::class, $mesure);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $mesure;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="mesure_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_CLONE")
     */
    public function cloner(Request $request, Mesure $mesure): Mesure
    {
        $em = $this->getDoctrine()->getManager();
        $mesureNew = new Mesure();
        $form = $this->createForm(MesureType::class, $mesureNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($mesureNew);

        $em->flush();

        return $mesureNew;
    }

    /**
     * @Rest\Delete("/{id}", name="mesure_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_EDIT")
     */
    public function delete(Mesure $mesure): Mesure
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($mesure);
        $entityManager->flush();

        return $mesure;
    }

    /**
     * @Rest\Post("/delete-selection/", name="mesure_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_DELETE")
     */
    public function deleteMultiple(Request $request): array
    {
        $entityManager = $this->getDoctrine()->getManager();
        $mesures = Utils::getObjectFromRequest($request);
        if (!count($mesures)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($mesures as $mesure) {
            $mesure = $entityManager->getRepository(Mesure::class)->find($mesure->id);
            $entityManager->remove($mesure);
        }
        $entityManager->flush();

        return $mesures;
    }

    /**
     * @Rest\Put(path="/{id}/edit-medicaments", name="mesure_edit_medicaments",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_MESURE_EDIT")
     */
    public function editMedicaments(Request $request, Mesure $mesure) :array
    {
        $entityManager = $this->getDoctrine()->getManager();
        $medicamentsRepository = $entityManager->getRepository(Medicament::class);
        $medicaments = Utils::serializeRequestContent($request);
        $medicaments = $medicamentsRepository->createQueryBuilder('v')
            ->select('v')
            ->andWhere('v.id IN (:medicaments)')
            ->setParameter('medicaments', $medicaments)->getQuery()
            ->getResult();

        $diffs = array_diff($medicaments, $mesure->getMedicaments()->toArray());
        if(count($diffs) != 0){
            foreach($diffs as $diff){
                $mesure->addMedicaments($diff);
            }
        }

        $diffs = array_diff($mesure->getMedicaments()->toArray(), $medicaments);
        if(count($diffs) != 0){
            foreach($diffs as $diff){
                $mesure->removeMedicament($diff);
            }
        }

        $entityManager->flush();
        return $mesure->getMedicaments()->toArray();
    }
}
