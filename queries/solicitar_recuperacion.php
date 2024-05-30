<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php'; // Ajusta la ruta según tu estructura de directorios

include 'conexion.php';
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];

    // Verificar si el correo existe en la base de datos
    $consulta = "SELECT * FROM usuarios WHERE correo_electronico = ?";
    if ($stmt = $conexion->prepare($consulta)) {
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            // Generar un código de verificación
            $codigo = rand(100000, 999999);
            
            // Insertar el código en la base de datos
            $consulta_insert = "INSERT INTO codigo_verificacion (correo_electronico, codigo) VALUES (?, ?)";
            if ($stmt_insert = $conexion->prepare($consulta_insert)) {
                $stmt_insert->bind_param("ss", $correo, $codigo);
                $stmt_insert->execute();
                $stmt_insert->close();

                //
                $_SESSION["correo"] = $correo;
                // Enviar el código al correo electrónico usando PHPMailer
                $mail = new PHPMailer(true);

                try {
                    // Configuración del servidor
                    $mail->SMTPDebug = 0;                                       // Desactivar la depuración SMTP
                    $mail->isSMTP();                                            // Enviar usando SMTP
                    $mail->Host       = 'smtp.gmail.com';                       // Configurar el servidor SMTP
                    $mail->SMTPAuth   = true;                                   // Habilitar autenticación SMTP
                    $mail->Username   = 'stevan02henao@gmail.com';                //SMTP username
                    $mail->Password   = 'uyzpvuyjbcqpevuf';                   // Contraseña SMTP
                    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Habilitar encriptación TLS
                    $mail->Port       = 587;                                    // Puerto TCP para conectarse

                    // Destinatarios
                    $mail->setFrom('stevan02henao@gmail.com', 'Tu Nombre o Empresa');
                    $mail->addAddress($correo);                                 // Añadir destinatario

                    // Contenido del correo
                    $mail->isHTML(true);                                        // Configurar el formato del correo a HTML
                    $mail->Subject = 'Código de Verificación';
                    $mail->Body    = 'Su código de verificación es: <b>' . $codigo . '</b>';
                    $mail->AltBody = 'Su código de verificación es: ' . $codigo;

                    $mail->send();
                    header("Location: ../interface/IngresarCodigo.html");
                } catch (Exception $e) {
                    header("Location: ../interface/RecuperarContraseña.html?mensaje=errorMensaje");
                    exit;
                }
            }
        } else {
            header("Location: ../interface/RecuperarContraseña.html?mensaje=errorCorreo");
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

