<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class LoginController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request): Response
    {
        // Récupérer les données de la requête
        $data = json_decode($request->getContent(), true);

        // Récupérer l'email et le mot de passe
        $email = $data['Email'];
        $password = $data['Password'];

        // Recherche de l'utilisateur par son email
        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['Email' => $email]);

        // Vérifier si l'utilisateur existe
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si le mot de passe correspond
        if ($user->getPassword() !== $password) {
            return new JsonResponse(['message' => 'Mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        // Si tout est correct, retourner une réponse réussie
        return new JsonResponse(['message' => 'Connexion réussie']);
    }
}
