// app/blog/[slug]/page.tsx  (Server Component)
import { notFound } from "next/navigation";
import BlogPostView from "../../../components/BlogPostView"; // root-level /components

interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "image";
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
}

interface BlogPost {
  slug: string;
  title: string;
  subheadline: string;
  heroImage: string;
  metaDescription: string;
  content: ContentBlock[];
  finalCtaText: string;
  finalCtaLink: string;
}

const blogPostsData: BlogPost[] = [
  {
    slug: "secretos-copywriting",
    title:
      "Secretos del Copywriting<br/><span class='bg-clip-text text-transparent bg-gradient-to-r from-cyber-flare to-blue-300'>para Generar</span><br/>Conversiones",
    subheadline: "",
    heroImage: "/blog-copywriting-hero.jpg",
    metaDescription:
      "Descubre los secretos clave del copywriting enfocado en conversión y aprende a crear contenido para tu página web que conecte verdaderamente con tu audiencia, genere confianza y motive a tomar acción",
    content: [
      { type: "paragraph", content: "<span class='font-bold text-cyber-flare'>Transforma tu página web</span> en una herramienta persuasiva. Contenido estratégico conecta con tu audiencia y <strong>convierte visitantes en clientes</strong>." },
      { type: "paragraph", content: "En un mercado digital saturado, el contenido es tu <strong>vendedor principal</strong>. No basta con palabras bonitas; debe generar confianza y resultados." },
      { type: "image", src: "/blog-copywriting-hero.jpg", alt: "Imagen que representa el copywriting para conversiones" },
      { type: "paragraph", content: "Muchas empresas luchan por convertir tráfico web en ventas. El secreto está en contenido que <strong>guía e impulsa</strong> a la acción." },
      { type: "paragraph", content: "Aquí te revelamos los principios clave para crear textos que funcionan. Descubre cómo lograr <strong>conversiones efectivas</strong>." },
      { type: "heading", content: "¿Qué es el Copywriting para Conversiones?" },
      { type: "paragraph", content: "Es el arte de escribir contenido diseñado para motivar acciones específicas. Esto incluye compras, suscripciones o reservas." },
      { type: "paragraph", content: "Va más allá de lo genérico, alineando mensajes con las <strong>necesidades del cliente</strong>. Ofrece soluciones claras y convincentes." },
      { type: "heading", content: "Principios Esenciales del Copywriting Efectivo" },
      { type: "image", src: "/blog-copywriting-body.jpg", alt: "Representación abstracta de la mente conectada con el cliente" },
      {
        type: "list",
        items: [
          "<span class='text-cyber-flare'><strong>1. Conoce a tu audiencia:</strong></span> Comprende sus problemas, miedos y aspiraciones. Usa su lenguaje para conectar de inmediato.",
          "<span class='text-cyber-flare'><strong>2. Enfócate en beneficios:</strong></span> No solo describas el producto; muestra cómo <strong>resuelve problemas</strong> y mejora vidas.",
          "<span class='text-cyber-flare'><strong>3. Titulares y CTAs irresistibles:</strong></span> Captura atención con titulares y crea <strong>llamadas a la acción</strong> claras con urgencia.",
          "<span class='text-cyber-flare'><strong>4. Genera confianza:</strong></span> Usa testimonios, estadísticas y políticas claras para posicionarte como una <strong>marca confiable</strong>.",
          "<span class='text-cyber-flare'><strong>5. Simplifica el mensaje:</strong></span> Comunica ideas complejas con claridad. Usa oraciones cortas y espacios para facilitar la lectura.",
          "<span class='text-cyber-flare'><strong>6. Conecta con emociones:</strong></span> Las historias despiertan emociones que guían decisiones. Refleja los triunfos de tus clientes.",
        ],
      },
      { type: "heading", content: "Cómo <strong class='text-liquid-gold'>Imperio Digital RD</strong> Potencia Tu Contenido" },
      { type: "paragraph", content: "En <strong class='text-liquid-gold'>Imperio Digital RD</strong>, el diseño web espectacular se combina con <strong>copywriting estratégico</strong>. Cada palabra impulsa resultados." },
      { type: "paragraph", content: "Nuestros textos conectan con tu audiencia y mejoran el <strong>SEO</strong>. Convertimos tu sitio en una <strong>máquina de clientes</strong>." },
      { type: "heading", content: "¿Listo para Maximizar Tu Web?" },
      { type: "paragraph", content: "El copywriting estratégico transforma visitantes en <strong>compradores reales</strong>. Colabora con nosotros para construir tu <strong>Imperio Digital</strong>." },
    ],
    finalCtaText: "Hablemos sobre tu Estrategia de Contenido",
    finalCtaLink: "/contacto",
  },
  {
    slug: "estrategia-mobile-first",
    title: "Estrategia Mobile-First<br/>para Negocios Modernos",
    subheadline: "",
    heroImage: "/blog-mobile-first-hero.jpg",
    metaDescription:
      "Diseñar tu web pensando primero en móviles ya no es opcional. Descubre por qué esta estrategia es clave para mejorar la experiencia del usuario, impulsar tu crecimiento y subir en los resultados de búsqueda.",
    content: [
      { type: "paragraph", content: "<span class='font-bold text-cyber-flare'>Diseño mobile-first</span> es crucial para el <strong>crecimiento digital</strong>. Optimiza la experiencia del usuario desde el inicio." },
      { type: "paragraph", content: "La mayoría del tráfico web proviene de <strong>dispositivos móviles</strong>. Sin un sitio optimizado, pierdes clientes diariamente." },
      { type: "image", src: "/blog-mobile-first-hero.jpg", alt: "Imagen que representa la estrategia mobile-first" },
      { type: "paragraph", content: "Mobile-first prioriza el diseño para pantallas pequeñas. Luego, se adapta a tablets y escritorios con <strong>claridad y rapidez</strong>." },
      { type: "paragraph", content: "Este enfoque no es una tendencia. Es una <strong>necesidad absoluta</strong> para negocios modernos." },
      { type: "heading", content: "¿Qué es el Diseño Mobile-First?" },
      { type: "paragraph", content: "Es un método que optimiza primero la experiencia en <strong>smartphones</strong>. Garantiza contenido claro y accesible desde el inicio." },
      { type: "paragraph", content: "Se expande a pantallas más grandes con fluidez. Esto mejora la <strong>usabilidad</strong> y el posicionamiento en Google." },
      { type: "heading", content: "¿Por Qué Necesitas Mobile-First?" },
      { type: "image", src: "/blog-mobile-first-body.jpg", alt: "Visualización del diseño web adaptable" },
      {
        type: "list",
        items: [
          "<span class='text-cyber-flare'><strong>1. Clientes en móviles:</strong></span> Tus clientes navegan y compran desde celulares. Un sitio lento los ahuyenta.",
          "<span class='text-cyber-flare'><strong>2. Prioridad de Google:</strong></span> La indexación mobile-first evalúa tu sitio móvil primero. La optimización impulsa tu <strong>ranking</strong>.",
          "<span class='text-cyber-flare'><strong>3. Más ventas:</strong></span> Una experiencia fluida genera confianza y aumenta <strong>conversiones</strong> en móviles.",
          "<span class='text-cyber-flare'><strong>4. Carga rápida:</strong></span> Mobile-first reduce tiempos de carga, disminuyendo <strong>tasas de rebote</strong>.",
          "<span class='text-cyber-flare'><strong>5. Futuro-proof:</strong></span> Prepara tu marca para dispositivos emergentes, asegurando <strong>relevancia a largo plazo</strong>.",
        ],
      },
      { type: "heading", content: "Cómo <strong class='text-liquid-gold'>Imperio Digital RD</strong> Aplica Mobile-First" },
      { type: "paragraph", content: "En <strong class='text-liquid-gold'>Imperio Digital RD</strong>, la usabilidad móvil es el núcleo de cada proyecto. Priorizamos <strong>velocidad y eficacia</strong>." },
      { type: "paragraph", content: "Usamos <strong>Next.js</strong> y <strong>Tailwind CSS</strong> para sitios intuitivos y rápidos. Se adaptan perfectamente a todos los dispositivos." },
      { type: "heading", content: "¿Listo para un Sitio Mobile-First?" },
      { type: "paragraph", content: "Tu sitio web es tu <strong>embajador digital</strong>. Sin mobile-first, pierdes frente a la competencia." },
    ],
    finalCtaText: "Crear mi experiencia Mobile-First",
    finalCtaLink: "/contacto",
  },
  {
    slug: "web-vs-social-media",
    title:
      "Social Media<br/><span class='bg-clip-text text-transparent bg-gradient-to-r from-cyber-flare to-blue-300'>VS</span><br/>Página Web",
    subheadline: "Lo Que Muchos Negocios Aún No Entienden",
    heroImage: "/blog-web-vs-social-hero.jpg",
    metaDescription:
      "Descubre cómo una página web potencia tu negocio, complementa tus redes sociales y atrae clientes en automático con sistemas inteligentes 24/7",
    content: [
      { type: "paragraph", content: "<span class='text-cyber-flare'>Eleva tu negocio</span> con un sitio web que complementa tus redes sociales. Genera clientes en <strong>piloto automático</strong>." },
      { type: "paragraph", content: "Las redes sociales conectan con tu audiencia rápidamente. Pero depender solo de ellas limita tu <strong>crecimiento</strong>." },
      { type: "image", src: "/blog-web-vs-social-hero.jpg", alt: "Imagen que representa el poder de un sitio web" },
      { type: "paragraph", content: "Una página web profesional multiplica tus resultados. Funciona <strong>24/7</strong> con herramientas automáticas." },
      { type: "heading", content: "Redes Sociales vs. Página Web" },
      { type: "paragraph", content: "Las redes sociales construyen comunidad y generan interés. Pero están sujetas a <strong>algoritmos impredecibles</strong>." },
      { type: "paragraph", content: "Una página web es tu <strong>activo digital propio</strong>. Controlas el mensaje y las conversiones sin restricciones." },
      { type: "heading", content: "Beneficios de una Página Web Profesional" },
      {
        type: "list",
        items: [
          "<strong class='text-cyber-flare'>Control Total:</strong> Define tu mensaje y estrategia sin depender de plataformas externas.",
          "<strong class='text-cyber-flare'>Automatización 24/7:</strong> Captura y convierte clientes con sistemas que trabajan sin descanso.",
          "<strong class='text-cyber-flare'>Credibilidad:</strong> Una web profesional inspira <strong>confianza</strong> y profesionalismo.",
          "<strong class='text-cyber-flare'>Datos Valiosos:</strong> Analiza el comportamiento de tus clientes para optimizar <strong>resultados</strong>.",
          "<strong class='text-cyber-flare'>Independencia:</strong> Evita riesgos de suspensiones en redes sociales con tu propio <strong>activo digital</strong>.",
          "<strong class='text-cyber-flare'>Alcance en Google:</strong> Atrae tráfico calificado con optimización para <strong>buscadores</strong>.",
        ],
      },
      { type: "heading", content: "Redes Sociales y Web: Una Combinación Poderosa" },
      { type: "image", src: "/blog-web-vs-social-body.jpg", alt: "Representación de un sistema de automatización digital" },
      { type: "paragraph", content: "<strong class='text-liquid-gold'>Redes y web</strong> se complementan para maximizar resultados. Juntas crean un <strong>ecosistema digital</strong>." },
      { type: "list", items: ["Redes sociales: Captan atención y generan interacción.", "Página web: Convierte visitantes en <strong>clientes reales</strong> con automatización."] },
      { type: "heading", content: "<strong class='text-liquid-gold'>Imperio Digital RD</strong>: Tu Socio Estratégico" },
      { type: "paragraph", content: "En <strong class='text-liquid-gold'>Imperio Digital RD</strong>, creamos sistemas que trabajan para ti. No solo diseñamos sitios; generamos <strong>crecimiento</strong>." },
      { type: "list", items: ["Captura automática de <strong>leads</strong>.", "Secuencias de email que <strong>convierten</strong>.", "Sistemas <strong>24/7</strong> para tu negocio.", "Soluciones que potencian tu presencia digital."] },
      { type: "heading", content: "¿Listo para un Negocio Automatizado?" },
      { type: "paragraph", content: "Un sitio web es tu <strong>vendedor digital</strong> incansable. Es una necesidad para competir y crecer hoy." },
    ],
    finalCtaText: "Impulsa tu Estrategia Digital Ahora",
    finalCtaLink: "/contacto",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostView post={post} />;
}
