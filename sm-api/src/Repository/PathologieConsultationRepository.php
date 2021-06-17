<?php

namespace App\Repository;

use App\Entity\PathologieConsultation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PathologieConsultation|null find($id, $lockMode = null, $lockVersion = null)
 * @method PathologieConsultation|null findOneBy(array $criteria, array $orderBy = null)
 * @method PathologieConsultation[]    findAll()
 * @method PathologieConsultation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PathologieConsultationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PathologieConsultation::class);
    }

    // /**
    //  * @return PathologieConsultation[] Returns an array of PathologieConsultation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PathologieConsultation
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
