<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SuperAdminController extends AbstractController
{
    /**
     * @Route("/administrator/dashboard", options={"expose"=true}, name="super_dashboard")
     */
    public function index()
    {
        return $this->render('root/super/index.html.twig');
    }
}
