<?php

namespace App\Repository;

use App\Entity\Rgpd;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Rgpd|null find($id, $lockMode = null, $lockVersion = null)
 * @method Rgpd|null findOneBy(array $criteria, array $orderBy = null)
 * @method Rgpd[]    findAll()
 * @method Rgpd[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RgpdRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Rgpd::class);
    }

    // /**
    //  * @return Rgpd[] Returns an array of Rgpd objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Rgpd
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
