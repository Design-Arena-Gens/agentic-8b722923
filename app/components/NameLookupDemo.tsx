'use client';

import { useMemo, useState } from "react";
import type { SunatRecord } from "@/lib/sunat-data";
import { lookupDemoByName } from "@/lib/sunat-data";

export function NameLookupDemo() {
  const [query, setQuery] = useState("");

  const results = useMemo<SunatRecord[]>(() => {
    if (!query.trim()) {
      return [];
    }
    return lookupDemoByName(query);
  }, [query]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-lg shadow-slate-200/40 backdrop-blur">
      <header className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">
          Búsqueda demo por razón social
        </h2>
        <p className="text-sm text-slate-600">
          Esta búsqueda local te permite prototipar la experiencia. Para
          resultados oficiales debes integrar un servicio autorizado (ver guía
          inferior).
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="name-query"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Razón social o nombre
          </label>
          <input
            id="name-query"
            type="text"
            placeholder="Ej. Superintendencia Nacional"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
          <p className="mt-2 text-xs text-slate-500">
            Resultados mostrados desde un set representativo de datos SUNAT.
          </p>
        </div>

        <div className="space-y-3">
          {results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-100/60 p-6 text-sm text-slate-600">
              Ingresa al menos una palabra clave para filtrar el catálogo de
              ejemplo.
            </div>
          ) : (
            results.map((record) => (
              <article
                key={record.ruc}
                className="rounded-xl border border-primary-100 bg-primary-50/50 p-5 shadow-sm"
              >
                <header className="mb-3 flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                    {record.razonSocial}
                  </span>
                  <span className="font-mono text-sm text-slate-900">
                    RUC: {record.ruc}
                  </span>
                </header>

                <dl className="grid gap-x-4 gap-y-2 text-xs text-slate-600 sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-slate-500">Estado</dt>
                    <dd className="text-slate-800">{record.estado}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-500">Condición</dt>
                    <dd className="text-slate-800">{record.condicion}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="font-semibold text-slate-500">Dirección</dt>
                    <dd className="text-slate-800">{record.direccion}</dd>
                  </div>
                </dl>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
