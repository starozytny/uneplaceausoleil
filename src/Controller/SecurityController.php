<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('app_homepage');
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('root/app/pages/security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/lost", name="app_password_lost", methods="POST")
     */
    public function lost(Request $request, MailerInterface $mailer)
    {
        $em = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent());

        $existe = $em->getRepository(User::class)->findOneBy(array('email' => $data->email->value));

        if(!$existe){
            return new JsonResponse([
                'code' => 0,
                'errors' => [
                    'success' => '', 
                    'email' => ['value' => $data->email->value, 'error' => 'Cette adresse e-mail est invalide.']
                ]
            ]);
        }

        $email = (new Email())
            ->from('chanbora@logilink.fr')
            ->cc($existe->getEmail())
            ->subject('Mot de passe oublié')
            ->text('Lien de réinitialisation de mot de passe de Logilink.')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $mailer->send($email);

        return new JsonResponse(['code' => 1, 'message' => 'Un lien de réinitialisation a été envoyé.']);
    }
}
