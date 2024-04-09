<?php

namespace App\ApiResource;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Appointment;

#[ApiResource(
    operations: [
        // Opérations par défaut (GET, POST, PUT, DELETE)
/*         new GetCollection(),
        new Get(),
        new Post(),
        new Put(),
        new Delete(), */
    ],
    resource: Appointment::class
)]

class AppointmentResource
{
    // Aucune implémentation nécessaire ici
}