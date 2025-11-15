"use client";

import { useEffect, useState, useCallback, FC } from "react";
// 💡 FIX 2: Imported React.ReactElement to fix the JSX.Element type error
import React from "react";
import { MapContainer, TileLayer, LayersControl, LayerGroup, GeoJSON, Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import { OpenWeatherMapLayer } from "./OpenWeatherMapLayer";
import type { AreaWeather } from "./lgu-weather-dashboard";
import { AlertTriangle, ShieldCheck, AlertCircle } from "lucide-react";
import { Cloud, Thermometer, Droplet, Wind, Eye } from "lucide-react";

const INITIAL_CENTER: [number, number] = [14.5416, 120.9936];
const INITIAL_ZOOM: number = 13;

interface WeatherMapPasayProps {
    areas: AreaWeather[];
}

function createCustomIcon(L: typeof import('leaflet'), alert: AreaWeather["alert"]) {
    const wrapperSize = 40;
    const centerSize = 30;
    const iconSize = 20;

    let statusColor = "";
    let iconSvg = "";

    const getIconSvg = (IconComponent: React.ElementType) => {
        switch(IconComponent) {
            case AlertTriangle:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
            case AlertCircle:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
            case ShieldCheck:
            default:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
        }
    };

    switch (alert) {
        case "critical":
            statusColor = "var(--status-critical, #ef4444)";
            iconSvg = getIconSvg(AlertTriangle);
            break;
        case "warning":
            statusColor = "var(--status-warning, #f59e0b)";
            iconSvg = getIconSvg(AlertCircle);
            break;
        case "safe":
        default:
            statusColor = "var(--status-safe, #22c55e)";
            iconSvg = getIconSvg(ShieldCheck);
            break;
    }

    const pulseClass = alert === 'critical' ? 'animate-pulse' : '';

    const htmlContent = `
        <div class="${pulseClass}" 
             style="width: ${wrapperSize}px; height: ${wrapperSize}px; position: relative; display: flex; align-items: center; justify-content: center;">
            
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; opacity: 0.5; background-color: ${statusColor};">
            </div>
            
            <div style="position: relative; z-index: 10; width: ${centerSize}px; height: ${centerSize}px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background-color: ${statusColor}; border: 2px solid white;">
                ${iconSvg}
            </div>
        </div>
    `;

    return L.divIcon({
        html: htmlContent,
        className: 'lgu-weather-marker-inline-style',
        iconSize: [wrapperSize, wrapperSize],
        iconAnchor: [wrapperSize / 2, wrapperSize / 2],
        popupAnchor: [0, -wrapperSize / 2],
    });
}

function getPolygonStyle(feature: Feature<Geometry, GeoJsonProperties>, areas: AreaWeather[]): L.PathOptions {
    const zoneName = feature.properties?.NAME_1 as string;
    const area = areas.find((a) => a.area === zoneName);

    const criticalColor = "oklch(0.55 0.25 27.32)";
    const warningColor = "oklch(0.68 0.22 70.08)";
    const safeColor = "oklch(0.48 0.17 134.68)";

    let color = safeColor;
    let fillColor = safeColor;
    let opacity = 0.5;
    let fillOpacity = 0.15;

    if (area) {
        if (area.alert === "critical") {
            color = criticalColor;
            fillColor = criticalColor;
            opacity = 0.6;
            fillOpacity = 0.25;
        }
        else if (area.alert === "warning") {
            color = warningColor;
            fillColor = warningColor;
            opacity = 0.6;
            fillOpacity = 0.2;
        }
    }

    return {
        color,
        weight: 2,
        fillColor,
        opacity,
        fillOpacity,
    };
}

interface MapResetControlProps {
    geoJsonData: FeatureCollection<Geometry, GeoJsonProperties> | null;
    resetTrigger: number;
    handleResetClick: () => void;
}

const MapResetControl: FC<MapResetControlProps> = ({ geoJsonData, resetTrigger, handleResetClick }) => {
    const map = useMap();

    useEffect(() => {
        if (resetTrigger === 0 || !geoJsonData || !L) return;

        try {
            // Safer GeoJSON instantiation
            const geo = new L.GeoJSON(geoJsonData);
            const bounds = geo.getBounds();

            if (bounds.isValid()) {
                map.flyToBounds(bounds, { padding: [20, 20], duration: 0.8 });
            }
        } catch (e) {
            console.error("Error resetting map bounds:", e);
        }
    }, [resetTrigger, geoJsonData, map]);

    useEffect(() => {
        if (!L) return;

        const button = L.DomUtil.create(
            'button',
            'h-9 px-3 py-2 text-sm bg-card hover:bg-muted/80 text-foreground rounded-lg border border-border shadow-lg flex items-center gap-1'
        );
        button.title = "Reset View to Pasay Boundaries";
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.75L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.75L21 16"/><path d="M21 21v-5h-5"/></svg> Reset View`;

        L.DomEvent.disableClickPropagation(button);
        L.DomEvent.on(button, 'click', L.DomEvent.stop).on(button, 'click', handleResetClick);

        // 💡 FIX 1: Defined a custom control class to correctly implement onAdd.
        const CustomControl = L.Control.extend({
            onAdd: function () {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                container.style.marginTop = '10px';
                container.appendChild(button);
                return container;
            },
            onRemove: function () {
                // Remove listeners if necessary
            }
        });

        // Instantiate the custom control
        const control = new CustomControl({ position: 'topright' });

        control.addTo(map);

        return () => {
            control.remove();
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, handleResetClick]);

    return null;
}


function FitBounds({ geoData }: { geoData: FeatureCollection<Geometry, GeoJsonProperties> | null }) {
    const map = useMap();
    useEffect(() => {
        if (geoData) {
            const geo = new L.GeoJSON(geoData);
            map.fitBounds(geo.getBounds(), { padding: [20, 20] });
        }
    }, [geoData, map]);
    return null;
}


function onEachFeatureHandler(
    feature: Feature<Geometry, GeoJsonProperties>,
    layer: L.Layer,
    areas: AreaWeather[],
    map: L.Map
) {
    if (layer instanceof L.Path) {
        const defaultStyle = getPolygonStyle(feature, areas);

        layer.bindPopup(
            `<div style="color: var(--card-foreground); background: var(--card); padding: 5px; border-radius: 4px;"><strong>${feature.properties?.NAME_1 || "Unknown"}</strong></div>`
        );

        layer.on({
            mouseover: (e) => {
                const l = e.target;
                l.setStyle({
                    weight: 4,
                    color: 'var(--primary, #3b82f6)',
                    dashArray: '3',
                    fillOpacity: defaultStyle.fillOpacity as number + 0.15,
                });
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    l.bringToFront();
                }
            },
            mouseout: (e) => {
                e.target.setStyle(defaultStyle);
            },
            click: (e) => {
                map.fitBounds(e.target.getBounds());
            }
        });
    }
}

export function WeatherMapPasay({ areas }: WeatherMapPasayProps) {
    const [geoData, setGeoData] = useState<FeatureCollection<Geometry, GeoJsonProperties> | null>(null);
    const [resetTrigger, setResetTrigger] = useState(0);

    const handleResetClick = useCallback(() => {
        setResetTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        fetch("/PASAY.geojson")
            .then((res) => res.json())
            .then((data: FeatureCollection<Geometry, GeoJsonProperties>) => setGeoData(data))
            .catch((err) => console.error("Failed to load GeoJSON", err));
    }, []);

    const markers = areas.map(area => {
        const icon = createCustomIcon(L, area.alert);
        return (
            <Marker key={area.area} position={[area.lat, area.lon]} icon={icon}>
                <Popup>
                    <div className="p-1 rounded-lg w-48 bg-card text-card-foreground">
                        <div className="flex items-center justify-between mb-2 border-b border-border pb-1">
                            <h3 className="font-semibold text-sm">{area.area}</h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium`}
                                style={{
                                    backgroundColor: `var(--status-${area.alert})/25`,
                                    color: `var(--status-${area.alert})`
                                }}
                            >
                                {area.alert.toUpperCase()}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
                            <div className="flex items-start gap-1">
                                <Cloud size={12} className="text-muted-foreground mt-[2px]" />
                                <div>
                                    <p className="opacity-70">Condition</p>
                                    <p className="font-semibold text-foreground">{area.condition}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1">
                                <Thermometer size={12} className="text-muted-foreground mt-[2px]" />
                                <div>
                                    <p className="opacity-70">Temp</p>
                                    <p className="font-semibold text-foreground">{area.temp}°C</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1">
                                <Droplet size={12} className="text-muted-foreground mt-[2px]" />
                                <div>
                                    <p className="opacity-70">Humidity</p>
                                    <p className="font-semibold text-foreground">{area.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1">
                                <Wind size={12} className="text-muted-foreground mt-[2px]" />
                                <div>
                                    <p className="opacity-70">Wind</p>
                                    <p className="font-semibold text-foreground">{area.windSpeed} km/h</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1 col-span-2">
                                <Eye size={12} className="text-muted-foreground mt-[2px]" />
                                <div>
                                    <p className="opacity-70">Visibility</p>
                                    <p className="font-semibold text-foreground">{area.visibility} km</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Marker>
        );
    });

    return (
        // FIX 1: Add a very low z-index to the root container of the map component
        // This resets the stacking context below the main dashboard/navbar z-indices.
        <div className="relative w-full z-0" style={{ height: "90vh" }}> 
            <MapContainer
                center={INITIAL_CENTER}
                zoom={INITIAL_ZOOM}
                scrollWheelZoom
                // Ensure map style is here, but don't add z-index here
                style={{ height: "100%", width: "100%", backgroundColor: 'var(--background)' }}
            >
                <MapInteractivityWrapper
                    areas={areas}
                    geoData={geoData}
                    markers={markers}
                    resetTrigger={resetTrigger}
                    handleResetClick={handleResetClick}
                />
            </MapContainer>

            {/* Legend div: Keep zIndex very high to overlay Leaflet controls */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur px-4 py-3 rounded-lg border border-border text-foreground shadow-lg" style={{ zIndex: 1000 }}>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Alert Status</p>
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-critical)' }} />
                        <span className="text-xs">Critical Alert (High Risk)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-warning)' }} />
                        <span className="text-xs">Warning Alert (Elevated Risk)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--status-safe)' }} />
                        <span className="text-xs">Safe Conditions (Low Risk)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 💡 FIX 2: Updated markers type from JSX.Element[] to React.ReactElement[]
function MapInteractivityWrapper({ areas, geoData, markers, resetTrigger, handleResetClick }: Pick<WeatherMapPasayProps, 'areas'> & { geoData: FeatureCollection<Geometry, GeoJsonProperties> | null, markers: React.ReactElement[], resetTrigger: number, handleResetClick: () => void }) {
    const map = useMap();

    const featureHandler = useCallback((feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
        onEachFeatureHandler(feature, layer, areas, map);
    }, [areas, map]);

    return (
        <>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />

            <MapResetControl
                geoJsonData={geoData}
                resetTrigger={resetTrigger}
                handleResetClick={handleResetClick}
            />

            {geoData && <FitBounds geoData={geoData} />}

            {geoData && (
                <GeoJSON
                    data={geoData}
                    style={(feature) => getPolygonStyle(feature as Feature<Geometry, GeoJsonProperties>, areas)}
                    onEachFeature={featureHandler}
                />
            )}

            {markers}

            <LayersControl position="topleft">
                {["wind_new", "clouds_new", "precipitation_new", "temp_new"].map((layer) => (
                    <LayersControl.Overlay key={layer} name={layer}>
                        <LayerGroup>
                            <OpenWeatherMapLayer layer={layer as any} />
                        </LayerGroup>
                    </LayersControl.Overlay>
                ))}
            </LayersControl>
        </>
    );
}