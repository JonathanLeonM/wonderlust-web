// → app/api/resenas/route.ts
// Trae las reseñas reales de la ficha de Google (Places API New).
// La API key vive solo en el servidor; nunca llega al navegador.

const PLACE_ID = "ChIJxfA8tGSbP44RCBsLHBzQK9w"; // Wonderlust by Villamor — Cl. 53b #24-30, Bogotá

export const revalidate = 86400; // 24 h de caché

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return Response.json({ ok: false, error: "sin_api_key" }, { status: 200 });
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es&regionCode=CO`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews.rating,reviews.text,reviews.originalText,reviews.relativePublishTimeDescription,reviews.authorAttribution",
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      return Response.json(
        { ok: false, error: "google_" + res.status },
        { status: 200 }
      );
    }

    const d = await res.json();

    const reviews = (d.reviews ?? [])
      .map((r: any) => ({
        rating: r.rating ?? 5,
        text: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        when: r.relativePublishTimeDescription ?? "",
        author: r.authorAttribution?.displayName ?? "",
        photo: r.authorAttribution?.photoUri ?? "",
        url: r.authorAttribution?.uri ?? "",
      }))
      .filter((r: any) => r.text.length > 0);

    return Response.json({
      ok: true,
      rating: d.rating ?? null,
      total: d.userRatingCount ?? 0,
      mapsUri: d.googleMapsUri ?? "",
      reviews,
    });
  } catch {
    return Response.json({ ok: false, error: "fetch_fallo" }, { status: 200 });
  }
}
