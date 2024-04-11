<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProfilController extends AbstractController
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    // #[Route('/profil', name: 'app_profil')]
    // public function index(): Response
    // {
    //     return $this->render('profil/index.html.twig', [
    //         'controller_name' => 'ProfilController',
    //     ]);
    // }


    /**
     * @Route("/api/users", name="getuserdataProfil", method={'GET'})
     */
    public function getuserdataProfil(User $user): JsonResponse
    {
        $userData = [
            'patient' => [
                'id' => $user->getId(),
                'Nom' => $user->getNom(),
                'Email' => $user->getEmail(),
                'Password'=> $user->getPassword()
            ]
        ];

        return new JsonResponse($userData);
    }

}
