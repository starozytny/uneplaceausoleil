<?php

namespace App\Controller\Super;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/administrator/utilisateurs", name="super_users_")
 */
class UserController extends AbstractController
{
    /**
     * @Route("/", options={"expose"=true}, name="index")
     */
    public function index(SerializerInterface $serializer)
    {
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository(User::class)->findBy([], ['username' => 'ASC']);

        $users = $serializer->serialize($users, 'json', ['attributes' => [
            'id', 'username', 'roles', 'email', 'isNew', 'avatar', 'highRole', 'highRoleCode', 'createAtString', 'renouvTimeString'
        ]]);
        return $this->render('root/super/pages/user/index.html.twig', [
            'users' => $users
        ]);
    }
}
