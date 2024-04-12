<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Patient;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class PatientController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/api/patients", name="get_all_patients", methods={"GET"})
     */
    public function getAllPatients(): Response
    {
        $patients = $this->em->getRepository(Patient::class)->findAll();

        $data = [];
        foreach ($patients as $patient) {
            $data[] = [
                'id' => $patient->getId(),
                'name' => $patient->getName(),
                'dob' => $patient->getDob()->format('Y-m-d'),
                'phone' => $patient->getPhone(),
                'gender' => $patient->getGender()
            ];
        }

        return new JsonResponse($data);
    }
}
