<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SuperAdminController extends AbstractController
{
    /**
     * @Route("/administrator", name="super_admin")
     */
    public function index()
    {
        return $this->render('root/super/index.html.twig');
    }
}
