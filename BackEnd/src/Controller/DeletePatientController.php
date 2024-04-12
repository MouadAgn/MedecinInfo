<?php

// src/Controller/DeletePatientController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Patient;
use Doctrine\ORM\EntityManagerInterface;

class DeletePatientController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/api/patients/{id}", name="delete_patient", methods={"DELETE"})
     */
    public function deletePatient(int $id): Response
    {
        $entityManager = $this->entityManager;
        $patientRepository = $entityManager->getRepository(Patient::class);
        $patient = $patientRepository->find($id);

        if (!$patient) {
            return $this->json(['message' => 'Patient non trouvé'], 404);
        }

        try {
            $entityManager->remove($patient);
            $entityManager->flush();
            return $this->json(['message' => 'Patient supprimé avec succès']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Erreur lors de la suppression du patient : ' . $e->getMessage()], 500);
        }
    }
}
