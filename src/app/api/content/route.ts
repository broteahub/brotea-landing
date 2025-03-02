import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // Datos estáticos para la exportación estática
    const data = {
      header: {
        title: "Conexiones que brotan, ideas que transforman.",
        subtitle: "Donde talento y oportunidades se encuentran para crear un futuro más inclusivo.",
        cta: { text: "Únete a Brotea", link: "https://t.me/broteaofficial" }
      },
      about: {
        title: "¿Qué es Brotea?",
        description: "Brotea nace para conectar talento y oportunidades, impulsando el desarrollo de estudiantes y emprendedores a través de la colaboración y la tecnología."
      },
      recruitment: {
        title: "Únete a Brotea",
        description: "Si eres estudiante, experto en tecnología o tienes herramientas que pueden aportar a la comunidad, queremos conocerte."
      }
    };
    
    // Devolver los datos
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al cargar el contenido:', error);
    return NextResponse.json(
      { 
        error: 'Error al cargar el contenido',
        message: error instanceof Error ? error.message : 'Error desconocido'
      }, 
      { status: 500 }
    );
  }
}
