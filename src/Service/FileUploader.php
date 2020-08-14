<?php


namespace App\Service;


use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $em;
    private $publicDirectory;
    private $privateDirectory;

    public function __construct($publicDirectory, $privateDirectory, EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->publicDirectory = $publicDirectory;
        $this->privateDirectory = $privateDirectory;
    }

    public function upload(UploadedFile $file, $folders, $isPublic)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
        $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $dir = ($isPublic ? $this->getPublicDirectory() : $this->getPrivateDirectory());
            $this->createFolders($dir, $folders);
            $path = $dir . $folders ;
            if(!is_dir($path)){ mkdir($path); }
            $file->move($path, $fileName);
        } catch (FileException $e) {
            throw new Exception($e);
        }

        return $folders . $fileName;
    }

    public function createFolders($directory, $folders)
    {
        $tab = explode('/', $folders);
        $chaine = "";
        foreach($tab as $folder){
            if($folder != ""){
                $chaine .= $folder . '/';
                $path = $directory . $chaine;
                if(!is_dir($path)){ mkdir($path); }
            }
        }
    }

    public function getPublicDirectory()
    {
        $dire = $this->publicDirectory;
        if(!is_dir($dire)){ mkdir($dire); }
        return $dire;
    }
    public function getPrivateDirectory()
    {
        $dire = $this->privateDirectory;
        if(!is_dir($dire)){ mkdir($dire); }
        return $dire;
    }
}
