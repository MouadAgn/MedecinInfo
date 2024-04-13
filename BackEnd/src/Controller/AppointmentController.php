<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Patient;
use App\Entity\Appointment;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpFoundation\Request;

class AppointmentController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }
    
    /**
     * @Route("/api/appointments/patient/{id}", name="get_patient_with_appointments", methods={"GET"})
     */
    // Cette route un seul rendez-vous pour les patients (utiliser dans patient/appointment/id_patient)
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
        $data['appointments'] = array_slice($data['appointments'], -5);
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

    /**
     * @Route("/api/appointments/add/patient/{patientid}", name="add_appointment", methods={"POST"})
     */
    public function addAppointment(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $patientid = $data['id'];
        $date = new \DateTime($data['date']);
        $time = new \DateTime($data['time']);
        $comment = $data['comment'];

        $patient = $this->em->getRepository(Patient::class)->find($patientid);

        $appointment = new Appointment();
        $appointment->setPatient($patient);
        $appointment->setDate($date);
        $appointment->setTime($time);
        $appointment->setComment($comment);

        $this->em->persist($appointment);
        $this->em->flush();

        return new JsonResponse(['response' => 'Rendez-vous ajouté!'], Response::HTTP_CREATED);
    }

    /**
     * Route test, récupére tout les rendez-vous d'un patient
     */
    #[Route('/apiRoute/patient/appointments/{id}', name: 'get_patient_appointments', methods: ['GET'])]
    public function getPatientAppointments(Patient $patient): Response
    {
        $appointments = $patient->getAppointment()->toArray();

        usort($appointments, function($a, $b) {
            return $b->getDate()->getTimestamp() - $a->getDate()->getTimestamp();
        });

        $data = [];
        foreach ($appointments as $appointment) {
            $data[] = [
                'name' => $patient->getName(),
                'id' => $appointment->getId(),
                'date' => $appointment->getDate()->format('Y-m-d'),
                'time' => $appointment->getTime()->format('H:i:s'),
                'comment' => $appointment->getComment(),
            ];
        }

        return new JsonResponse($data);
    }
}
