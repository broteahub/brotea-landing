import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Obtener los datos del formulario
    const formData = await request.formData();
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const option = formData.get('option') as string;

    // Validar los datos
    if (!fullname || !email || !option) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    console.log('Datos del formulario recibidos:', { fullname, email, option });

    try {
      // Configurar el transporte de nodemailer con Mailtrap
      const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT || '2525'),
        secure: false, // false para 2525
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS,
        },
        // Aumentar el tiempo de espera para la conexión
        connectionTimeout: 10000,
        // Habilitar el registro de depuración
        debug: true,
      });

      // Verificar la conexión
      await transporter.verify();
      console.log('Conexión a Mailtrap verificada');

      // Configurar el correo electrónico
      const mailOptions = {
        from: '"Brotea Newsletter" <mailtrap@demomailtrap.com>',
        to: email,
        subject: '¡Gracias por suscribirte a Brotea!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #1A1F2C; margin-bottom: 10px;">¡Bienvenido a Brotea!</h1>
              <div style="width: 100px; height: 5px; background-color: #CAFF00; margin: 0 auto;"></div>
            </div>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Hola <strong>${fullname}</strong>,
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              ¡Gracias por suscribirte a nuestro newsletter! Estamos emocionados de tenerte como parte de nuestra comunidad.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Has seleccionado: <strong>${option}</strong>
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
              Pronto recibirás noticias, eventos y oportunidades de Brotea directamente en tu correo.
            </p>
            
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

      // Enviar el correo electrónico
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);

      // Enviar una copia a Brotea (opcional)
      const adminMailOptions = {
        from: '"Brotea Newsletter" <mailtrap@demomailtrap.com>',
        to: 'hello@brotea.xyz',
        subject: 'Nueva suscripción al newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Nueva suscripción al newsletter</h2>
            <p><strong>Nombre:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Opción seleccionada:</strong> ${option}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      console.log('Correo de notificación enviado al administrador');
    } catch (emailError) {
      console.error('Error al enviar el correo electrónico:', emailError);
      // No lanzamos el error para que la API siga funcionando
      // En un entorno de producción, podrías guardar los datos en una base de datos
      // o en una cola para intentar enviar el correo más tarde
      console.log('Simulando envío de correo (modo fallback)...');
      console.log('Email que se habría enviado a:', email);
      console.log('Datos que se habrían guardado:', { fullname, email, option, date: new Date() });
    }

    // Simular un pequeño retraso para mostrar el estado de carga
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Devolver una respuesta exitosa (incluso si el correo no se envió)
    return NextResponse.json(
      { 
        success: true, 
        message: '¡Gracias por suscribirte! Pronto recibirás noticias de Brotea.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    return NextResponse.json(
      { error: 'Hubo un error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
