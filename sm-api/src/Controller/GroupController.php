<?php

namespace App\Controller;

use App\Entity\Group;
use App\Form\GroupType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * @Route("/api/group")
 */
class GroupController extends AbstractController {

    /**
     * @Rest\Get(path="/", name="group_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_GROUP_INDEX")
     */
    public function index(): array {
        $groups = $this->getDoctrine()
                ->getRepository(Group::class)
                ->findAll();

        return count($groups) ? $groups : [];
    }

    /**
     * @Rest\Post(Path="/create", name="group_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_CREATE")
     */
    public function create(Request $request): Group {
        $entityManager = $this->getDoctrine()->getManager();
        $group = new Group();
        $form = $this->createForm(GroupType::class, $group);
        $form->submit(Utils::serializeRequestContent($request));
        //check if code already exist
        $searchedGroupByCode = $entityManager->getRepository(Group::class)
                ->findByCode($group->getCode());
        if (count($searchedGroupByCode)) {
            throw $this->createAccessDeniedException("Un groupe avec le même code existe déjà, merci de changer de code...");
        }
        //check if group already exist
        $searchedGroupByName = $entityManager->getRepository(Group::class)
                ->findByName($group->getName());
        if (count($searchedGroupByName)) {
            throw $this->createAccessDeniedException("Un groupe avec le même nom existe déjà, merci de changer le nom...");
        }

        $serializedData = json_decode($request->getContent());
        if (!isset($serializedData->roles)) {
            throw $this->createNotFoundException("Les accès ne sont pas définis pour ce groupe...");
        }
        $accessGroups = $serializedData->roles;
        $roles = [];
        foreach ($accessGroups as $accessGroup) {
            foreach ($accessGroup->accessModels as $accessModel) {
                if ($accessModel->isCreateAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CREATE';
                }
                if ($accessModel->isIndexAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_INDEX';
                }
                if ($accessModel->isShowAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_SHOW';
                }
                if ($accessModel->isCloneAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CLONE';
                }
                if ($accessModel->isDeleteAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_DELETE';
                }
                if ($accessModel->isEditAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_EDIT';
                }
            }
        }

        $group->setRoles($roles);

        $entityManager->persist($group);
        $entityManager->flush();

        return $group;
    }

    /**
     * @Rest\Get(path="/{id}", name="group_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_SHOW")
     */
    public function show(Group $group): Group {
        $accessGroups = $this->getAccessGroups();
        foreach ($accessGroups as $accessGroup) {
            foreach ($accessGroup->accessModels as $accessModel) {
                $indexAccess = 'ROLE_' . $accessModel->tableCode . '_INDEX';
                $createAccess = 'ROLE_' . $accessModel->tableCode . '_CREATE';
                $showAccess = 'ROLE_' . $accessModel->tableCode . '_SHOW';
                $cloneAccess = 'ROLE_' . $accessModel->tableCode . '_CLONE';
                $deleteAccess = 'ROLE_' . $accessModel->tableCode . '_DELETE';
                $editAccess = 'ROLE_' . $accessModel->tableCode . '_EDIT';
                if (in_array($indexAccess, $group->getRoles())) {
                    $accessModel->isIndexAllowed = true;
                }
                if (in_array($createAccess, $group->getRoles())) {
                    $accessModel->isCreateAllowed = true;
                }
                if (in_array($showAccess, $group->getRoles())) {
                    $accessModel->isShowAllowed = true;
                }
                if (in_array($cloneAccess, $group->getRoles())) {
                    $accessModel->isCloneAllowed = true;
                }
                if (in_array($deleteAccess, $group->getRoles())) {
                    $accessModel->isDeleteAllowed = true;
                }
                if (in_array($editAccess, $group->getRoles())) {
                    $accessModel->isEditAllowed = true;
                }
            }
        }
        $group->setRoles($accessGroups);
        return $group;
    }

