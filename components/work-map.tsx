"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2 } from "lucide-react"
import { workLocations } from "@/lib/locations"
import { serviceList } from "@/lib/services"

// Leaflet and its clustering plugin are loaded from a CDN at runtime,
// so the map adds no npm dependencies to the project.
const LEAFLET_CSS = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css",
]
const LEAFLET_JS = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js",
]

export const serviceColors: Record<string, string> = {
  "engine-repair": "#3B82F6",
  "marine-electrical": "#F59E0B",
  "navigation-bridge": "#22D3EE",
  "shaft-line": "#A78BFA",
  "ballast-tank": "#34D399",
  welding: "#F43F5E",
}

let leafletPromise: Promise<any> | null = null

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing?.dataset.loaded) return resolve()
    const script = existing ?? document.createElement("script")
    script.addEventListener("load", () => {
      script.dataset.loaded = "true"
      resolve()
    })
    script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)))
    if (!existing) {
      script.src = src
      document.head.appendChild(script)
    }
  })
}

function loadLeaflet() {
  if (!leafletPromise) {
    for (const href of LEAFLET_CSS) {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = href
        document.head.appendChild(link)
      }
    }
    leafletPromise = LEAFLET_JS.reduce<Promise<void>>(
      (chain, src) => chain.then(() => loadScript(src)),
      Promise.resolve(),
    )
      .then(() => (window as any).L)
      .catch((error) => {
        leafletPromise = null
        throw error
      })
  }
  return leafletPromise
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)
}

export function WorkMap() {
  const container = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const clusterRef = useRef<any>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [active, setActive] = useState<string[]>(serviceList.map((service) => service.slug))

  const counts = useMemo(() => {
    const result: Record<string, number> = {}
    for (const location of workLocations) {
      result[location.service] = (result[location.service] ?? 0) + 1
    }
    return result
  }, [])

  // Create the map once.
  useEffect(() => {
    let cancelled = false
    loadLeaflet()
      .then((L) => {
        if (cancelled || !container.current || mapRef.current) return
        const map = L.map(container.current, {
          worldCopyJump: true,
          minZoom: 2,
          scrollWheelZoom: false,
        })
        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 18,
        }).addTo(map)
        map.fitBounds(
          workLocations.map((location) => [location.lat, location.lng]),
          { padding: [30, 30] },
        )
        // Scroll-zoom only after the visitor clicks the map, so the page still scrolls.
        map.on("click", () => map.scrollWheelZoom.enable())
        map.on("mouseout", () => map.scrollWheelZoom.disable())

        clusterRef.current = L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 50,
          spiderfyOnMaxZoom: true,
          iconCreateFunction: (cluster: any) => {
            const count = cluster.getChildCount()
            const size = count < 10 ? 36 : count < 30 ? 44 : 54
            return L.divIcon({
              html: `<div class="sf-cluster" style="width:${size}px;height:${size}px">${count}</div>`,
              className: "",
              iconSize: [size, size],
            })
          },
        })
        map.addLayer(clusterRef.current)
        mapRef.current = map
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      clusterRef.current = null
    }
  }, [])

  // Redraw markers when the service filter changes.
  useEffect(() => {
    const L = (window as any).L
    const cluster = clusterRef.current
    if (status !== "ready" || !L || !cluster) return
    cluster.clearLayers()
    const markers = workLocations
      .filter((location) => active.includes(location.service))
      .map((location) => {
        const color = serviceColors[location.service]
        const service = serviceList.find((item) => item.slug === location.service)
        return L.marker([location.lat, location.lng], {
          icon: L.divIcon({
            html: `<span class="sf-dot" style="background:${color};box-shadow:0 0 0 4px ${color}33"></span>`,
            className: "",
            iconSize: [14, 14],
          }),
        }).bindPopup(
          `<div class="sf-popup"><strong>${escapeHtml(location.name)}</strong><span>${escapeHtml(location.country)}</span><em style="color:${color}">${escapeHtml(service?.title ?? "")}</em></div>`,
        )
      })
    cluster.addLayers(markers)
  }, [active, status])

  function toggle(slug: string) {
    setActive((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    )
  }

  const allActive = active.length === serviceList.length

  return (
    <div>
      <style>{`
        .sf-cluster {
          display: flex; align-items: center; justify-content: center;
          border-radius: 9999px; background: rgba(37, 99, 235, 0.9);
          color: #fff; font: 600 13px/1 var(--font-poppins), sans-serif;
          box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.25), 0 0 0 12px rgba(37, 99, 235, 0.1);
        }
        .sf-dot { display: block; width: 14px; height: 14px; border-radius: 9999px; border: 2px solid #0A0E1A; }
        .sf-map .leaflet-container { background: #0A0E1A; font-family: var(--font-poppins), sans-serif; }
        .sf-map .leaflet-popup-content-wrapper, .sf-map .leaflet-popup-tip { background: #111827; color: #fff; border: 1px solid #1F2937; }
        .sf-map .leaflet-popup-content { margin: 12px 14px; }
        .sf-popup { display: flex; flex-direction: column; gap: 2px; font-size: 13px; }
        .sf-popup span { color: #9CA3AF; }
        .sf-popup em { font-style: normal; font-weight: 600; margin-top: 4px; }
        .sf-map .leaflet-bar a { background: #111827; color: #fff; border-color: #1F2937; }
        .sf-map .leaflet-bar a:hover { background: #1F2937; }
        .sf-map .leaflet-control-attribution { background: rgba(10, 14, 26, 0.8); color: #6B7280; }
        .sf-map .leaflet-control-attribution a { color: #9CA3AF; }
      `}</style>

      {/* Service filter / legend */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(serviceList.map((service) => service.slug))}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            allActive
              ? "border-primary bg-primary/15 text-white"
              : "border-border bg-card text-muted-foreground hover:text-white"
          }`}
        >
          All services · {workLocations.length}
        </button>
        {serviceList.map((service) => {
          const on = active.includes(service.slug)
          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => toggle(service.slug)}
              aria-pressed={on}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                on
                  ? "border-border bg-card text-white"
                  : "border-border/50 bg-transparent text-muted-foreground line-through"
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: serviceColors[service.slug] }}
              />
              {service.title} · {counts[service.slug] ?? 0}
            </button>
          )
        })}
      </div>

      <div className="sf-map relative isolate overflow-hidden rounded-xl border border-border">
        <div ref={container} className="h-[480px] w-full lg:h-[600px]" />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0A0E1A] text-muted-foreground">
            {status === "loading" ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <p>The map could not be loaded. Please refresh the page.</p>
            )}
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Click the map to zoom with the mouse wheel. Numbers show how many sites are in an area;
        click a group to zoom in.
      </p>
    </div>
  )
}
