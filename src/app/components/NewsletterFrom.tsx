"use client";
import { useState } from "react";
import nodemailer from "nodemailer";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [option, setOption] = useState("");

  return (
    <form action={sendNewsletter}>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={5}
        placeholder="Nombre y Apellidos"
      />
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
        placeholder="Tu email"
      />
      <select name="option" value={option} onChange={(e) => setOption(e.target.value)} required>
        <option value="">Selecciona...</option>
        <option value="quiero aprender con brotea">quiero aprender con brotea</option>
        <option value="quiero aportar como mentor en brotea">quiero aportar como mentor en brotea</option>
        <option value="quiero donar herramientas a brotea">quiero donar herramientas a brotea</option>
      </select>
      <button type="submit">ENVIAR</button>
    </form>
  );
}

async function sendNewsletter(formData: FormData) {
  "use server";
  const name = (formData.get("name") as string) || "";
  const email = (formData.get("email") as string) || "";
  const option = (formData.get("option") as string) || "";
  if (name.length < 5) throw new Error("Nombre muy corto");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email no válido");

  // Generar HTML directamente en lugar de usar MJML
  const html = `
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
              <h1 style="color: #CAFF00; margin: 0;">Welcome to Brotea!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #1A1F2C; margin-top: 0;">Hello ${name},</h2>
              <p>Thank you for joining the Brotea community! We're excited to have you with us.</p>
              <p>You selected: <strong>${option}</strong></p>
              <p>You'll soon receive news, events, and opportunities from Brotea directly in your inbox.</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="https://brotea.xyz" style="display: inline-block; background-color: #CAFF00; color: #1A1F2C; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Brotea</a>
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
  `;
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST || 'bulk.smtp.mailtrap.io',
    port: parseInt(process.env.MAILTRAP_PORT || '587'),
    secure: false, // false para 587
    auth: {
      user: process.env.MAILTRAP_USER || 'apismtp@mailtrap.io',
      pass: process.env.MAILTRAP_PASS || 'df9e558b69d3b5641225885b81c61925',
    },
    connectionTimeout: 10000
  });

  try {
    await transporter.sendMail({
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
      text: `Hello ${name},\n\nThank you for joining the Brotea community! We've received your request for: ${option}.\n\nWe'll keep you updated with relevant information.\n\nBest regards,\nThe Brotea Team\n\nhttps://brotea.xyz`,
      html,
    });
    console.log("Email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    // We don't throw the error to avoid showing it to the user
    // Instead, we log it and continue
  }
}
