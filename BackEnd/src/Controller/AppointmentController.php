<?php
// Controller non utiliser pour le moment

namespace App\Controller;

use App\Entity\Appointment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;


class AppointmentController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * @Route("/appointment", name="appointment", methods={"GET"})
     */
    /* public function getAppointment(): JsonResponse
    {
        $appointments = $this->entityManager->getRepository(Appointment::class)->findAll();

        return new JsonResponse($appointments, 200, [], true);
    } */
}
