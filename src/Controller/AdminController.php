<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", options={"expose"=true}, name="admin_dashboard")
     */
    public function index()
    {
        return $this->render('root/admin/index.html.twig');
    }
}
