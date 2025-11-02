import { NextResponse } from "next/server";
import { z } from "zod";
import { lookupByName, lookupByRuc } from "@/lib/sunat";

const querySchema = z.object({
  type: z.enum(["ruc", "name"]).default("ruc"),
  value: z
    .string()
    .min(1, "Ingrese un valor de búsqueda.")
    .max(120, "El valor ingresado es demasiado largo.")
    .trim(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parseResult = querySchema.safeParse({
    type: (searchParams.get("type") ?? undefined) as "ruc" | "name" | undefined,
    value: searchParams.get("value") ?? "",
  });

  if (!parseResult.success) {
    return NextResponse.json(
      {
        errors: parseResult.error.flatten().fieldErrors.value ?? [
          "Parámetros inválidos.",
        ],
      },
      { status: 400 }
    );
  }

  const { type, value } = parseResult.data;

  if (type === "ruc") {
    const record = await lookupByRuc(value);
    if (!record) {
      return NextResponse.json(
        {
          message:
            "No se encontró el RUC proporcionado. Verifique el número o intente nuevamente desde la plataforma oficial de SUNAT.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ record });
  }

  const matches = lookupByName(value);

  return NextResponse.json({
    records: matches,
    total: matches.length,
    disclaimer:
      "La búsqueda por razón social en modo demo recorre un conjunto de registros de muestra. Para resultados oficiales use la consulta directa de SUNAT.",
  });
}
