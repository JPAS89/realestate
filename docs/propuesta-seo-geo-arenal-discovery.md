# Propuesta de trabajo SEO / GEO — Arenal Discovery

**Sitio:** [https://arenaldiscovery.com](https://arenaldiscovery.com)  
**Fecha de auditoría:** 7 septiembre 2026  
**Documento:** inventario de carencias + To-Dos + opciones de alcance para presupuesto  
**Tarifa de referencia:** USD **$50 / hora** (ajustable; los totales se recalcan al cambiar la tarifa)  
**Moneda:** USD  

Los paquetes **no son vinculantes entre sí**. Se pueden contratar sueltos, por fases, o como uno de los tres escenarios al final. Donde hay opciones A / B / C, se elige **una** por paquete (no se suman).

---

## 1. Resumen ejecutivo

Arenal Discovery ya está en producción sobre un **SPA (Vite + React)**. Google y los motores de IA ven casi solo el HTML de la home: un cascarón vacío más dos líneas de `noscript`. Las páginas de tours no tienen título, descripción ni datos estructurados propios.

Además, el sitio anterior (WordPress / `/trip/...` y `/activities/...`) **sigue indexado**. Esas URLs ahora muestran un 404 visual **sin redirección 301**, así que se está perdiendo autoridad y tráfico que el dominio ya había ganado.

Hay arreglos rápidos (sitemap, robots, redirects) y un bloque de fundación (HTML crawlable + slugs + JSON-LD) que es el que realmente cambia rankings y citas en IA.

| Señal en vivo | Qué implica |
|---|---|
| El snippet de Google de la home es el texto de `noscript`, no el Hero | Google no está indexando el contenido React |
| `/tours/walking` y `/tours/adventure/1` sirven el mismo title/canonical/JSON-LD que `/` | No hay SEO por página |
| `https://arenaldiscovery.com/sitemap.xml` responde **500** | El mapa del sitio no existe para Google |
| `robots.txt` declara `Sitemap: https://your-domain.com/sitemap.xml` | El crawler no encuentra el sitemap real |
| `/trip/catarata-la-fortuna/` y similares caen en 404 sin 301 | Equity de URLs viejas se está quemando |

---

## 2. Lo que ya existe (no se cotiza como “desde cero”)

- Title, description, Open Graph y Twitter **en la home**
- Un JSON-LD `TravelAgency` (teléfono, La Fortuna, coordenadas, horarios, Facebook/Instagram)
- `robots.txt` que permite Googlebot, Bingbot y crawlers de IA (GPTBot, ClaudeBot, Google-Extended)
- Sitemap estático **en el repositorio** (5 URLs de categoría); **roto en producción**
- Página estática `info.html` (contenido útil; canonical incorrecto hacia la home)
- ~26 tours y 22 rutas de transfer en JSON
- FAQ en 6 idiomas (solo como ancla `#faq` en la home)
- HTTPS; responden `arenaldiscovery.com` y `www.arenaldiscovery.com`

---

## 3. Cómo leer horas y precio

| Esfuerzo | Horas típicas | Precio a $50/h |
|---|---|---|
| S | 3–8 h | $150–$400 |
| M | 8–24 h | $400–$1,200 |
| L | 24–60 h | $1,200–$3,000 |
| XL | 60+ h | $3,000+ |

Los rangos cubren incertidumbre (acceso a Search Console, cantidad de URLs viejas, textos del cliente). El **punto medio** es la cifra a usar en una cotización inicial.

**Fórmula:** `precio = horas × tarifa`. Si se usa otra tarifa, solo cambia el multiplicador.

---

## 4. Paquetes à la carte

### P0 — Crítico (indexación y tráfico heredado)

#### Paquete 1 — SEO de JavaScript / HTML crawlable

**Problema.** SPA pura. Sin JavaScript, el crawler solo ve `#root` y dos líneas de texto. Meta y schema no cambian por ruta. El 404 de la app no es un HTTP 404 real.

**To-Dos**

- Servir HTML con contenido real (título, descripción, H1, cuerpo) en cada URL indexable
- Title, description y canonical distintos por ruta
- 404 con código HTTP 404 (no 200)
- Verificar con “Ver código fuente” / Rich Results / URL Inspection, no solo con el navegador

**Opciones (elegir una)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **1A** Pre-render / SSG sobre Vite actual | Generar HTML estático de home, categorías, tours y transport en el build o en el host (Lovable / plugin de prerender) | 16–24 h (**20**) | **$1,000** |
| **1B** Migración a Astro o Next.js (SSR/SSG) | Replataforma. Base más sólida a 2–3 años; incluye re-cablear rutas, booking/EmailJS y QA | 44–60 h (**52**) | **$2,600** |
| **1C** HTML estático espejo (estilo `info.html`) | Una página HTML por tour/categoría, barata y parcial; no resuelve la app | 12–20 h (**16**) | **$800** |

**Recomendación comercial:** 1A si se quiere impacto en 6–8 semanas sin replataforma. 1B si el cliente planea blog, i18n serio o CMS. 1C solo como parche temporal.

---

#### Paquete 2 — Rescate de URLs antiguas (renombramiento)

**Problema.** El sitio anterior usaba `/trip/{slug}/` y `/activities/{slug}/`. El actual usa `/tours/{category}/{id}` numérico. Google sigue mostrando las URLs viejas; ahora 404.

**To-Dos**

- Inventario de URLs indexadas (Search Console + `site:`)
- Mapa 301: URL vieja → URL canónica nueva
- Implementar 301 en el hosting
- Asegurar que el 404 real no sea HTTP 200

**Opciones (elegir una)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **2A** Tabla de redirects 301 | Mapear lo indexado y redirigir a la URL actual más cercana (aunque siga siendo `/tours/walking/3`) | 4–8 h (**6**) | **$300** |
| **2B** Slugs SEO + 301 desde IDs y desde `/trip/` | Nuevas URLs tipo `/tours/walking/la-fortuna-waterfall` + 301 desde IDs actuales y desde WordPress | 12–20 h (**16**) | **$800** |
| **2C** Restaurar slugs cercanos a WordPress | Reusar slugs tipo `/trip/catarata-la-fortuna/` (o equivalente) para heredar más autoridad | 10–16 h (**14**) | **$700** |

**Nota comercial:** sin este paquete se pierde el equity de páginas que Google ya rankeaba. 2A es el mínimo; 2B es el que conviene si también se hace el paquete 5.

**Dependencia del cliente:** export de Search Console (ver sección 7).

---

#### Paquete 3 — Sitemap y robots.txt

**Problema.** Sitemap 500 en producción. Robots con dominio placeholder. Faltan ~26 tours. Incluye `#contact`. Directiva inválida `Set-distance: 10`.

**To-Dos**

- `sitemap.xml` 200 con home, 3 categorías, cada tour activo, `/transport`
- Quitar URLs con hash
- `Sitemap: https://arenaldiscovery.com/sitemap.xml`
- Limpiar directivas inválidas y `Disallow` de rutas inexistentes
- Enviar sitemap en Search Console

**Opciones**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **3A** Sitemap estático generado en el build | Suficiente con el JSON actual | 2–4 h (**3**) | **$150** |
| **3B** Sitemap dinámico | Solo tiene sentido si más adelante hay CMS | 6–10 h (**8**) | **$400** |

---

### P1 — Alto impacto on-page

#### Paquete 4 — Metadata por página

**Problema.** Todas las rutas heredan meta de la home. OG image es un favicon 192×192. Faltan `og:locale`, `og:site_name`, `twitter:description`.

**To-Dos**

- Title / description / canonical únicos: home, 3 categorías, ~26 tours, transport
- 404 con `noindex`
- Imagen Open Graph 1200×630
- Completar tags OG/Twitter
- Helmet (SPA) o `metadata` nativo si hay SSR

| Alcance | Horas | Precio ($50/h) |
|---|---|---|
| Home + 3 categorías + transport (parcial) | 6–10 h (**8**) | **$400** |
| **4 completo** (incluye cada tour) | 10–16 h (**14**) | **$700** |

Rinde mucho más si se contrata junto al paquete 1 (si no hay HTML crawlable, Google puede seguir viendo la meta de la home).

---

#### Paquete 5 — URLs y arquitectura de información

**Problema.** IDs numéricos; typo `acuatic`; no hay hub `/tours`; About / FAQ / Contact / Legal no son páginas; “Popular Tours” del footer no enlaza; hashes `#tours` rotos fuera de la home.

**To-Dos**

- Slugs legibles; 301 de IDs y de `acuatic` → `aquatic` (o al revés, una sola canónica)
- Hub `/tours`
- Páginas About, FAQ, Contact, Privacy, Terms
- Breadcrumbs en UI
- Enlaces internos reales (footer, relacionados, categorías)

**Opciones (elegir una; 5A se solapa con 2B — no sumar las dos enteras)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **5A** Solo slugs + redirects | Mínimo de arquitectura | 6–10 h (**8**) | **$400** |
| **5B** 5A + hubs y páginas legales/FAQ | Sitio “completo” para indexar | 16–24 h (**20**) | **$1,000** |
| **5C** 5B + páginas destino | Volcán Arenal, Catarata, Río Celeste, SJO, LIR (alimento GEO) | 32–48 h (**40**) | **$2,000** |

---

#### Paquete 6 — JSON-LD / datos estructurados

**Problema.** Solo `TravelAgency` global, copiado en todas las URLs. FAQ, tours y precios no tienen schema. `sameAs` lleva parámetros de tracking.

Los tipos se pueden cotizar sueltos:

| Ítem | To-Do | Horas | Precio ($50/h) |
|---|---|---|---|
| 6.1 Organization + WebSite | `@id` estable, logo, `sameAs` limpio | 2 | $100 |
| 6.2 LocalBusiness / TravelAgency | NAP, `areaServed`, geo, horarios | 3 | $150 |
| 6.3 TouristTrip o Product+Offer | Precio, duración, idioma, por tour | 8–12 (**10**) | **$500** |
| 6.4 FAQPage | Las 8 preguntas ya existen | 3 | $150 |
| 6.5 BreadcrumbList | Home → categoría → tour | 2 | $100 |
| 6.6 ItemList | Listados de categoría | 2 | $100 |
| 6.7 Review / AggregateRating | **Solo con reseñas reales** | 4 | $200 |
| **6 completo (sin 6.7)** | Todos los anteriores menos reviews | **22** | **$1,100** |

Validación: [Rich Results Test](https://search.google.com/test/rich-results) y [Schema.org Validator](https://validator.schema.org/).

---

### P2 — GEO / AEO y SEO local

#### Paquete 7 — Contenido extraíble por IA (GEO / AEO)

**Problema.** No hay `llms.txt`. El FAQ no es una URL. Tours en inglés en JSON. Sin fechas de actualización, autores ni citas. No hay guías tipo “how to get from SJO to La Fortuna”.

**To-Dos**

- `llms.txt` (marca, servicios, URLs clave, contacto)
- FAQ en URL propia, con respuestas directas y H2 tipo pregunta
- Páginas how-to / destinos con “last updated”
- Estructura lista/tabla donde aplique

**Opciones (elegir una)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **7A** `llms.txt` + FAQPage sobre contenido actual | Técnico, sin redacción larga | 4–6 h (**5**) | **$250** |
| **7B** 7A + 5–10 páginas pilar | Destinos, how-to, comparativas (incluye redacción base) | 20–36 h (**28**) | **$1,400** |
| **7C** Calendario editorial mensual | Setup + 2–3 piezas/mes | Setup 8–12 h + **8–12 h/mes** | Setup **$500** + **$400–$600/mes** |

Redacción del cliente o de un copywriter reduce las horas de 7B/7C.

---

#### Paquete 8 — SEO local / Maps (GEO geográfico)

**Problema.** Schema local básico existe. Dirección “Main Street, La Fortuna” es genérica. No hay evidencia de Google Business Profile ni landings por ruta de transfer.

**To-Dos (parte off-site, parte web)**

- Auditoría / optimización de ficha Google Business Profile (GBP)
- NAP idéntico en web, GBP y redes
- Schema `LocalBusiness` con `areaServed`
- Limpiar UTM en `sameAs`
- Opcional: landing “private transfer La Fortuna → X” por rutas de `transfers.json` (22)

**Opciones (elegir una)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **8A** Ficha GBP + NAP + schema | Requiere acceso del cliente a GBP | 4–6 h (**5**) | **$250** |
| **8B** 8A + landings de rutas | Hasta 22 páginas de transfer | 20–32 h (**24**) | **$1,200** |

El cliente debe confirmar y dar acceso a la ficha de Google Business.

---

#### Paquete 9 — Internacional (i18n SEO)

**Problema.** 6 idiomas en React (`en/es/fr/it/de/pt`) sin cambiar URL ni `<html lang>`. Tours JSON solo en inglés. Sin hreflang. El switcher no persiste.

**Opciones (elegir una)**

| Opción | Alcance | Horas | Precio ($50/h) |
|---|---|---|---|
| **9A** `lang` + meta del idioma activo | Sin URLs por idioma | 3–5 h (**4**) | **$200** |
| **9B** ES + EN con rutas y hreflang | Traducir fichas de tour; `x-default` | 24–40 h (**32**) | **$1,600** |
| **9C** 6 idiomas indexables | Completo | 60–90 h (**72**) | **$3,600** |

**Recomendación:** no cotizar 9C en fase 1. 9B solo después de paquetes 1 + 5.

---

### P3 — Confianza, medición y rendimiento

#### Paquete 10 — EEAT, analítica y confianza

**Problema.** Políticas solo en un diálogo. Sin Privacy/Terms indexables. Testimonios vacíos. Sin bios. Sin GA4 / GTM / verificación de Search Console en código.

**To-Dos**

- Páginas Privacy y Terms
- Testimonios reales o embed Google / TripAdvisor
- Bios de guías / operadores (si el cliente las aporta)
- GA4 + verificación Search Console
- Monitoreo de cobertura, 404 y (cuando exista) AI Overviews

| Alcance | Horas | Precio ($50/h) |
|---|---|---|
| **10** Legal + GA4 + GSC + testimonios (contenido del cliente) | 8–14 h (**12**) | **$600** |

---

#### Paquete 11 — Imágenes, iconos y Core Web Vitals

**Problema.** Iconos referenciados ausentes en `public/` del repo. Videos autoplay (hero + categorías) pesados para LCP. Sin lazy-load consistente. Alts genéricos. Fuentes duplicadas.

**To-Dos**

- Favicons reales + OG 1200×630
- Poster en videos; no autoplay pesado en móvil si se puede evitar
- WebP/AVIF, width/height, lazy below-fold
- Alinear familias tipográficas

| Alcance | Horas | Precio ($50/h) |
|---|---|---|
| **11** Media + CWV | 12–20 h (**16**) | **$800** |

---

#### Paquete 12 — Markup semántico menor

**To-Dos**

- `h1` en páginas de categoría (hoy `h2`)
- Un solo `<main>` (hoy anidado)
- No duplicar Navigation en layout + detalle de tour

| Alcance | Horas | Precio ($50/h) |
|---|---|---|
| **12** Semántica | 3–5 h (**4**) | **$200** |

---

## 5. Matriz de presupuesto (punto medio)

Tarifa **$50/h**. “Independiente” = se puede vender sin los demás; “mejor con” = rinde más combinado.

| # | Paquete (opción recomendada) | Impacto | Horas | Precio | Independiente |
|---|---|---|---|---|---|
| 1A | HTML crawlable (pre-render) | Crítico | 20 | $1,000 | Base recomendada |
| 2B | Redirects + slugs SEO | Crítico | 16 | $800 | Sí |
| 3A | Sitemap + robots | Crítico | 3 | $150 | Sí |
| 4 | Meta por página (completo) | Alto | 14 | $700 | Mejor con 1 |
| 5B | Hubs + legales + FAQ | Alto | 20 | $1,000 | Sí (con 301) |
| 6 | JSON-LD completo (sin reviews) | Alto | 22 | $1,100 | Sí |
| 7A | `llms.txt` + FAQ schema | Alto | 5 | $250 | Sí |
| 8A | GBP + NAP | Alto | 5 | $250 | Sí (off-site) |
| 9A | `lang` + meta | Medio | 4 | $200 | Mejor después de 1+5 |
| 10 | EEAT + analytics | Medio | 12 | $600 | Sí |
| 11 | CWV / media | Medio | 16 | $800 | Sí |
| 12 | Semántica HTML | Bajo | 4 | $200 | Sí |
| | **Suma si se tomara todo lo recomendado (sin 1B/5C/7B/8B/9B)** | | **141** | **$7,050** | No es un escenario; ver §6 |

Opciones más caras (no incluidas en la suma de arriba): 1B $2,600 · 5C $2,000 · 7B $1,400 · 8B $1,200 · 9B $1,600 · 9C $3,600 · 7C retainer.

---

## 6. Tres escenarios para presentar al cliente

No excluyen ítems sueltos. Los totales **ya evitan doble conteo** (p. ej. slugs no se cobran dos veces).

### Escenario A — Quick wins

**Objetivo:** dejar de sangrar (sitemap, robots, 404 masivos, GSC) en 2–4 semanas. El SPA **sigue limitando** el ranking de tours.

| Incluye | Horas | Precio |
|---|---|---|
| 2A Redirects 301 a URLs actuales | 6 | $300 |
| 3A Sitemap + robots | 3 | $150 |
| 6.1 + 6.2 + 6.4 Schema home/FAQ/local | 8 | $400 |
| 4 parcial (home + categorías + transport) | 8 | $400 |
| 7A `llms.txt` | 5 | $250 |
| 10 parcial (GSC + GA4) | 4 | $200 |
| **Total A** | **34 h** | **$1,700** |

Rango: 28–40 h · $1,400–$2,000 · calendario 2–4 semanas.

---

### Escenario B — Fundación indexable (recomendado)

**Objetivo:** que Google e IA puedan leer tours, FAQ y categorías. Este es el paquete que cambia rankings.

**B1 — Pre-render (Vite)**

| Incluye | Horas | Precio |
|---|---|---|
| Escenario A | 34 | $1,700 |
| 1A Pre-render | 20 | $1,000 |
| Upgrade 2A→2B (slugs + 301 IDs y `/trip/`) | +10 | $500 |
| Completar 4 (tours) | +6 | $300 |
| 5B extra (hubs, FAQ, legales; slugs ya en 2B) | 12 | $600 |
| 6 resto (tours, breadcrumbs, ItemList) | 14 | $700 |
| 12 Semántica | 4 | $200 |
| **Total B1** | **100 h** | **$5,000** |

Rango: 84–116 h · $4,200–$5,800 · 6–8 semanas.

**B2 — Migración Next.js / Astro (en lugar de 1A)**

| Incluye | Horas | Precio |
|---|---|---|
| Igual que B1 pero 1B en vez de 1A | 100 − 20 + 52 | |
| **Total B2** | **132 h** | **$6,600** |

Rango: 110–150 h · $5,500–$7,500 · 8–10 semanas.

---

### Escenario C — Crecimiento GEO (recurrente o segunda fase)

**Objetivo:** ser la fuente que citan AI Overviews, ChatGPT y Perplexity, y ganar pack local / rutas de transfer.

Se cotiza **después** de B, o como retainer.

| Incluye (típico) | Horas | Precio |
|---|---|---|
| 5C extra páginas destino (sobre 5B) | 20 | $1,000 |
| 7B páginas pilar | 28 | $1,400 |
| 8B landings de transfer | 24 | $1,200 |
| 9B ES+EN hreflang | 32 | $1,600 |
| 11 CWV | 16 | $800 |
| 10 resto EEAT / reseñas | 8 | $400 |
| **Total C (proyecto)** | **128 h** | **$6,400** |

**Alternativa retainer:** 8–12 h/mes (contenido + GBP + Search Console) = **$400–$600/mes**, mínimo 3 meses. 7C editorial se puede sumar aparte.

---

### Comparación rápida de escenarios

| Escenario | Horas (punto medio) | Precio @ $50/h | Plazo | Qué compra el cliente |
|---|---|---|---|---|
| A Quick wins | 34 | **$1,700** | 2–4 sem | Deja de sangrar; Google aún ve poco de los tours |
| B1 Fundación Vite | 100 | **$5,000** | 6–8 sem | Tours indexables, slugs, schema, legales |
| B2 Fundación Next/Astro | 132 | **$6,600** | 8–10 sem | Igual que B1 + base SSR a largo plazo |
| C Crecimiento | 128 | **$6,400** | 2ª fase | Destinos, IA, local, i18n, CWV |
| B1 + C | 228 | **$11,400** | 4–6 meses | Programa completo recomendado a 12 meses |
| Retainer post-B | 8–12 / mes | **$400–$600/mes** | continuo | Contenido + medición |

---

## 7. Solicitud al cliente (bloquea alcance y precio fino)

Enviar este bloque tal cual. Sin Search Console no se puede cerrar el mapa de 301 del paquete 2.

### Accesos

- [ ] Usuario (o export CSV) de **Google Search Console** del dominio `arenaldiscovery.com` y `www`
- [ ] Confirmación de si existe **Google Analytics 4** (y acceso)
- [ ] Confirmación y acceso a **Google Business Profile** (ficha de Maps), o “no tenemos ficha”
- [ ] Acceso al DNS / hosting Lovable (para 301 y sitemap) si el trabajo lo hace un tercero

### Exports de Search Console (prioridad)

Pedir, últimos 3 o 16 meses:

1. **Páginas** (Rendimiento → Páginas): URL, clics, impresiones, CTR, posición
2. **Cobertura / páginas** (Indexación): indexadas vs. detectadas vs. excluidas
3. Filtro o lista de URLs que contienen `/trip/` y `/activities/`
4. Consultas (queries) top 50
5. Si aparece, datos de **AI Overviews** / modo IA

### Confirmaciones de negocio

- [ ] NAP exacto: razón social, calle, distrito, teléfono, WhatsApp, email público
- [ ] ¿La dirección “Main Street, La Fortuna, 21007” es correcta o hay que sustituirla?
- [ ] Idiomas a **indexar** (recomendado fase 1: inglés + español; los otros 4 pueden seguir solo en UI)
- [ ] Textos de Privacy y Terms, o autorización para redactar un borrador
- [ ] Reseñas publicables (Google, TripAdvisor, Facebook) y permiso de uso
- [ ] Foto / arte para Open Graph (1200×630) o autorización para recortar una existente
- [ ] Lista mental de “este tour viejo = este tour nuevo” si la recuerdan; si no, se arma con GSC + JSON actual

### Mapeo de URLs ya vistas en el índice público

Estas aparecen o aparecían en Google y hoy 404. Completar destino canónico:

| URL antigua | ¿Sigue siendo un producto? | URL nueva propuesta (a confirmar) |
|---|---|---|
| `/trip/catarata-la-fortuna/` | | `/tours/walking/la-fortuna-waterfall` (hoy `/tours/walking/3`) |
| `/trip/sky-trek-best-canopy-tour/` | | `/tours/adventure/...` (canopy) |
| `/trip/tour-de-rafting/` | | `/tours/acuatic/4` (whitewater) |
| `/activities/quadcycle/` | | `/tours/adventure/2` (ATV) |

El listado completo sale de Search Console; estas cuatro son la muestra mínima.

---

## 8. Fuera de alcance (para no inflar la fase 1)

- CMS (Sanity u otro): útil a medio plazo; **no bloquea** el rescate SEO
- 6 idiomas indexables (9C)
- Schema de reviews inventados
- Blog editorial sin redactor
- Link building / PR / pauta de Ads
- Rediseño visual o nueva identidad
- App de reservas propia (se mantiene EmailJS / flujo actual)

---

## 9. Dependencias y riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sin export de GSC | 301 incompletos; se rescatan menos URLs | Empezar por 2A con las 4 URLs conocidas + `site:` y ampliar |
| Hosting Lovable no permite prerender o 301 flexibles | 1A o 2 se encarecen | Evaluar 1B o capa CDN (Cloudflare Redirect Rules) |
| Contenido de tours solo en inglés | i18n y GEO en español limitados | 9B o copy del cliente |
| Videos autoplay | LCP malo; peor en móvil | Paquete 11; no bloquea 1–6 |
| Duplicar `www` y apex sin canonical de host | Señales partidas | Elegir un host canónico + redirect en el mismo lote que 3 |

---

## 10. Cómo cotizar (guion para la reunión)

1. Mostrar el diagnóstico (snippet de Google = `noscript`; sitemap 500; 404 de `/trip/`).
2. Ofrecer **A ($1,700)** como primer cheque si el presupuesto es corto.
3. Recomendar **B1 ($5,000)** como inversión que sí cambia indexación.
4. Mencionar **B2 ($6,600)** si quieren blog/CMS/i18n en 12 meses.
5. Dejar **C** y el retainer como fase 2, no como condición de A/B.
6. Pedir los accesos de la sección 7 **antes** de firmar el mapa de 301.

**Validez sugerida de esta cotización:** 30 días. Horas de implementación, no de reunión comercial.

---

## 11. Próximo paso operativo

1. Cliente elige escenario (A / B1 / B2) y, si aplica, extras à la carte.  
2. Cliente envía accesos y exports de la sección 7.  
3. Se cierra orden de trabajo con el desglose elegido y un 50/50 o 40/40/20 según plazo.  
4. La implementación de código **empieza después** de esa orden; este documento no autoriza desarrollo.

---

*Auditoría técnica sobre el repositorio `realestate/` (Vite + React) y el sitio en producción `arenaldiscovery.com`. No incluye posicionamiento actual por keyword (hace falta Search Console) ni un crawl Screaming Frog de pago.*
