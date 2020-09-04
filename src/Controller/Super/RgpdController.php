<?php

namespace App\Controller\Super;

use App\Entity\Rgpd;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/administrator", name="super_rgpd_")
 */
class RgpdController extends AbstractController
{
    /**
     * @Route("/rgpd", name="index")
     */
    public function index(SerializerInterface $serializer)
    {
        $em = $this->getDoctrine()->getManager();
        $demandes = $em->getRepository(Rgpd::class)->findBy([], ['createAt' => 'DESC']);

        $demandes = $serializer->serialize($demandes, 'json', ['attributes' => [
            'id', 'firstname', 'email', 'subject', 'subjectToStringShort', 'message', 'createAtString', 'isSeen'
        ]]);

        return $this->render('root/super/pages/rgpd/index.html.twig', [
            'demandes' => $demandes
        ]);
    }

     /**
     * @Route("/rgpd/update/seen/{rgpd}", options={"expose"=true}, name="update_seen")
     */
    public function updateIsSeen(Rgpd $rgpd)
    {
        $em = $this->getDoctrine()->getManager();
        if(!$rgpd->getIsSeen()){
            $rgpd->setIsSeen(true);
            $em->persist($rgpd);
            $em->flush();

            return new JsonResponse([ 'code' => 1 ]);
        }

        return new JsonResponse([ 'code' => 0 ]);
    }
}
