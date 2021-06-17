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
class PathologieController extends AbstractController {

    /**
     * @Rest\Get(path="/", name="pathologie_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function index(): array {
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();

        return count($pathologies) ? $pathologies : [];
    }

    /**
     * @Rest\Get(path="/{annee}/statistique-mensuelle-travailleur/", name="pathologie_statistique_mensuelle_travailleur")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getMensualTravailleurStatistic($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $monthTab = [];
        foreach (Utils::$calendarParams as $calendarElt) {
            $tab_path = [];
            $total_travailleur = 0;
            $total_nonTravailleur = 0;
            foreach ($pathologies as $pathologie) {
                $monthNombreT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2  and d.typePatient in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $total_travailleur += $monthNombreT;
                $monthNombreNT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2  and d.typePatient not in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $total_nonTravailleur += $monthNombreNT;
                $tab_path[] = ["travailleur" => $monthNombreT, 'nt' => $monthNombreNT];
            }
            $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                            . 'where c.date>=?1 and c.date<=?2')
                    ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                    ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                    ->getSingleScalarResult();
            $monthTab[] = ['month' => $calendarElt['month'], 'nombre' => $monthNombre,
                'pathTab' => $tab_path, 'totalT' => $total_travailleur, 'totalNT' => $total_nonTravailleur];
        }

        return ['header' => $pathologies, 'content' => $monthTab];
    }
    
    /**
     * @Rest\Get(path="/{id}/{annee}/diagram-statistique-mensuelle-travailleur/", name="pathologie_diagram_statistique_mensuelle_travailleur")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getMensualTravailleurStatisticDiagram(Pathologie $pathologie,$annee): array {
        $em = $this->getDoctrine()->getManager();
//        $pathologies = $this->getDoctrine()
//                ->getRepository(Pathologie::class)
//                ->findAll();
        $monthTab = [];
        foreach (Utils::$calendarParams as $calendarElt) {
            $tab_path = [];
            $total_travailleur = 0;
            $total_nonTravailleur = 0;
            //foreach ($pathologies as $pathologie) {
                $monthNombreT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2 and  and d.typePatient in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $total_travailleur += $monthNombreT;
                $monthNombreNT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2 and  and d.typePatient not in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $total_nonTravailleur += $monthNombreNT;
                //$tab_path[] = ["travailleur" => $monthNombreT, 'ntravailleur' => $monthNombreNT];
            //}
//            $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
//                            . 'where c.date>=?1 and c.date<=?2')
//                    ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
//                    ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
//                    ->getSingleScalarResult();
            $monthTab[] = ['month' => $calendarElt['month'],"travailleur" => $monthNombreT, 'ntravailleur' => $monthNombreNT];
        }

        return $monthTab;
    }

    /**
     * @Rest\Get(path="/{mois}/{annee}/statistique-journaliere-travailleur/", name="pathologie_statistique_journaliere_travailleur")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getDaylyTravailleurStatistic($mois, $annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $calendarElt = Utils::$calendarParams[$mois];
        $monthTab = [];
        $dayTab = [];
        for ($i = 1; $i <= $calendarElt['endTo']; $i++) {
            $pathTab = [];
            $totalT = 0;
            $totalNT = 0;
            foreach ($pathologies as $pathologie) {
                $nbrTravailleurJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient in (?2)')
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->setParameter(3, $pathologie)
                            ->getSingleScalarResult();
                $totalT += $nbrTravailleurJr;
                $nbrNTJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient not in (?2)'
                                           )
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->setParameter(3, $pathologie)
                            ->getSingleScalarResult();
                $totalNT += $nbrNTJr;
                $pathTab[] = ['travailleur' => $nbrTravailleurJr, 'nt' => $nbrNTJr];
            }
            $dayTab[] = ['day' => $i, 'pathTab' => $pathTab, 'totalT' => $totalT, 'totalNT' => $totalNT];
        }
        $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                            . 'where c.date>=?1 and c.date<=?2')
                    ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                    ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                    ->getSingleScalarResult();
        $monthTab[] = ['month' => $calendarElt['month'],
                'nombre' => $monthNombre, 'dayTab' => $dayTab];
            
        return ['header' => $pathologies, 'content' => $monthTab];
    }
    
    /**
     * @Rest\Get(path="/{id}/{mois}/{annee}/diagram-statistique-journaliere-travailleur/", name="pathologie_diagram_statistique_journaliere_travailleur")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getDaylyTravailleurStatisticDiagram(Pathologie $pathologie, $mois, $annee): array {
        $em = $this->getDoctrine()->getManager();

        $calendarElt = Utils::$calendarParams[$mois];
        $dayTab = [];
        for ($i = 1; $i <= $calendarElt['endTo']; $i++) {            
            //$totalT = 0;
           // $totalNT = 0;
            $nbrTravailleurJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient in (?2)'
                                                 )
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->setParameter(3, $pathologie)
                            ->getSingleScalarResult();
            //$totalT += $nbrTravailleurJr;
            $nbrNTJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient not in (?2)'
                                       )
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->setParameter(3, $pathologie)
                            ->getSingleScalarResult();
            //$totalNT += $nbrNTJr;
            $dayTab[] = ['day' => $i, 'nbrTravailleurJr' => $nbrTravailleurJr, 'nbrNTJr' => $nbrNTJr];
        }

            
        return $dayTab;
    }

    /**
     * @Rest\Get(path="/{annee}/statistique-generale/", name="pathologie_statistique_generale")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getGeneralStatistic($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $monthTab = [];
        foreach (Utils::$calendarParams as $calendarElt) {
            $pathTab = [];
            foreach ($pathologies as $pathologie) {
                $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'where c.date>=?1 and c.date<=?2')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->getSingleScalarResult();
                $pathTab[] = ['nombre' => $monthNombre];
            }
            $totalMonth = $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                            . 'where c.date>=?1 and c.date<=?2')
                    ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                    ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                    ->getSingleScalarResult();
            $monthTab[] = ['month' => $calendarElt['month'], 'pathTab' => $pathTab, 'total' => $totalMonth];
        }
        return ['header' => $pathologies, 'content' => $monthTab];
    }
    
    /**
     * @Rest\Get(path="/{annee}/diagram-statistique-generale/", name="pathologie_diagram_statistique_generale")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getGeneralStatisticDiagram($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $dataTab=[];
        $month = [];
        foreach (Utils::$calendarParams as $calendarElt) {
            $month[]=$calendarElt['month'];
        }
        foreach ($pathologies as $pathologie) {
            $pathTab = [];
            foreach (Utils::$calendarParams as $calendarElt) {
                $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'where c.date>=?1 and c.date<=?2')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->getSingleScalarResult();
                $pathTab[] = $monthNombre;
            }
            $dataTab[] = ['pathologie' => $pathologie, 'pathTab' => $pathTab];
        }
        return ['month' => $month , 'dataTab' =>$dataTab];
    }

    /**
     * @Rest\Post(Path="/create", name="pathologie_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_CREATE")
     */
    public function create(Request $request): Pathologie {
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
    public function show(Pathologie $pathologie): Pathologie {
        return $pathologie;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="pathologie_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_PATHOLOGIE_EDIT")
     */
    public function edit(Request $request, Pathologie $pathologie): Pathologie {
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
    public function cloner(Request $request, Pathologie $pathologie): Pathologie {
        $em = $this->getDoctrine()->getManager();
        $pathologieNew = new Pathologie();
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
    public function delete(Pathologie $pathologie): Pathologie {
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
