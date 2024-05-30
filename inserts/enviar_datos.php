<?php
include '../queries/conexion.php';

// Verificar si se ha enviado un formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $usuario = $_POST["usuario"];
    $contraseña = $_POST["contraseña"];
    $intereses = implode(",", $_POST["intereses"]); // Convertir intereses a una cadena separada por comas

    // Hash de la contraseña
    $contraseña_hash = password_hash($contraseña, PASSWORD_DEFAULT);

    // Verificar si el correo electrónico ya existe
    $consulta_correo = "SELECT * FROM usuarios WHERE correo_electronico = ?";
    $correo_existente = false;
    if ($stmt = $conexion->prepare($consulta_correo)) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado->num_rows > 0) {
            $correo_existente = true;
        }
        $stmt->close();
    } else {
        error_log("Error al preparar la consulta de verificación de correo: " . $conexion->error);
        header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
        exit;
    }

    // Verificar si el nombre de usuario ya existe
    $consulta_usuario = "SELECT * FROM usuarios WHERE usuario = ?";
    $usuario_existente = false;
    if ($stmt = $conexion->prepare($consulta_usuario)) {
        $stmt->bind_param("s", $usuario);
        $stmt->execute();
        $resultado = $stmt->get_result();
        if ($resultado->num_rows > 0) {
            $usuario_existente = true;
        }
        $stmt->close();
    } else {
        error_log("Error al preparar la consulta de selección: " . $conexion->error);
        header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
        exit;
    }

    // Mostrar mensajes de error personalizados
    if ($correo_existente && $usuario_existente) {
        header("Location: ../interface/registrarvista.html?mensaje=Usados");
        exit;
    } elseif ($correo_existente) {
        header("Location: ../interface/registrarvista.html?mensaje=Ecorreo");
            exit;
    } elseif ($usuario_existente) {
        header("Location: ../interface/registrarvista.html?mensaje=Eusuario");
            exit;
    } else {
        // Consulta SQL para insertar datos en la tabla
        $sql = "INSERT INTO usuarios (nombre_completo, correo_electronico, usuario, contraseña, intereses) 
                VALUES (?, ?, ?, ?, ?)";
        if ($stmt_insertar = $conexion->prepare($sql)) {
            $stmt_insertar->bind_param("sssss", $nombre, $correo, $usuario, $contraseña_hash, $intereses);
            if ($stmt_insertar->execute()) {
                // Redirigir al usuario a la página de login
                header("Location: ../interface/loginvista.html");
                exit; // Asegúrate de terminar la ejecución del script después de la redirección
            } else {
                error_log("Error al registrar: " . $stmt_insertar->error);
                header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
                exit;
            }
            $stmt_insertar->close();
        } else {
            error_log("Error al preparar la consulta de insercion: " . $conexion->error);
            header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
            exit;
        }
    }

    // Cerrar conexión
    $conexion->close();
}
?>





