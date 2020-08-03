<?php

namespace App\Controller\Super;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/administrator/utilisateurs", name="super_users_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", options={"expose"=true}, name="index")
     */
    public function index()
    {
        return $this->render('root/super/pages/user/index.html.twig');
    }
}
