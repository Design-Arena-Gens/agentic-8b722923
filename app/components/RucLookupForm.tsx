'use client';

import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import type { SunatRecord } from "@/lib/sunat-data";

const rucSchema = z
  .string()
  .regex(/^\d{11}$/, "Ingresa un RUC válido de 11 dígitos.");

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; record: SunatRecord };

export function RucLookupForm() {
  const [inputValue, setInputValue] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({ status: "idle" });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const parsed = rucSchema.safeParse(inputValue.trim());
      if (!parsed.success) {
        setSearchState({
          status: "error",
          message: parsed.error.issues[0]?.message ?? "RUC inválido.",
        });
        return;
      }

      setSearchState({ status: "loading" });
      try {
        const response = await fetch(
          `/api/sunat?type=ruc&value=${parsed.data}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(
            body?.message ||
              body?.errors?.join(", ") ||
              "No se pudo obtener la información."
          );
        }

        const body = (await response.json()) as { record: SunatRecord };
        setSearchState({ status: "success", record: body.record });
      } catch (error) {
        console.error(error);
        setSearchState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "No se pudo conectar con el servicio.",
        });
      }
    },
    [inputValue]
  );

  const helperText = useMemo(() => {
    if (searchState.status === "error") {
      return searchState.message;
    }
    if (!inputValue) {
      return "Ingresa los 11 dígitos sin guiones ni espacios.";
    }
    return "";
  }, [searchState, inputValue]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Consulta rápida por RUC
          </h2>
          <p className="text-sm text-slate-600">
            Usa el servicio oficial de SUNAT mediante el proxy de APIs.net.pe o
            consulta el demo sin conexión.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="ruc-input"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Número de RUC
            </label>
            <input
              id="ruc-input"
              name="ruc"
              inputMode="numeric"
              autoComplete="off"
              value={inputValue}
              onChange={(event) => {
                const onlyDigits = event.currentTarget.value.replace(/\D+/g, "");
                setInputValue(onlyDigits);
                if (searchState.status !== "idle") {
                  setSearchState({ status: "idle" });
                }
              }}
              placeholder="20131312955"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
            {helperText ? (
              <p className="mt-2 text-sm text-primary-600">{helperText}</p>
            ) : null}
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={searchState.status === "loading"}
          >
            {searchState.status === "loading"
              ? "Consultando..."
              : "Consultar en SUNAT"}
          </button>
        </form>

        {searchState.status === "success" ? (
          <ResultPanel record={searchState.record} />
        ) : null}

        {searchState.status === "error" ? (
          <div className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-700">
            {searchState.message}
          </div>
        ) : null}
      </div>
    </div>
  );
}

type ResultPanelProps = {
  record: SunatRecord;
};

function ResultPanel({ record }: ResultPanelProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Razón social
          </p>
          <h3 className="mt-1 text-base font-semibold text-slate-900">
            {record.razonSocial}
          </h3>
        </div>
        <span className="rounded-lg bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
          {record.estado}
        </span>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Número de RUC
          </dt>
          <dd className="mt-1 font-mono text-sm text-slate-900">{record.ruc}</dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Condición
          </dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">
            {record.condicion}
          </dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="text-xs font-medium uppercase text-slate-500">
            Dirección fiscal
          </dt>
          <dd className="mt-1 text-sm text-slate-900">{record.direccion}</dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Departamento
          </dt>
          <dd className="mt-1 text-sm text-slate-900">
            {record.departamento ?? "—"}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Provincia
          </dt>
          <dd className="mt-1 text-sm text-slate-900">
            {record.provincia ?? "—"}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Distrito
          </dt>
          <dd className="mt-1 text-sm text-slate-900">
            {record.distrito ?? "—"}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Fuente de datos
          </dt>
          <dd className="mt-1 text-sm text-slate-900">
            {record.source === "apis.net.pe"
              ? "Servicio oficial SUNAT vía APIs.net.pe"
              : "Datos de demostración"}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium uppercase text-slate-500">
            Última actualización
          </dt>
          <dd className="mt-1 text-sm text-slate-900">
            {new Intl.DateTimeFormat("es-PE", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(record.refreshedAt))}
          </dd>
        </div>
      </dl>
    </div>
  );
}
