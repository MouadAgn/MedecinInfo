<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

use App\Entity\Patient;
use App\Entity\Treatment;
use Symfony\Component\HttpFoundation\Request;


class TreatmentController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/api/treatments/patient/{id}", name="get_patient_with_treatments", methods={"GET"})
     */

    public function getPatientWithTreatments(Patient $patient): Response
    {
        $treatments = $patient->getTreatment();

        $data = [
            'patient' => [
                'id' => $patient->getId(),
                'name' => $patient->getName(),
                'dob' => $patient->getDob()->format('Y-m-d')
            ],
            'treatments' => [],
        ];

        foreach ($treatments as $treatment) {
            $data['treatments'][] = [
                'id' => $treatment->getId(),
                'name' => $treatment->getName(),
                'datestart' => $treatment->getDateStart()->format('Y-m-d'),
                'dateend' => $treatment->getDateEnd()->format('Y-m-d'),
                'dosage' => $treatment->getDosage(),
                'comment' => $treatment->getComment(),
            ];
        }
        
        $data['treatments'] = array_slice($data['treatments'], -5);
        return new JsonResponse($data);
    }

    /**
     * @Route("/api/treatments/add/patient/{patientid}", name="add_treatment", methods={"POST"})
     */
    public function addTreatment(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $Name = $data['name'];
        $patientid = $data['id'];
        $datestart = new \DateTime($data['dateStart']);
        $dateend = new \DateTime($data['dateEnd']);
        $dosage = $data['dosage'];
        $comment = $data['comment'];

        $patient = $this ->em->getRepository(Patient::class)->find($patientid);

        if (!$patient) {
            return new JsonResponse(['error' => 'Patient non trouvé'], 404);
        }

        $treatment = new Treatment();

        $treatment->setName($Name);
        $treatment->setDateStart($datestart);
        $treatment->setDateEnd($dateend);
        $treatment->setDosage($dosage);
        $treatment->setComment($comment);

        $patient->addTreatment($treatment);

        $this->em->persist($treatment);
        $this->em->flush();

        return new JsonResponse(['response' => 'Traitement ajouté!'], 200);
    }

    /**
     * @Route("/api/treatments/delete/{id}", name="delete_treatment", methods={"DELETE"})
     */

    public function deleteTreatment(Request $request): JsonResponse
    {
        $treatmentid = $request->get('treatmentid');

        $treatment = $this->em->getRepository(Treatment::class)->find($treatmentid);

        if (!$treatment) {
            return new JsonResponse(['error' => 'Traitement non trouvé'], 404);
        }


        $this->em->remove($treatment);
        $this->em->flush();

        return new JsonResponse(['response' => 'Traitement supprimé!'], 200);
    }
}