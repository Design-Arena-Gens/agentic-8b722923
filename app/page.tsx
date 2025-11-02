import Link from "next/link";
import { RucLookupForm } from "@/app/components/RucLookupForm";
import { NameLookupDemo } from "@/app/components/NameLookupDemo";

const officialSteps = [
  {
    title: "Ingresa al portal oficial de SUNAT",
    description:
      "Abre el servicio en línea y acepta el aviso de seguridad. El enlace funciona 24/7 y no requiere autenticación.",
    href: "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias",
  },
  {
    title: "Selecciona el tipo de búsqueda",
    description:
      "Puedes consultar por número de RUC, DNI, CE o por razón social/nombres. Completa el captcha para continuar.",
  },
  {
    title: "Visualiza y exporta el resultado",
    description:
      "La plataforma te mostrará razón social, estado, condición y dirección fiscal. Opcionalmente descarga el PDF generado.",
  },
];

const integrationTips = [
  "Proxy seguro: utiliza una function serverless (Edge/API Route) para encapsular la llamada a SUNAT o a un proveedor autorizado.",
  "Gestión de límites: algunas APIs externas establecen cuotas diarias. Implementa caché con revalidación cada 24 horas.",
  "Validación previa: verifica formato del RUC (11 dígitos) o longitud de la razón social antes de enviar solicitudes.",
  "Auditoría: registra la fuente del dato y fecha de actualización para cumplir con normas de compliance.",
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 sm:px-10 lg:px-12">
      <Hero />

      <section className="grid gap-12 lg:grid-cols-2">
        <RucLookupForm />
        <NameLookupDemo />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/70 p-10 shadow-lg shadow-slate-200/50 backdrop-blur">
        <header className="mb-8 space-y-3 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
            Método oficial
          </p>
          <h2 className="text-[2rem] font-semibold text-slate-900 sm:text-3xl">
            Consulta autorizada directamente en SUNAT
          </h2>
          <p className="text-base text-slate-600 sm:max-w-3xl">
            La Superintendencia Nacional de Aduanas y de Administración
            Tributaria ofrece un portal público para consultas. Sigue los pasos
            para garantizar que la información provenga de la fuente oficial.
          </p>
        </header>

        <ol className="grid gap-6 sm:grid-cols-3">
          {officialSteps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex h-full flex-col rounded-2xl border border-primary-100 bg-primary-50/50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-semibold text-white shadow-lg shadow-primary-600/30">
                {index + 1}
              </span>

              <h3 className="mt-6 text-base font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {step.description}
              </p>

              {step.href ? (
                <Link
                  href={step.href}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  Abrir portal oficial
                  <span aria-hidden className="text-base">
                    ↗
                  </span>
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section
        id="integracion"
        className="grid gap-10 rounded-3xl border border-slate-200 bg-gradient-to-br from-white/80 via-white/60 to-primary-50/60 p-10 shadow-lg backdrop-blur lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary-600">
            Integración técnica
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Cómo automatizar la consulta en tu formulario web
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            Para integrar el resultado dentro de tus flujos debes apoyarte en un
            servicio intermedio. Puedes emplear un servidor propio, una API
            autorizada o una función Edge en Vercel. El proxy evita exponer
            credenciales y simplifica la adaptación a cambios de SUNAT.
          </p>

          <ul className="space-y-3">
            {integrationTips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-3 rounded-xl bg-white/70 p-4 text-sm text-slate-700 shadow-sm"
              >
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary-500" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <IntegrationCodeSample />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="space-y-8 text-center sm:space-y-10 sm:text-left">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-700 shadow-sm">
        Consulta RUC Perú
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Obtén la razón social desde el RUC y valida contribuyentes en cuestión
          de segundos
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 sm:mx-0">
          Combina el servicio oficial de la SUNAT con un proxy seguro para
          autocompletar formularios y verificar clientes o proveedores en Perú.
          Integra la experiencia con APIs confiables y diseña flujos amigables
          para tus equipos de operaciones.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <Link
          href="#integracion"
          className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 transition hover:-translate-y-0.5 hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2"
        >
          Integrar en mi formulario
        </Link>
        <Link
          href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias"
          target="_blank"
          className="inline-flex items-center justify-center rounded-full border border-primary-200 bg-white/80 px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-800"
        >
          Ir a SUNAT ↗
        </Link>
      </div>
    </section>
  );
}

function IntegrationCodeSample() {
  const code = `import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ruc = searchParams.get("ruc");

  if (!/\\d{11}/.test(ruc ?? "")) {
    return NextResponse.json({ error: "RUC inválido" }, { status: 400 });
  }

  const response = await fetch(
    \`https://api.apis.net.pe/v1/ruc?numero=\${ruc}\`,
    { headers: { Accept: "application/json" } }
  );

  if (!response.ok) {
    throw new Error("SUNAT sin disponibilidad");
  }

  return NextResponse.json(await response.json());
}
`;

  return (
    <div className="rounded-2xl border border-slate-300 bg-slate-900/90 p-6 text-sm text-slate-100 shadow-xl shadow-slate-900/40">
      <header className="mb-4 flex items-center justify-between">
        <span className="font-medium text-slate-200">
          Ejemplo de proxy en Next.js
        </span>
        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400">
          Route Handler
        </span>
      </header>
      <pre className="overflow-auto text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <p className="mt-4 text-xs text-slate-400">
        Recuerda añadir controles de caché, manejo de errores y límites de
        consumo antes de publicar en producción.
      </p>
    </div>
  );
}
