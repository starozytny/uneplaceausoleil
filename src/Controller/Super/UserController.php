<?php

namespace App\Controller\Super;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
    /**
     * @Route("/update/utilisateur/{user}", options={"expose"=true}, name="user_update")
     */
    public function update(Request $request, $user)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($user);
        if(!$user){
            return new JsonResponse(['code' => 0, 'message' => '[ERREUR] Cet utilisateur n\'existe pas.']);
        }

        $data = json_decode($request->get('data'));

        $user->setUsername($data->username->value);
        $user->setEmail($data->email->value);

        $em->persist($user); $em->flush();
        return new JsonResponse(['code' => 1]);
    }
}
