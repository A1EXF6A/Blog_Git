<?php
include 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];

    $consulta = "SELECT id, contraseña FROM usuarios WHERE usuario='$usuario'";
    $resultado = $conexion->query($consulta);

    if ($resultado->num_rows == 1) {
        $fila = $resultado->fetch_assoc();
        $contraseña_hash = $fila["contraseña"];

        if (password_verify($contraseña, $contraseña_hash)) {
            $_SESSION['user_id'] = $fila['id']; // Guardar el ID del usuario en la sesión
            header("Location: ../interface/listas.html");
            exit;
        } else {
            // Contraseña incorrecta
            header("Location: ../interface/loginvista.html?mensaje=errorC");
            exit;
        }
    } else {
        // Usuario no encontrado
        header("Location: ../interface/loginvista.html?mensaje=errorU");
        exit;
    }
}

$conexion->close();
?>
