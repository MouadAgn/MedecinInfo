<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Patient;

use App\Entity\Appointment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;


class AppointmentController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    
    /**
     * @Route("/api/patients/{id}/appointments", name="get_patient_with_appointments", methods={"GET"})
     */
    public function getPatientWithAppointments(Patient $patient): Response
    {
        $appointments = $patient->getAppointment();

        $data = [
            'patient' => [
                'id' => $patient->getId(),
                'name' => $patient->getName(),
                'dob' => $patient->getDob()->format('Y-m-d'),
                'phone'=> $patient->getPhone(),
                'gender' =>$patient->getGender(),

            ],
            'appointments' => [],
        ];

        foreach ($appointments as $appointment) {
            $data['appointments'] = [
                'id' => $appointment->getId(),
                'date' => $appointment->getDate()->format('Y-m-d'),
                'time' => $appointment->getTime()->format('H:i:s'),
                'comment' => $appointment->getComment(),
            ];
        }

        return new JsonResponse($data);
    }


     /**
     * @Route("/planning", name="planning")
     */
    public function getAllAppointments(): Response
    {
        $appointments = $this->em->getRepository(Appointment::class)->findAll();

        $data = [];
        foreach ($appointments as $appointment) {
            $data[] = [
                'id' => $appointment->getPatient()->getId(),
                'date' => $appointment->getDate()->format('Y-m-d'),
                'time' => $appointment->getTime()->format('H:i:s'),
                'patient_name' => $appointment->getPatient()->getName(),
                'comment' => $appointment->getComment(),
            ];
        }

        return new JsonResponse($data);
    }
}
