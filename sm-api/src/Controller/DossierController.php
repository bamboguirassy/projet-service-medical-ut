<?php

namespace App\Controller;

use App\Entity\Dossier;
use App\Form\DossierType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Swift_Mailer;
use Swift_Message;

/**
 * @Route("/api/dossier")
 */
class DossierController extends AbstractController
{
    /**
     * @Rest\Get(path="/", name="dossier_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_DOSSIER_INDEX")
     */
    public function index(): array
    {
        $dossiers = $this->getDoctrine()
            ->getRepository(Dossier::class)
            ->findAll();

        return count($dossiers)?$dossiers:[];
    }

    /**
     * @Rest\Post(Path="/create", name="dossier_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_CREATE")
     */
    public function create(Request $request): Dossier    {
        $dossier = new Dossier();
        $form = $this->createForm(DossierType::class, $dossier);
        $form->submit(Utils::serializeRequestContent($request));
        $requestData = Utils::getObjectFromRequest($request);
        if(!isset($requestData->dateNaissance)) {
            throw $this->createNotFoundException("La date de naissance est obligatoire !");
        }
        $dossier->setDateNaissance(new \DateTime($requestData->dateNaissance));
        
        $dossier->setUserEmail($this->getUser());
        $dossier->setDateCreation(new \DateTime());
        $dossier->setNumero(strtoupper(uniqid()));

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($dossier);
        $entityManager->flush();

        return $dossier;
    }

    /**
     * @Rest\Get(path="/{id}", name="dossier_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_SHOW")
     */
    public function show(Dossier $dossier): Dossier    {
        return $dossier;
    }

    
    /**
     * @Rest\Put(path="/{id}/edit", name="dossier_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_EDIT")
     */
    public function edit(Request $request, Dossier $dossier): Dossier    {
        $form = $this->createForm(DossierType::class, $dossier);
        $form->submit(Utils::serializeRequestContent($request));

        $this->getDoctrine()->getManager()->flush();

        return $dossier;
    }
    
    /**
     * @Rest\Put(path="/{id}/clone", name="dossier_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_CLONE")
     */
    public function cloner(Request $request, Dossier $dossier):  Dossier {
        $em=$this->getDoctrine()->getManager();
        $dossierNew=new Dossier();
        $form = $this->createForm(DossierType::class, $dossierNew);
        $form->submit(Utils::serializeRequestContent($request));
        $em->persist($dossierNew);

        $em->flush();

        return $dossierNew;
    }

    /**
     * @Rest\Delete("/{id}", name="dossier_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_EDIT")
     */
    public function delete(Dossier $dossier): Dossier    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($dossier);
        $entityManager->flush();

        return $dossier;
    }
    
    /**
     * @Rest\Post("/delete-selection/", name="dossier_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_DOSSIER_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $dossiers = Utils::getObjectFromRequest($request);
        if (!count($dossiers)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($dossiers as $dossier) {
            $dossier = $entityManager->getRepository(Dossier::class)->find($dossier->id);
            $entityManager->remove($dossier);
        }
        $entityManager->flush();

        return $dossiers;
    }
    
    /**
     * @Rest\Post(path="/search", name="dossier_search")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_DOSSIER_INDEX")
     */
    public function searchDossier(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $redData = Utils::serializeRequestContent($request);
        //$searchTerm = $redData['searchTerm'];       
       $dossiers = [];
        if(isset($redData['searchTerm'])){
            $names = explode(' ',$redData['searchTerm']);             
            if(count($names)>1){
                $dossiers = $em->createQuery('SELECT d
                    FROM App\Entity\Dossier d
                    WHERE CONCAT(d.prenoms,\' \',d.nom) LIKE :term')
                ->setParameter('term', '%'.$redData['searchTerm'].'%')
                ->getResult();
            }else{
                $dossiers = $em->createQuery('SELECT d
                    FROM App\Entity\Dossier d
                    WHERE d.prenoms LIKE :term OR
                    d.nom LIKE :term OR 
                    d.matricule LIKE :term OR 
                    d.cni LIKE :term')
                ->setParameter('term', '%'.$redData['searchTerm'].'%')
                ->getResult();
            }
        }
        
        return $dossiers;
    }
     /**
     * @Rest\Post(path="/send-email", name="dossier_send-email")
     * @Rest\View(StatusCode=200)
     * @param Request $request
     * @param Swift_Mailer $mailer
     * @return array
     * @throws Exception
     */
    public function sendEmail(Request $request, Swift_Mailer $mailer): array
    {

        $dossierIds = Utils::serializeRequestContent($request)['id'];
        $entityManager = $this->getDoctrine()->getManager();
        $object = Utils::serializeRequestContent($request)['object'];
        $messaye_body = Utils::serializeRequestContent($request)['message'];
        $result = []; 
        $dossiersSendingEmail=$entityManager->createQuery('
                SELECT e
                FROM App\Entity\Dossier e
                WHERE e.id IN (:dossierIds)
            ')->setParameter('dossierIds', $dossierIds )
                ->getResult();
        foreach ($dossiersSendingEmail as $dossierSendingEmail) {
            if($dossierSendingEmail->getUserEmail()!=NULL) {
                $message = (new Swift_Message($object))
                ->setFrom(Utils::$sender)
                //->setTo($dossierSendingEmail->getUserEmail())
                ->setTo("fallou.ndiaye95@univ-thies.sn")
                ->setBody($messaye_body, 'text/html');
                array_push($result,  [$dossierSendingEmail->getId() => $mailer->send($message)]); 
            }
            else{
                    throw $this->createNotFoundException("L'employé {$dossierSendingEmail->getPrenoms()} {$dossierSendingEmail->getNom()} avec l'identifiant {$dossierSendingEmail->getId()} ne dispose d'aucun email dans le système");
                 }


        }
          
        return $result;
    }
    
}