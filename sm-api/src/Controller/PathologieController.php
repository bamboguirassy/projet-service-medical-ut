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
     * @Rest\Get(path="/{annee}/statistique-annuelle-travailleur/", name="pathologie_statistique_annuelle")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getAnnualTravailleurStatistic($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $tabPathos = [];
        foreach ($pathologies as $pathologie) {
            $monthTab = [];
            foreach (Utils::$calendarParams as $calendarElt) {
                $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->getSingleScalarResult();
                $monthNombreT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3 and d.typePatient in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $monthNombreNT = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'JOIN c.dossier d '
                                . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3 and d.typePatient not in (?4)')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->setParameter(4, ["PATS", "PER"])
                        ->getSingleScalarResult();
                $monthTab[] = ['month' => $calendarElt['month'], 'nombre' => $monthNombre, "travailleur" => $monthNombreT, 'nt' => $monthNombreNT];
            }
            $monthAnnual = $em->createQuery('select count(c) from App\Entity\Consultation c '
                            . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3')
                    ->setParameter(1, $annee . '-01-01')
                    ->setParameter(2, $annee . '-12-31')
                    ->setParameter(3, $pathologie)
                    ->getSingleScalarResult();
            $tabPathos[] = ['pathologie' => $pathologie, 'monthTab' => $monthTab, 'total' => $monthAnnual];
        }

        return $tabPathos;
    }

    /**
     * @Rest\Get(path="/{annee}/statistique-mensuelle-travailleur/", name="pathologie_statistique_mensuelle")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getMensualTravailleurStatistic($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $tabPathos = [];
        foreach ($pathologies as $pathologie) {
            $monthTab = [];
            foreach (Utils::$calendarParams as $calendarElt) {
                $dayTab = [];
                for ($i = 1; $i <= $calendarElt['endTo']; $i++) {
                    $nbreJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'where c.date=?1')
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->getSingleScalarResult();
                    $nbrTravailleurJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient in (?2)')
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->getSingleScalarResult();
                    $nbrNTJr = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                    . 'JOIN c.dossier d '
                                    . 'where c.date=?1 and d.typePatient not in (?2)')
                            ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-' . $i)
                            ->setParameter(2, ['PATS', 'PER'])
                            ->getSingleScalarResult();
                    $dayTab[] = ['day' => $i, 'total' => $nbreJr, 'travailleur' => $nbrTravailleurJr, 'nt' => $nbrNTJr];
                }
                $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->getSingleScalarResult();
                $monthTab[] = ['month' => $calendarElt['month'],
                    'nombre' => $monthNombre, 'dayTab' => $dayTab];
            }
            $tabPathos[] = ['pathologie' => $pathologie, 'monthTab' => $monthTab];
        }

        return $tabPathos;
    }
    
    /**
     * @Rest\Get(path="/{annee}/statistique-mensuelle/", name="pathologie_statistique_mensuelle")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_PATHOLOGIE_INDEX")
     */
    public function getMensualStatistic($annee): array {
        $em = $this->getDoctrine()->getManager();
        $pathologies = $this->getDoctrine()
                ->getRepository(Pathologie::class)
                ->findAll();
        $tabPathos = [];
        foreach ($pathologies as $pathologie) {
            $monthTab = [];
            foreach (Utils::$calendarParams as $calendarElt) {
                $monthNombre = $em->createQuery('select count(c) from App\Entity\Consultation c '
                                . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3')
                        ->setParameter(1, $annee . '-' . $calendarElt['code'] . '-01')
                        ->setParameter(2, $annee . '-' . $calendarElt['code'] . '-' . $calendarElt['endTo'])
                        ->setParameter(3, $pathologie)
                        ->getSingleScalarResult();
                $monthTab[] = ['month' => $calendarElt['month'], 'nombre' => $monthNombre];
            }
            $monthAnnual = $em->createQuery('select count(c) from App\Entity\Consultation c '
                            . 'where c.date>=?1 and c.date<=?2 and c.pathologieDiagnostiquee=?3')
                    ->setParameter(1, $annee . '-01-01')
                    ->setParameter(2, $annee . '-12-31')
                    ->setParameter(3, $pathologie)
                    ->getSingleScalarResult();
            $tabPathos[] = ['pathologie' => $pathologie, 'monthTab' => $monthTab, 'total' => $monthAnnual];
        }

        return $tabPathos;
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
