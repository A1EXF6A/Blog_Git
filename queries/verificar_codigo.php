<?php
session_start();
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el correo electrónico de la sesión
    $correo = $_SESSION["correo"];
    $codigo = $_POST["codigo"];

    // Verificar el código de verificación
    $consulta = "SELECT * FROM codigo_verificacion WHERE correo_electronico = ? ORDER BY creado_en DESC LIMIT 1";
    if ($stmt = $conexion->prepare($consulta)) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            if ($fila['codigo'] == $codigo) {
                // Si el código es correcto, redirigir a la página de cambiar contraseña
                header("Location: ../interface/IngresarNuevaContraseña.html");
                exit;
            } else {
                //incorrecto
                header("Location: ../interface/loginvista.html?mensaje=errorCodigo");
            exit;
            }
        } else {
            //no hay
            header("Location: ../interface/loginvista.html?mensaje=errorNoE");
            exit;
        }
        $stmt->close();
    } else {
        error_log("Error al preparar la consulta de selección: " . $conexion->error);
        header("Location: ../interface/loginvista.html?mensaje=errorConsulta");
        exit;
    }
}
?>

