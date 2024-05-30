<?php
session_start();
include '../queries/conexion.php';

function esContraseñaValida($contraseña) {
    // Ejemplo de criterios de validación: al menos 8 caracteres, una letra mayúscula, una minúscula y un número
    $longitudMinima = 8;
    $patron = "/^[a-zA-Z0-9_]+$/";

    if (strlen($contraseña) < $longitudMinima) {
        return false;
    }
    if (!preg_match($patron, $contraseña)) {
        return false;
    }
    return true;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION["correo"])) {
        $correo = $_SESSION["correo"];
        $nueva_contraseña = $_POST["nueva_contraseña"];

        if (!esContraseñaValida($nueva_contraseña)) {
            header("Location: ../interface/IngresarNuevaContraseña.html?mensaje=contraseñaInvalida");
            exit;
        }

        $nueva_contraseña_hash = password_hash($nueva_contraseña, PASSWORD_DEFAULT);

        // Actualizar la contraseña en la base de datos
        $consulta = "UPDATE usuarios SET contraseña = ? WHERE correo_electronico = ?";
        if ($stmt = $conexion->prepare($consulta)) {
            $stmt->bind_param("ss", $nueva_contraseña_hash, $correo);
            if ($stmt->execute()) {
                //echo "Contraseña actualizada exitosamente.";
                // Eliminar el código de verificación
                $consulta_delete = "DELETE FROM codigo_verificacion WHERE correo_electronico = ?";
                if ($stmt_delete = $conexion->prepare($consulta_delete)) {
                    $stmt_delete->bind_param("s", $correo);
                    $stmt_delete->execute();
                    $stmt_delete->close();
                }
                session_unset();
                session_destroy();
                header("Location: ../interface/loginvista.html");
                exit;
            } else {
                error_log("Error al actualizar la contraseña: " . $stmt->error);
                header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
                exit;
            }
            $stmt->close();
        } else {
            error_log("Error al preparar la consulta: " . $conexion->error);
            header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
            exit;
        }
    } else {
        error_log("No se ha verificado el correo electrónico.");
        header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
        exit;
    }
}
?>
