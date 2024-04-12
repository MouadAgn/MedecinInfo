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
     * @Route("/api/login", name="post_login", methods={"POST"})
     */
    public function post_login(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        // Récupérer l'email et le mot de passe
        $email = $data['email'];
        $password = $data['password'];


        $userRepository = $this->entityManager->getRepository(User::class);
        $user = $userRepository->findOneBy(['Email' => $email]);

        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Vérifier si le mot de passe correspond
        if ($user->getPassword() !== $password) {
            return new JsonResponse(['message' => 'Mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        // Si tout est correct, retourner une réponse réussie
        return new JsonResponse(['message' => 'Connexion réussie',
                                 'id' => $user->getId()]);
    }
}
