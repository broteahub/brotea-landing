"use client";
import { useState } from "react";

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

  const fs = require("fs");
  const path = require("path");
  const mjml2html = require("mjml");
  const nodemailer = require("nodemailer");

  const mailPath = path.join(process.cwd(), "app", "emails", "mail.mjml");
  const mjmlTemplate = fs.readFileSync(mailPath, "utf8");
  const replaced = mjmlTemplate
    .replace("{{NAME}}", name)
    .replace("{{EMAIL}}", email)
    .replace("{{OPTION}}", option);

  const { html } = mjml2html(replaced);
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Brotea" <no-reply@brotea.org>',
    to: email,
    subject: "Bienvenido a Brotea",
    html,
  });
}
