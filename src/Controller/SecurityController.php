<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CheckTime;
use App\Service\Mailer;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
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
     * @Route("/lost/{user}", name="app_password_lost")
     */
    public function lost(Request $request, Mailer $mailer, CheckTime $checkTime, User $user = null)
    {
        $em = $this->getDoctrine()->getManager();

        // if come from form
        if($user == null){
            // Check if User existe 
            $data = json_decode($request->getContent());
            $email = $data->email->value;
            $user = $em->getRepository(User::class)->findOneBy(array('email' => $email));
            if(!$user){
                return new JsonResponse([
                    'code' => 0,
                    'errors' => [
                        'success' => '', 
                        'error' => '', 
                        'email' => ['value' => $data->email->value, 'error' => 'Cette adresse e-mail est invalide.']
                    ]
                ]);
            }
            if($user->getPasswordTime()){
                if(!$checkTime->moreThirtyMinutes($user->getPasswordTime())){
                    return new JsonResponse(['code' => 1, 'message' => 'Un lien de réinitialisation a déjà été envoyé.']);
                }
            }
        }

        // Prepare values password code
        $code = uniqid();
        $user->setPasswordCode($code);
        $user->setPasswordTime(new DateTime());

        // Send mail
        $url = $this->generateUrl('app_password_reinit', ['token' => $user->getToken(), 'code' => $code], UrlGeneratorInterface::ABSOLUTE_URL);        
        if($mailer->sendMail(
            'Mot de passe oublié',
            'Lien de réinitialisation de mot de passe',
            'root/app/email/security/lost.html.twig',
            ['user' => $user, 'url' => $url],
            $user->getEmail()
        ) != true){
            return new JsonResponse([
                'code' => 2,
                'errors' => [ 'error' => 'Le service est indisponible', 'success' => '' ]
            ]);
        }

        // Update User with code password and time
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['code' => 1, 'message' => 'Un lien de réinitialisation a été envoyé.']);
    }

    
    /**
     * @Route("/reinitialisation-mot-de-passe/{token}-{code}", name="app_password_reinit")
     */
    public function reinit(Request $request, $token, $code)
    {

        return $this->render('root/app/pages/security/reinit.html.twig');
    }
}
