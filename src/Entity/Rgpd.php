<?php

namespace App\Entity;

use App\Repository\RgpdRepository;
use DateTime;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RgpdRepository::class)
 */
class Rgpd
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="integer")
     */
    private $subject;

    /**
     * @ORM\Column(type="text")
     */
    private $message;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createAt;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isSeen;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isTrash;

    public function __construct()
    {
        $this->setCreateAt(new DateTime());
        $this->setIsSeen(false);
        $this->setIsTrash(false);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getSubject(): ?int
    {
        return $this->subject;
    }

    public function setSubject(int $subject): self
    {
        $this->subject = $subject;

        return $this;
    }

    public function getSubjectToString()
    {
        $choices = [
            "Droit d'accès sur un traitement de données",
            "Droit de rectification sur un traitement de données",
            "Droit à l'effacement sur un traitement de données",
            "Autre demande concernant un traitement de données"
        ];

        return $choices[$this->getSubject()];
    }

    public function getSubjectToStringShort()
    {
        $choices = [
            "Droit d'accès",
            "Droit rectification",
            "Droit effacement",
            "Autre"
        ];

        return $choices[$this->getSubject()];
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getMonthFr(){
        $m = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        $d = date_format($this->getCreateAt(), 'n');

        return $m[intval($d)];
    }

    public function getMonthShortFr(){
        $m = ['', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
        $d = date_format($this->getCreateAt(), 'n');

        return $m[intval($d)];
    }

    public function getCreateAtString(){
        return date_format($this->getCreateAt(), 'd') . ' ' . $this->getMonthShortFr() . ' ' . date_format($this->getCreateAt(), 'Y');
    }

    public function getIsSeen(): ?bool
    {
        return $this->isSeen;
    }

    public function setIsSeen(bool $isSeen): self
    {
        $this->isSeen = $isSeen;

        return $this;
    }

    public function getIsTrash(): ?bool
    {
        return $this->isTrash;
    }

    public function setIsTrash(bool $isTrash): self
    {
        $this->isTrash = $isTrash;

        return $this;
    }
}
