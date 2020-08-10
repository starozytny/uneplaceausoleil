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

    public function upload(UploadedFile $file, $folder, $isPublic)
    {
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
        $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();

        try {
            $path = ($isPublic ? $this->getPublicDirectory() : $this->getPrivateDirectory()) . $folder ;
            if(!is_dir($path)){ mkdir($path); }
            $file->move($path, $fileName);
        } catch (FileException $e) {
            throw new Exception($e);
        }

        return $folder . $fileName;
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
