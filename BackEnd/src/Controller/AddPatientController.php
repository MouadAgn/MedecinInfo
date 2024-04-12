<?php 

// src/Controller/AddPatientController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface; // Importez EntityManagerInterface
use App\Entity\Patient; // Assurez-vous d'importer votre entité Patient si nécessaire

class AddPatientController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/patients/add", name="add_patient", methods={"POST"})
     */
    public function AddPatient(Request $request): Response
    {
        // Récupérer les données du formulaire ou de la requête
        $data = json_decode($request->getContent(), true);
        $dateOfBirth = new \DateTime($data['dob']);
        $gender = intval($data['gender']);



        // Valider les données si nécessaire

        // Créer un nouvel enregistrement patient
        $patient = new Patient();
        $patient->setName($data['name']);
        $patient->setDob($dateOfBirth);
        $patient->setGender($gender);
        $patient->setPhone($data['phone']);

        // Obtenez le gestionnaire d'entités à partir de EntityManagerInterface
        $entityManager = $this->entityManager;

        // Persister le nouvel enregistrement
        $entityManager->persist($patient);
        $entityManager->flush();

        // Répondre avec une confirmation ou les détails du patient ajouté
        return $this->json(['message' => 'Patient ajouté avec succès', 'patient' => $patient]);
    }
}
