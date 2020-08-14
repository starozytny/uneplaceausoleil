<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SuperAdminController extends AbstractController
{
    /**
     * @Route("/administrator", options={"expose"=true}, name="super_dash")
     */
    public function indexRedirect()
    {
        return $this->redirectToRoute('super_dashboard');
    }
    /**
     * @Route("/administrator/dashboard", options={"expose"=true}, name="super_dashboard")
     */
    public function index()
    {
        return $this->render('root/super/index.html.twig');
    }
}
