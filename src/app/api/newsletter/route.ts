import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/newsletter
 */
export const dynamic = 'force-static';
export async function POST(request: Request) {
  try {
    // Obtener datos del formulario
    const formData = await request.formData();
    const fullname = formData.get("fullname") as string;
    const email = formData.get("email") as string;
    const option = formData.get("option") as string;

    // Validar campos
    if (!fullname || !email || !option) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    console.log("Datos del formulario recibidos:", { fullname, email, option });

    try {
      // Crear transporte SMTP con credenciales de Mailtrap
      const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,             // p. ej. "live.smtp.mailtrap.io" o "sandbox.smtp.mailtrap.io"
        port: parseInt(process.env.MAILTRAP_PORT || "587"), // 587 o 2525
        secure: false, // false para 587/2525 con STARTTLS
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
        connectionTimeout: 10000,
        debug: true,
      });

      // Verificar conexión
      await transporter.verify();
      console.log("Conexión a Mailtrap verificada");

      // Configurar email para el usuario
      const mailOptions = {
        from: '"Brotea Newsletter" <mailtrap@demomailtrap.com>', // Ajusta 'from' si tienes dominio verificado
        to: email,
        subject: "¡Gracias por suscribirte a Brotea!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #1A1F2C; margin-bottom: 10px;">¡Bienvenido a Brotea!</h1>
              <div style="width: 100px; height: 5px; background-color: #CAFF00; margin: 0 auto;"></div>
            </div>
            <p>Hola <strong>${fullname}</strong>,</p>
            <p>¡Gracias por suscribirte a nuestro newsletter!</p>
            <p>Has seleccionado: <strong>${option}</strong></p>
            <p>Pronto recibirás noticias y oportunidades de Brotea directamente en tu correo.</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://brotea.xyz" style="display: inline-block; background-color: #CAFF00; color: #1A1F2C; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold;">Visitar Brotea</a>
            </div>
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #777; font-size: 14px;">
              <p>© ${new Date().getFullYear()} Brotea. Todos los derechos reservados.</p>
              <p>Si no solicitaste esta suscripción, puedes ignorar este correo.</p>
            </div>
          </div>
        `,
      };

      // Enviar al usuario
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.messageId);

      // Correo de notificación interno (opcional)
      const adminMailOptions = {
        from: '"Brotea Newsletter" <mailtrap@demomailtrap.com>',
        to: "hello@brotea.xyz",
        subject: "Nueva suscripción al newsletter",
        html: `
          <div>
            <h2>Nueva suscripción al newsletter</h2>
            <p><strong>Nombre:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Opción seleccionada:</strong> ${option}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      console.log("Correo de notificación enviado al administrador");
    } catch (emailError) {
      // Manejo de error en el envío
      console.error("Error al enviar el correo electrónico:", emailError);
      console.log("Simulando envío de correo (modo fallback)...");
      console.log("Email que se habría enviado a:", email);
      console.log("Datos que se habrían guardado:", {
        fullname,
        email,
        option,
        date: new Date(),
      });
    }

    // Simular un pequeño retraso
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Respuesta exitosa (aunque el correo falle, según tu lógica actual)
    return NextResponse.json(
      {
        success: true,
        message: "¡Gracias por suscribirte! Pronto recibirás noticias de Brotea.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al procesar el formulario:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar tu solicitud" },
      { status: 500 }
    );
  }
}
