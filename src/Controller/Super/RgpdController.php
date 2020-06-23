<?php

namespace App\Controller\Super;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/administrator", name="super_admin_rgpd_")
 */
class RgpdController extends AbstractController
{
    /**
     * @Route("/rgpd", name="index")
     */
    public function index()
    {
        return $this->render('root/super/pages/rgpd/index.html.twig');
    }
}
