"use client";

import { useEffect, useState } from "react";
import { geoEqualEarth, geoPath, geoInterpolate } from "d3-geo";
import { feature } from "topojson-client";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const SVG_W = 800;
const SVG_H = 400;
const SF: [number, number] = [-122.4194, 37.7749];
const BOLOGNA: [number, number] = [11.3426, 44.4949];

const projection = geoEqualEarth()
  .rotate([-10, 0, 0])
  .scale(147)
  .translate([SVG_W / 2, SVG_H / 2]);

const pathFn = geoPath(projection);

const sfXY = projection(SF)!;
const boXY = projection(BOLOGNA)!;

const gcInterp = geoInterpolate(SF, BOLOGNA);
const arcCoords = Array.from({ length: 60 }, (_, i) => gcInterp(i / 59));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ARC_D = pathFn({ type: "LineString", coordinates: arcCoords } as any) ?? "";

const arcSvgPts = arcCoords
  .map((c) => projection(c as [number, number]))
  .filter((p): p is [number, number] => p != null);

const ARC_MOTION = arcSvgPts
  .map(
    (p, i) =>
      `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`,
  )
  .join(" ");

export function LocationMapSection() {
  const [landPaths, setLandPaths] = useState<string[]>([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topo) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fc = feature(topo, (topo as any).objects.countries) as any;
        const paths: string[] = [];
        for (const f of fc.features ?? []) {
          const d = pathFn(f);
          if (d) paths.push(d);
        }
        setLandPaths(paths);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="border border-cyan-300/15 bg-[#050b14]/45 px-4 py-3 backdrop-blur-sm sm:px-5">
      <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300/50">
        Locations
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-100 duration-1000" />
          <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
        </span>
      </p>

      <div className="overflow-hidden border border-cyan-300/10 bg-[#050b14]/60">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="block w-full"
          role="img"
          aria-label="World map connecting Bologna and San Francisco"
        >
          {landPaths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="rgba(103,232,249,0.04)"
              stroke="rgba(103,232,249,0.18)"
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
          ))}

          <path
            d={ARC_D}
            fill="none"
            stroke="rgba(103,232,249,0.35)"
            strokeWidth={1.2}
            strokeDasharray="6 4"
            strokeLinecap="round"
          />

          {/* SF → Bologna */}
          <circle r="2.5" fill="rgba(103,232,249,0.8)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={ARC_MOTION}
            />
          </circle>

          {/* Bologna → SF */}
          <circle r="2.5" fill="rgba(103,232,249,0.8)">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={ARC_MOTION}
              keyPoints="1;0"
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>

          <circle cx={sfXY[0]} cy={sfXY[1]} r={10} fill="rgba(103,232,249,0.06)" />
          <circle cx={sfXY[0]} cy={sfXY[1]} r={4} fill="rgba(103,232,249,0.6)">
            <animate
              attributeName="r"
              values="3;5;3"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.9;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx={boXY[0]} cy={boXY[1]} r={10} fill="rgba(103,232,249,0.06)" />
          <circle cx={boXY[0]} cy={boXY[1]} r={4} fill="rgba(103,232,249,0.6)">
            <animate
              attributeName="r"
              values="3;5;3"
              dur="3s"
              repeatCount="indefinite"
              begin="1.5s"
            />
            <animate
              attributeName="opacity"
              values="0.5;0.9;0.5"
              dur="3s"
              repeatCount="indefinite"
              begin="1.5s"
            />
          </circle>

          <text
            x={sfXY[0]}
            y={sfXY[1] + 20}
            textAnchor="middle"
            fill="rgba(186,230,253,0.55)"
            fontSize="13"
            letterSpacing="0.04em"
          >
            San Francisco
          </text>
          <text
            x={boXY[0]}
            y={boXY[1] + 20}
            textAnchor="middle"
            fill="rgba(186,230,253,0.55)"
            fontSize="13"
            letterSpacing="0.04em"
          >
            Bologna
          </text>
        </svg>
      </div>
    </div>
  );
}