    /**
     * @Rest\Get(path="/access-group/", name="tables_list")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_CREATE")
     */
    public function getAccessGroups(): array {
        $accessGroups = [
            new AccessGroup("Paramétrage Générale", [
                new AccessModel('GROUP', "Groupe d'utilisateur"),
                new AccessModel('USER', "Utilisateur"),
                new AccessModel('DOCTEUR', "Docteur"),
                new AccessModel('PATHOLOGIE', "Pathologie"),
                new AccessModel('STRUCTUREPARTENAIRE', "Structure Partenaire")
                    ]),
            new AccessGroup("Gestion médicale", [
                new AccessModel('DOSSIER', "Dossier Médical"),
                new AccessModel('CONSULTATION', "Consultation"),
                new AccessModel('INPUTATION', "Inputation"),
                new AccessModel('RENDEZVOUS', "Rendez-vous"),
                new AccessModel('REPOSMEDICAL', "Repos-Medical"),
                new AccessModel('SYMPTOME', "Symptome"),
                new AccessModel('MEDICAMENTREMIS', "Médicament Rémis"),
                new AccessModel('MESURE', "Mesure"),
                    ]),
            new AccessGroup("Gestion Stock médicament", [
                new AccessModel('BONRECEPTION', "Bon Réception"),
                new AccessModel('MEDICAMENT', "Médicament"),
                new AccessModel('MEDICAMENTRECEPTION', "Médicament Réceptionné"),
                    ])
        ];

        return $accessGroups;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="group_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_EDIT")
     */
    public function edit(Request $request, Group $group): Group {
        $form = $this->createForm(GroupType::class, $group);
        $form->submit(Utils::serializeRequestContent($request));
        $serializedData = json_decode($request->getContent());
        if (!isset($serializedData->roles)) {
            throw $this->createNotFoundException("Les accès ne sont pas définis pour ce groupe...");
        }
        $accessGroups = $serializedData->roles;
        $roles = [];
        foreach ($accessGroups as $accessGroup) {
            foreach ($accessGroup->accessModels as $accessModel) {
                if ($accessModel->isCreateAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CREATE';
                }
                if ($accessModel->isIndexAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_INDEX';
                }
                if ($accessModel->isShowAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_SHOW';
                }
                if ($accessModel->isCloneAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CLONE';
                }
                if ($accessModel->isDeleteAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_DELETE';
                }
                if ($accessModel->isEditAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_EDIT';
                }
            }
        }

        $group->setRoles($roles);
        $this->getDoctrine()->getManager()->flush();

        return $group;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="group_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_CLONE")
     */
    public function cloner(Request $request, Group $group): Group {
        $em = $this->getDoctrine()->getManager();
        $groupNew = new Group();
        $form = $this->createForm(GroupType::class, $groupNew);
        $form->submit(Utils::serializeRequestContent($request));

        //check if code already exist
        $searchedGroupByCode = $em->getRepository(Group::class)
                ->findByCode($groupNew->getCode());
        if (count($searchedGroupByCode)) {
            throw $this->createAccessDeniedException("Un groupe avec le même code existe déjà, merci de changer de code...");
        }
        //check if group already exist
        $searchedGroupByName = $em->getRepository(Group::class)
                ->findByName($groupNew->getName());
        if (count($searchedGroupByName)) {
            throw $this->createAccessDeniedException("Un groupe avec le même nom existe déjà, merci de changer le nom...");
        }

        $serializedData = json_decode($request->getContent());
        if (!isset($serializedData->roles)) {
            throw $this->createNotFoundException("Les accès ne sont pas définis pour ce groupe...");
        }
        $accessGroups = $serializedData->roles;
        $roles = [];
        foreach ($accessGroups as $accessGroup) {
            foreach ($accessGroup->accessModels as $accessModel) {
                if ($accessModel->isCreateAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CREATE';
                }
                if ($accessModel->isIndexAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_INDEX';
                }
                if ($accessModel->isShowAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_SHOW';
                }
                if ($accessModel->isCloneAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_CLONE';
                }
                if ($accessModel->isDeleteAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_DELETE';
                }
                if ($accessModel->isEditAllowed) {
                    $roles[] = 'ROLE_' . $accessModel->tableCode . '_EDIT';
                }
            }
        }

        $groupNew->setRoles($roles);
        $em->persist($groupNew);

        $em->flush();

        return $groupNew;
    }

    /**
     * @Rest\Delete("/{id}", name="group_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_DELETE")
     */
    public function delete(Group $group): Group {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($group);
        $entityManager->flush();

        return $group;
    }

    /**
     * @Rest\Post("/delete-selection/", name="group_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_GROUP_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $groups = Utils::getObjectFromRequest($request);
        if (!count($groups)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($groups as $group) {
            $group = $entityManager->getRepository(Group::class)->find($group->id);
            $entityManager->remove($group);
        }
        $entityManager->flush();

        return $groups;
    }

}

class AccessModel {

    public $tableName;
    public $tableCode;
    public $isCreateAllowed;
    public $isEditAllowed;
    public $isIndexAllowed;
    public $isShowAllowed;
    public $isCloneAllowed;
    public $isDeleteAllowed;

    public function __construct($tableCode, $tableName) {
        $this->tableName = $tableName;
        $this->tableCode = $tableCode;
        $this->isCreateAllowed = false;
        $this->isEditAllowed = false;
        $this->isIndexAllowed = false;
        $this->isShowAllowed = false;
        $this->isCloneAllowed = false;
        $this->isDeleteAllowed = false;
    }

}

class AccessGroup {

    public $groupName;
    public $accessModels;

    public function __construct($groupName, $accessModels) {
        $this->groupName = $groupName;
        $this->accessModels = $accessModels;
    }

}
