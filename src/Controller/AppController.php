<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index()
    {
        return $this->render('root/app/index.html.twig');
    }
    /**
     * @Route("/legales/mentions-legales", name="app_mentions")
     */
    public function mentions()
    {
        return $this->render('root/app/pages/legales/mentions.html.twig');
    }
    /**
     * @Route("/legales/politique-confidentialite", name="app_politique")
     */
    public function politique()
    {
        return $this->render('root/app/pages/legales/politique.html.twig');
    }
    /**
     * @Route("/legales/gestion-cookies", name="app_cookies")
     */
    public function cookies()
    {
        return $this->render('root/app/pages/legales/cookies.html.twig');
    }
    /**
     * @Route("/legales/demande-rgpd", name="app_rgpd")
     */
    public function rgpd()
    {
        return $this->render('root/app/pages/legales/rgpd.html.twig');
    }
}
