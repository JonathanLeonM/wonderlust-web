/**
 * Wonderlust · proxy del Apps Script
 * Ruta: app/api/sheet/route.ts
 *
 * El navegador NO llama a Google directamente (CORS/CSP lo bloquean):
 * llama a /api/sheet y este handler, desde el servidor, consulta el Sheet.
 *
 * Uso: /api/sheet?accion=consultar&cedula=6107961
 *      /api/sheet?accion=grupo&codigo=GR-4821
 *      /api/sheet?accion=registrar&datos=<json>
 */

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzCEuN5GkJaK4dS9nL0gLRyE_D8ZsfxF3vjDHpFsxronAOOmfr6K7ZrAcx_lAcdq0MrCA/exec";

export const dynamic = "force-dynamic";   // nunca cachear una consulta

export async function GET(request: Request) {
  const entrada = new URL(request.url).searchParams;
  const url = new URL(ENDPOINT);
  entrada.forEach((v, k) => { if (k !== "callback") url.searchParams.set(k, v); });

  try {
    const r = await fetch(url.toString(), { redirect: "follow", cache: "no-store" });
    const texto = await r.text();
    try {
      return Response.json(JSON.parse(texto));
    } catch {
      /* El script devuelve texto plano cuando no se pide ninguna acción. */
      return Response.json({ ok: false, error: "respuesta-no-json", texto: texto.slice(0, 300) });
    }
  } catch (e) {
    return Response.json({ ok: false, error: "sin-conexion", detalle: String(e) }, { status: 502 });
  }
}
