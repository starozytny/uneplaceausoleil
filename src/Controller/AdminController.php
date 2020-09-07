<?php

namespace App\Controller;

use App\Entity\Contact;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", options={"expose"=true}, name="admin_dashboard")
     */
    public function index()
    {
        $em = $this->getDoctrine()->getManager();

        $contacts = $em->getRepository(Contact::class)->findBy(['isSeen' => false]);
        $totalContacts = count($contacts);

        return $this->render('root/admin/index.html.twig', [
            'totalContacts' => $totalContacts
        ]);
    }
}
