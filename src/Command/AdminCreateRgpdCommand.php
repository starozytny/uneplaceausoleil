<?php

namespace App\Command;

use App\Entity\Rgpd;
use App\Entity\User;
use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AdminCreateRgpdCommand extends Command
{
    protected static $defaultName = 'admin:create:rgpd';
    protected $passwordEncoder;
    protected $em;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $entityManager)
    {
        parent::__construct();

        $this->passwordEncoder = $passwordEncoder;
        $this->em = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Create fake rgpd demande.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('Reset des tables');
        $this->resetTable($io,'rgpd');

        $io->title('Création des rgpds fake');
        for($i=0; $i<110 ; $i++) {
            $new = (new Rgpd())
                ->setFirstname("Demande " . $i)
                ->setEmail("demande".$i."@demande.fr")
                ->setMessage("
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                        Sed odio lectus, lacinia vel lectus ut, ultricies sodales odio. Sed posuere sit amet tellus el
                        eifend porta. Aenean sit amet elit eget neque scelerisque sagittis elementum quis nibh. Pellen
                        tesque vehicula nisi vel interdum laoreet. Interdum et malesuada fames ac ante ipsum primis in 
                        faucibus. Proin non felis vulputate, imperdiet felis eget, suscipit tellus. Mauris nec augue es
                        t. Nam sit amet nunc aliquet, consectetur elit eget, sodales est. Duis consequat ultrices lect
                        us ac faucibus.
                ")
            ;

            if ($i < 15){
                $new->setSubject(0);
            }else if ($i >= 15 && $i < 50){
                $new->setSubject(1);
            }else{
                $new->setSubject(2);
            }

            if ($i < 5) {
                $new->setIsSeen(true);
            }

            $this->em->persist($new);
            $io->text('RGPD : ' . "Demande " . $i . ' créé' );
        }

        
        $this->em->flush();

        $io->comment('--- [FIN DE LA COMMANDE] ---');
        return 0;
    }

    protected function resetTable(SymfonyStyle $io, $item)
    {
        $connection = $this->em->getConnection();

        $connection->beginTransaction();
        try {
            $connection->query('SET FOREIGN_KEY_CHECKS=0');
            $connection->executeUpdate(
                $connection->getDatabasePlatform()->getTruncateTableSQL(
                    $item, true
                )
            );
            $connection->query('SET FOREIGN_KEY_CHECKS=1');
            $connection->commit();

        } catch (DBALException $e) {
            $io->error('Reset [FAIL] : ' . $e);
        }
        $io->text('Reset [OK]');
    }
}
