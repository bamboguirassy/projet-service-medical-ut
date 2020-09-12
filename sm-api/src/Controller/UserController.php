<?php

namespace App\Controller;

use App\Entity\Group;
use App\Entity\User;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use FOS\UserBundle\Model\UserManagerInterface as UserManager;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\NoResultException;
use FOS\UserBundle\Model\GroupManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Utils\Utils;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Service\FileUploader;

/**
 * @Route("/api/user")
 */
class UserController extends AbstractController {

    private $params;

    public function __construct(ParameterBagInterface $params) {
        $this->params = $params;
    }

    /**
     * @Rest\Get(path="/", name="user_index")
     * @Rest\View(StatusCode = 200)
     * @IsGranted("ROLE_USER_INDEX")
     */
    public function index(): array {
        $users = $this->getDoctrine()
                ->getRepository(User::class)
                ->findAll();

        return count($users) ? $users : [];
    }

    /**
     * @Rest\Get(path="/public/email/{email}", name="user_by_email")
     * @Rest\View(StatusCode = 200)
     */
    public function findByEmail($email): User {
        $user = $this->getDoctrine()
                ->getRepository(User::class)
                ->findOneByEmail($email);
        if (!$user) {
            throw $this->createNotFoundException("Cette adresse email n'est associée à aucun compte.");
        }

        return $user;
    }

    /**
     * @Rest\Post(Path="/create", name="user_new")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_CREATE")
     */
    public function create(Request $request, \Swift_Mailer $mailer, UserPasswordEncoderInterface $passwordEncoder, FileUploader $uploader): User {
        $entityManager = $this->getDoctrine()->getManager();
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $form->submit(Utils::serializeRequestContent($request));
        //check if email already exist
        $searchedUserByEmail = $entityManager->getRepository(User::class)
                ->findByEmail($user->getEmail());
        if (count($searchedUserByEmail)) {
            throw $this->createAccessDeniedException("Cette adresse email est déja utilisée pour un autre compte...");
        }
        //verification numéro de téléphone unique
        $searchedUserBytelephone = $entityManager->getRepository(User::class)
                ->findByTelephone($user->getTelephone());
        if (count($searchedUserBytelephone)) {
            throw $this->createAccessDeniedException("Cet numéro est déja utilisé par un autre compte...");
        }

        if (!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $user->getEmail())) {
            throw $this->createAccessDeniedException("Veuillez saisir une adresse e-mail valide.");
        }
        $user->setUsername($user->getEmail());
        $confirmationToken = md5(random_bytes(20));
        $user->setConfirmationToken($confirmationToken);
        $user->setPasswordRequestedAt(new \DateTime());
        $user->setPassword($passwordEncoder->encodePassword($user, 'bienvenue'));
        $user->setEnabled(true);
        $user->setSource('sm');

        //check if file provided
        if ($user->getPathImage()) {
            $host = $request->getHttpHost();
            $scheme = $request->getScheme();
            file_put_contents($user->getFileName(), base64_decode($user->getPathImage()));
            $file = new File($user->getFileName());
            $authorizedExtensions = ['jpeg', 'jpg', 'png'];
            if (!in_array($file->guessExtension(), $authorizedExtensions)) {
                throw new BadRequestHttpException('Fichier non pris en charge');
            }
            $newFileName = $uploader->setTargetDirectory('user_image_directory')->upload($file, null); // old fileName
            $user->setPathImage("$scheme://$host/" . $uploader->getTargetDirectory() . $newFileName);
            $user->setFileName($newFileName);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        //send confirmation mail
        /* $message = (new \Swift_Message('Creation Compte'))
          ->setFrom(Utils::$senderEmail)
          ->setTo($user->getEmail())
          ->setBody(
          $this->renderView(
          'emails/register.html.twig', ['user' => $user, 'siteUrl' => Utils::$siteUrl . '/reset-password/' . $confirmationToken]
          ), 'text/html'
          );
          $mailer->send($message); */

        return $user;
    }

