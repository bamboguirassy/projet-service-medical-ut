<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controller;

use App\Entity\User;
use App\Utils\Utils;
use DateInterval;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use FOS\UserBundle\Model\UserManagerInterface as UserManager;
use FOS\UserBundle\Util\TokenGeneratorInterface;
use Swift_Mailer;
use Swift_Message;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

/**
 * Description of AuthController
 *
 * @author bambo
 * @author faye
 *
 * @Route("/api/auth")
 */
class AuthController extends AbstractController
{
    /**
     * @Rest\Get(path="/current_user/", name="current_user_show")
     * @Rest\View(StatusCode=200)
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     */
    public function getCurrentUser(): User
    {
        return $this->getUser();
    }

    /**
     * @Rest\Post(path="/public/forgot-password", name="user_password_reset")
     * @Rest\View(StatusCode=200)
     * @param Request $request
     * @param Swift_Mailer $mailer
     * @param TokenGeneratorInterface $generator
     * @return int
     * @throws Exception
     */
    public function resetPassword(Request $request, Swift_Mailer $mailer, TokenGeneratorInterface $generator): int
    {
        /** @var User $user */

        $email = Utils::serializeRequestContent($request)['email'];
        $manager = $this->getDoctrine()->getManager();
        $user = $manager->getRepository(User::class)->findOneByEmail($email);
        if (!isset($user)) throw new BadRequestHttpException('Aucun utilisateur trouvé pour cette adresse email');
        if ($user->getSource() == 'gpe') throw new BadRequestHttpException('Vous devez effectué la récupération du mot de passe depuis GPE');

        $user->setConfirmationToken($generator->generateToken());
        $user->setPasswordRequestedAt(new DateTime());
        $manager->flush();

        $link = Utils::$passwordResetLink . $user->getConfirmationToken(); // confirmation link
        $message = (new Swift_Message('Lien de réinitialisation du Mot de passe.'))
            ->setFrom(Utils::$sender)
            ->setTo($user->getEmail())
            ->setBody($this->renderView('emails/forgot-password/forgot-password.html.twig', compact('user', 'link')), 'text/html');

        return $mailer->send($message); // 0 => failure
    }

    /**
     * @Rest\Post(path="/public/update-password", name="user_password_update")
     * @Rest\View(StatusCode=200)
     * @param Request $request
     * @param UserManager $userManager
     * @return mixed
     * @throws Exception
     */
    public function updatePassword(Request $request, UserManager $userManager)
    {
        /** @var User $user */
        $data = Utils::serializeRequestContent($request);

        $user = $this->checkTokenValidity($data['token']);
        $user->setPlainPassword($data['password']);
        $user->setConfirmationToken(null)->setPasswordRequestedAt(null);

        $userManager->updateUser($user);

        return true;
    }

    /**
     * @Rest\Get(path="/public/user/{token}", name="check_user_token")
     * @Rest\View(StatusCode=200)
     * @param $token
     * @return User
     * @throws Exception
     */
    public function checkTokenValidity($token)
    {
        /** @var User $user */

        if (!isset($token)) throw new BadRequestHttpException('Jeton introuvable');
        $manager = $this->getDoctrine()->getManager();
        $user = $manager->getRepository(User::class)->findOneByConfirmationToken($token);
        if (!isset($user)) throw new BadRequestHttpException("Ce lien n'est plus valide");

        $dateOfRequest = $user->getPasswordRequestedAt()->add(new DateInterval('PT48H')); // ajoute 48h comme délais d'expirartion
        if (new DateTime() < $dateOfRequest) return $user; // si le token est toujours valide

        throw new BadRequestHttpException('Jeton expiré');
    }


    /**
     * @Rest\Get(path="/public/enable-account/{confirmationToken}", name="enable_user_account")
     * @Rest\View(statusCode=200)
     */
    public function enableUserAccount(Request $request, EntityManagerInterface $entityManager, $confirmationToken)
    {
        /** @var User $user */
        $user = $entityManager->getRepository(User::class)
            ->findOneBy(compact('confirmationToken'));

        if (!$user) throw new AccessDeniedHttpException("Lien invalide. Veuillez contacter l'administrateur systéme.");

        if ($user->isEnabled()) throw new AccessDeniedHttpException("Compte  déjà actif.");

        if (new DateTime() < $user->getPasswordRequestedAt()->add(new DateInterval('P2D'))) {
            $user->setEnabled(true);
            $user->setPasswordRequestedAt(null);
            $user->setConfirmationToken(null);
            $entityManager->flush();
            return $user;
        }
        $user->setPasswordRequestedAt(null);
        $user->setConfirmationToken(null);
        $entityManager->flush();
        throw new AccessDeniedHttpException("Ce lien n'est plus valide. Veuillez recommencer la procédure.");

    }
}
