<?php

namespace App\Controller;

use App\Entity\ReposMedical;
use App\Form\ReposMedicalType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/reposmedical")
 */
class ReposMedicalController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="repos_medical_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_REPOSMEDICAL_INDEX")
     */
    public function index(): array
    {
        $reposMedicals = $this->getDoctrine()
            ->getRepository(ReposMedical::class)
            ->findAll();

        return count($reposMedicals)?$reposMedicals:[];
    }
    /**
     * @Rest\Get(path="/derniers_reposmedicaux", name="derniers_reposmedicaux")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_REPOSMEDICAL_INDEX")
     */
    public function findLastReposmedicaux(): array {
        $em = $this->getDoctrine()->getManager();
        $reposMedicals= $em->createQuery('select rm from App\Entity\ReposMedical rm  ORDER BY rm.date DESC')
                ->setMaxResults( 200 )
                ->getResult();

        return  $reposMedicals;
    }
    
    /**
     * @Rest\Get(path="/{id}/dossier", name="repos_medical_dossier")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_REPOSMEDICAL_INDEX")
     */
    public function findByDossier(\App\Entity\Dossier $dossier): array
    {
        $reposMedicals = $this->getDoctrine()
            ->getRepository(ReposMedical::class)
            ->findByDossier($dossier);

        return count($reposMedicals)?$reposMedicals:[];
    }

    /**
     * @Rest\Post(path="/filter-by-date/", name="reposmedical_filter_date")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_REPOSMEDICAL_INDEX")
     */
    public function findByDate(Request $request): array {
        $reqData = Utils::getObjectFromRequest($request);
        if (!(isset($reqData->startDate) || isset($reqData->endDate))) {
            throw $this->createNotFoundException("Il faut un interval de date pour filtrer...");
        }
        $em = $this->getDoctrine()->getManager();
        $reposMedicals = $em->createQuery('select rm from App\Entity\ReposMedical rm '
                        . 'where rm.date>=?1 and rm.date<=?2')
                ->setParameter(1, $reqData->startDate)
                ->setParameter(2, $reqData->endDate)
                ->getResult();

        return count($reposMedicals) ? $reposMedicals : [];
    }

    /**
     * @Rest\Post(Path="/create", name="repos_medical_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_CREATE")
     */
    public function create(Request $request): ReposMedical    {
        $reposMedical = new ReposMedical();
        $form = $this->createForm(ReposMedicalType::class, $reposMedical);
        $form->submit(Utils::serializeRequestContent($request));
        $reqData = Utils::getObjectFromRequest($request);
        if(!isset($reqData->date)) {
            throw $this->createNotFoundException("La date de prescription est obligatoire !");
        }
        $reposMedical->setDate(new \DateTime($reqData->date));
        $reposMedical->setUserEmail($this->getUser());

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($reposMedical);
        $entityManager->flush();

        return $reposMedical;
    }

    /**
     * @Rest\Get(path="/{id}", name="repos_medical_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_SHOW")
     */
    public function show(ReposMedical $reposMedical): ReposMedical    {
        return $reposMedical;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="repos_medical_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_EDIT")
     */
    public function edit(Request $request, ReposMedical $reposMedical): ReposMedical    {
        $form = $this->createForm(ReposMedicalType::class, $reposMedical);
        $form->submit(Utils::serializeRequestContent($request));
        $reqData = Utils::getObjectFromRequest($request);
        if(!isset($reqData->date)) {
            throw $this->createNotFoundException("La date de prescription est obligatoire !");
        }
        $reposMedical->setDate(new \DateTime($reqData->date));

        $this->getDoctrine()->getManager()->flush();

        return $reposMedical;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="repos_medical_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_CLONE")
     */
    public function cloner(Request $request, ReposMedical $reposMedical):  ReposMedical {
        $em=$this->getDoctrine()->getManager();
        $reposMedicalNew=new ReposMedical();
        $form = $this->createForm(ReposMedicalType::class, $reposMedicalNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($reposMedicalNew);

        $em->flush();

        return $reposMedicalNew;
    }

    /**
     * @Rest\Delete("/{id}", name="repos_medical_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_EDIT")
     */
    public function delete(ReposMedical $reposMedical): ReposMedical    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($reposMedical);
        $entityManager->flush();

        return $reposMedical;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="repos_medical_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_REPOSMEDICAL_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $reposMedicals = Utils::getObjectFromRequest($request);
        if (!count($reposMedicals)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($reposMedicals as $reposMedical) {
            $reposMedical = $entityManager->getRepository(ReposMedical::class)->find($reposMedical->id);
            $entityManager->remove($reposMedical);
        }
        $entityManager->flush();

        return $reposMedicals;
    }
}
