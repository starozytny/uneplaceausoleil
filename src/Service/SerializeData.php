<?php


namespace App\Service;

use Symfony\Component\Serializer\SerializerInterface;

class SerializeData
{
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    public function getSerializeData($obj, $attributes)
    {
        return $this->serializer->serialize($obj, 'json', [ 'attributes' =>  $attributes ]);
    }
}
