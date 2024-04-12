<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/profil", name="api_profil")
 */
class ProfilController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/{id}", name="api_profil_show", methods=["GET"])
     */
    public function getuserdataProfil(int $id): JsonResponse
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);

        if (!$user) {
            throw new NotFoundHttpException('Utilisateur introuvable');
        }

        $userData = [
            'patient' => [
                'id' => $user->getId(),
                'Nom' => $user->getNom(),
                'Email' => $user->getEmail(),
                // Never return password in the response!
                // 'Password'=> $user->getPassword()
            ]
        ];

        return new JsonResponse($userData);
    }
}