    /**
     * @Rest\Get(path="/{id}", name="user_show",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_SHOW")
     */
    public function show(User $user): User {
        return $user;
    }

    /**
     * @Rest\Put(path="/{id}/edit", name="user_edit",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_EDIT")
     */
    public function edit(Request $request, User $user): User {
        // store user before any update
        $form = $this->createForm(UserType::class, $user);
        $form->submit(Utils::serializeRequestContent($request));

        $searchedUser = $this->getDoctrine()->getManager()
                        ->createQuery(
                                'SELECT u FROM App\Entity\User u
                 WHERE (u.email=:email OR u.telephone=:phone) AND u!=:user
            ')->setParameter('phone', $user->getTelephone())
                        ->setParameter('email', $user->getEmail())
                        ->setParameter('user', $user)->getResult();

        if ($searchedUser) {
            if ($searchedUser[0]->getEmail() == $user->getEmail()) {
                throw $this->createAccessDeniedException("Cette adresse e-mail est déja utilisée.");
            }

            if ($searchedUser[0]->getTelephone() == $user->getTelephone()) {
                throw $this->createAccessDeniedException("Ce numéro de telephone est déja utilisé.");
            }
        }

        $this->getDoctrine()->getManager()->flush();

        return $user;
    }

    /**
     * @param Request $request
     * @return bool
     * @Rest\Post(path="/password_check", name="password_check")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_EDIT")
     */
    public function checkCurrentPassword(Request $request) {
        /** @var User $user */
        $user = $this->getUser();

        return password_verify(utils::serializeRequestContent($request)['currentPassword'], $user->getPassword()); // false => failure
    }

    /**
     * @Rest\Put(path="/password_update", name="password_update")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_EDIT")
     * @param Request $request
     * @param UserManager $userManager
     * @return bool
     */
    public function updatePassword(Request $request, UserManager $userManager) {
        /** @var User $user */
        $user = $this->getUser();
        $data = utils::serializeRequestContent($request);
        if (!isset($data['oldPassword'])) {
            throw $this->createNotFoundException("L'ancien mot de passe n'est pas défini !");
        }
        if (!isset($data['newPassword'])) {
            throw $this->createNotFoundException("Aucun nouveau mot de passe reçu !");
        }
        $oldPassword = $data['oldPassword'];
        $confirmPassword = $data['confirmPassword'];
        $newPassword = $data['newPassword'];
        if (!password_verify($oldPassword, $this->getUser()->getPassword())) {
            throw $this->createAccessDeniedException("Le mot de passe n'est pas celui que vous utilisez actuellement !");
        }
        if ($newPassword != $confirmPassword) {
            throw $this->createAccessDeniedException("Le nouveau mot de passe et sa confirmation ne correspondent pas");
        }
        $userManager->updateUser($user->setPlainPassword($newPassword));


        return true;
    }

    /**
     * @Rest\Put(path="/{id}/clone", name="user_clone",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_CLONE")
     */
    public function cloner(Request $request, User $user, \Swift_Mailer $mailer, UserPasswordEncoderInterface $passwordEncoder): User {
        $entityManager = $this->getDoctrine()->getManager();
        $userNew = new User();
        $form = $this->createForm(UserType::class, $userNew);
        $form->submit(Utils::serializeRequestContent($request));
        //check if email already exist
        $searchedUserByEmail = $entityManager->getRepository(User::class)
                ->findByEmail($userNew->getEmail());
        if (count($searchedUserByEmail)) {
            throw $this->createAccessDeniedException("Cette adresse email est déja utilisée pour un autre compte...");
        }
        //verification numéro de téléphone unique
        $searchedProviderByTelephone = $entityManager->getRepository(User::class)
                ->findOneByTelephone($userNew->getTelephone());
        if ($searchedProviderByTelephone) {
            throw $this->createAccessDeniedException("Un utilisateur avec ce même numéro existe déjà.");
        }
        $userNew->setUsername($userNew->getEmail());
        $plainPassword = md5(random_bytes(10));
        $userNew->setPassword($passwordEncoder->encodePassword($userNew, $plainPassword));
        $userNew->setConfirmationToken(md5(random_bytes(20)));
        $userNew->setPasswordRequestedAt(new \DateTime());
        $entityManager->persist($userNew);
        $entityManager->flush();

        //send confirmation mail
        $message = (new \Swift_Message('Creation Compte SICOFT'))
                ->setFrom(Utils::$senderEmail)
                ->setTo($userNew->getEmail())
                ->setBody(
                $this->renderView(
                        'emails/register.html.twig', ['user' => $userNew, 'siteUrl' => Utils::$siteUrl, 'password' => $plainPassword]
                ), 'text/html'
        );


        if ($mailer->send($message)) {
            return $userNew;
        }

        throw new BadRequestHttpException("Un probléme est survenu lors de l'envoie du mail. Meric de réessayer.");
    }

    /**
     * @Rest\Delete("/{id}", name="user_delete",requirements = {"id"="\d+"})
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_DELETE")
     */
    public function delete(User $user, FileUploader $uploader, ParameterBagInterface $params): User {
        $entityManager = $this->getDoctrine()->getManager();
        if ($user->getFileName()) {
            $oldFile = $params->get('user_image_directory') . $user->getFileName();
            $fs= new Filesystem();
            if ($fs->exists($oldFile))
                $fs->remove($oldFile); // remove old file
        }
        $entityManager->remove($user);
        $entityManager->flush();

        return $user;
    }

    /**
     * @Rest\Post("/delete-selection/", name="user_selection_delete")
     * @Rest\View(StatusCode=200)
     * @IsGranted("ROLE_USER_DELETE")
     */
    public function deleteMultiple(Request $request): array {
        $entityManager = $this->getDoctrine()->getManager();
        $users = Utils::getObjectFromRequest($request);
        if (!count($users)) {
            throw $this->createNotFoundException("Selectionner au minimum un élément à supprimer.");
        }
        foreach ($users as $user) {
            $user = $entityManager->getRepository(User::class)->find($user->id);
            $entityManager->remove($user);
        }
        $entityManager->flush();

        return $users;
    }

    /**
     * @Rest\Put(path="/change_image_profil", name="edit_profile_picture")
     * @Rest\View(StatusCode=200)
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @param Request $request
     * @param FileUploader $uploader
     * @return User
     * @throws Exception
     */
    public function uploadProfilePhoto(Request $request, FileUploader $uploader) {
        /** @var User $user */
        $user = $this->getUser();
        $manager = $this->getDoctrine()->getManager();
        $host = $request->getHttpHost();
        $scheme = $request->getScheme();
        $data = Utils::getObjectFromRequest($request);
        $fileName = $data->fileName;

        file_put_contents($fileName, base64_decode($data->photo));
        $file = new File($fileName);
        $authorizedExtensions = ['jpeg', 'jpg', 'png'];
        if (!in_array($file->guessExtension(), $authorizedExtensions))
            throw new BadRequestHttpException('Fichier non pris en charge');
        $newFileName = $uploader->setTargetDirectory('user_image_directory')->upload($file, $user->getFileName()); // old fileName
        $user->setPathImage("$scheme://$host/" . $uploader->getTargetDirectory() . $newFileName);
        $user->setFileName($newFileName);
        $manager->flush();

        return $user;
    }

    function generateFakeData() {
        // find groups
        $em = $this->getDoctrine()->getManager();
        $groups = $em->getRepository(Group::class)->findAll();

        $faker = \Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 200; $i++) {
            $user = new User();
            $user->setEmail($faker->unique()->email);
            $user->setUsername($user->getEmail());
            $user->setPrenom($faker->firstName);
            $user->setNom($faker->name());
            $user->setGroups($faker->randomElements($groups));
            $user->setEnabled($faker->randomElement([true, false]));
            $user->setSource('sm');
            $user->setPassword($faker->password);
            $em->persist($user);
        }
        $em->flush();
    }

}
