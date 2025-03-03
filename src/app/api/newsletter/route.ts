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
        host: process.env.MAILTRAP_HOST || "bulk.smtp.mailtrap.io",
        port: parseInt(process.env.MAILTRAP_PORT || "587"),
        secure: false, // false para 587
        auth: {
          user: process.env.MAILTRAP_USER || "apismtp@mailtrap.io",
          pass: process.env.MAILTRAP_PASS || "df9e558b69d3b5641225885b81c61925",
        },
        connectionTimeout: 10000,
        debug: true
      });

      // Verificar conexión
      await transporter.verify();
      console.log("Conexión a Mailtrap verificada");

      // Configurar email para el usuario con encabezados anti-spam
      const mailOptions = {
        from: '"Brotea Team" <hello@brotea.xyz>',
        to: email,
        subject: "Your Brotea Community Confirmation",
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'Importance': 'Normal',
          'X-Mailer': 'Brotea Mailer System',
          'List-Unsubscribe': '<mailto:unsubscribe@brotea.xyz?subject=unsubscribe>'
        },
        text: `Hello ${fullname},\n\nThank you for joining the Brotea community! We've received your request for: ${option}.\n\nWe'll keep you updated with relevant information.\n\nBest regards,\nThe Brotea Team\n\nhttps://brotea.xyz`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Brotea</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
              <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <tr>
                  <td style="padding: 20px 0; text-align: center; background-color: #7E69AB;">
                    <h1 style="color: #E6FFA9; margin: 0;">Welcome to Brotea!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="color: #1A1F2C; margin-top: 0;">Hello ${fullname},</h2>
                    <p>Thank you for joining the Brotea community! We're excited to have you with us.</p>
                    <p>You selected: <strong>${option}</strong></p>
                    <p>You'll soon receive news, events, and opportunities from Brotea directly in your inbox.</p>
                    <p style="text-align: center; margin: 30px 0;">
                      <a href="https://brotea.xyz" style="display: inline-block; background-color: #E6FFA9; color: #1A1F2C; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Brotea</a>
                    </p>
                    <p style="color: #777; margin-top: 40px; font-size: 14px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
                      &copy; ${new Date().getFullYear()} Brotea. All rights reserved.<br>
                      If you didn't request this subscription, you can ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      };

      // Enviar al usuario
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo enviado:", info.messageId);

      // Correo de notificación interno (opcional)
      const adminMailOptions = {
        from: '"Brotea System" <system@brotea.xyz>',
        to: "hello@brotea.xyz",
        subject: "New community member",
        text: `New member details:\nName: ${fullname}\nEmail: ${email}\nInterest: ${option}\nDate: ${new Date().toLocaleString()}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 15px;">
            <h3>New community member</h3>
            <p><b>Name:</b> ${fullname}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Interest:</b> ${option}</p>
            <p><b>Date:</b> ${new Date().toLocaleString()}</p>
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
        message: "Thank you for subscribing! You'll soon receive news from Brotea.",
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
