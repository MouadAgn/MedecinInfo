<?php

namespace App\ApiResource\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


// use Symfony\Component\HttpFoundation\JsonResponse;
// use App\Entity\Patient;



class AppointmentResource extends AbstractController
{
    /**
     * @Route("/api/appointment", name="api_appointment_get", methods={"GET"})
     */
    // public function getAppointment(): JsonResponse
    // {
    //     $appointment = $this->getDoctrine()->getRepository(Appointment::class)->findAll();
    //     $data = [];

    //     foreach ($appointment as $appointment) {
    //         $data[] = [
    //             'id' => $appointment->getId(),
    //             'Date' => $appointment->getDate(),
    //             'Time' => $appointment->getTime(),
    //             'Comment' => $appointment->getComment(),
    //             'Patient' => $appointment->getPatient(),
    //         ];
    //     }

    //     return new JsonResponse($data, JsonResponse::HTTP_OK);
    // }

    // /**
    //  * @Route("/api/appointment", name="api_appointment_post", methods={"POST"})
    //  */
    // public function postAppointment(): JsonResponse
    // {
    //     $data = json_decode(file_get_contents('php://input'), true);

    //     $date = $data['Date'];
    //     $time = $data['Time'];
    //     $comment = $data['Comment'];
    //     $patient = $data['Patient'];

    //     if (empty($date) || empty($time) || empty($comment) || empty($patient)) {
    //         return new JsonResponse('Expecting mandatory parameters!', JsonResponse::HTTP_BAD_REQUEST);
    //     }

    //     $appointment = new Appointment();
    //     $appointment->setDate(new \DateTime($date));
    //     $appointment->setTime(new \DateTime($time));
    //     $appointment->setComment($comment);
    //     $appointment->setPatient($patient);

    //     $entityManager = $this->getDoctrine()->getManager();
    //     $entityManager->persist($appointment);
    //     $entityManager->flush();

    //     return new JsonResponse('Appointment created!', JsonResponse::HTTP_CREATED);
    // }

    // /**
    //  * @Route("/api/appointment/{id}", name="api_appointment_get_id", methods={"GET"})
    //  */
    // public function getAppointmentById($id): JsonResponse
    // {
    //     $appointment = $this->getDoctrine()->getRepository(Appointment::class)->find($id);

    //     if (!$appointment) {
    //         return new JsonResponse('Appointment not found!', JsonResponse::HTTP_NOT_FOUND);
    //     }

    //     $data = [
    //         'id' => $appointment->getId(),
    //         'Date' => $appointment->getDate(),
    //         'Time' => $appointment->getTime(),
    //         'Comment' => $appointment->getComment(),
    //         'Patient' => $appointment->getPatient
    //     ];
    // }
}