<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

use App\Entity\User;

use Symfony\Component\HttpFoundation\JsonResponse;

class ProfilController extends AbstractController
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @Route("/api/users", name="getuserdataProfil", methods={"GET"})
     */
    public function getuserdataProfil(User $users): JsonResponse
    {
        // Obtenez l'utilisateur connecté
        $user = $this->security->getUser();

        // Vérifiez si un utilisateur est connecté
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non connecté'], Response::HTTP_UNAUTHORIZED);
        }

        // Construisez les données utilisateur à renvoyer
        $userData = [
            'patient' => [
                'id' => $users->getId(),
                'Nom' => $users->getNom(),
                'Email' => $users->getEmail(),
                // Ne renvoyez jamais le mot de passe dans la réponse !
                // 'Password'=> $user->getPassword()
            ]
        ];

        return new JsonResponse($userData);
    }
} 
