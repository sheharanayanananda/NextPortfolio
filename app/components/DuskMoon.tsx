"use client";

import React, { useEffect, useRef, useState } from 'react';

export interface DuskMoonProps {
  /**
   * Lunar illumination / phase from 0.0 to 1.0:
   * 0.0 = New Moon (completely shaded)
   * 0.25 = First Quarter
   * 0.50 = Full Moon
   * 0.76 = Waxing Gibbous (default, matching dusk reference)
   * 1.0 = Full cycle / New Moon
   */
  phase?: number;
  /**
   * Angle of sunlight in degrees.
   * Default: -135 (light from top-left, shade on bottom-right).
   */
  angle?: number;
  /**
   * Peak opacity of the sunlit moon surface.
   * Default: 0.68 (ethereal, see-through atmosphere vibe).
   */
  opacity?: number;
  /** Additional CSS class names */
  className?: string;
  /** Diameter in pixels */
  size?: number;
}

/**
 * Helper: Computes the approximate real-world lunar phase (0.0 to 1.0)
 * for any given date.
 */
export function getLunarPhase(date = new Date()): number {
  const synodicMonth = 29.53058867; // days in lunar cycle
  const knownNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
  const diffDays = (date.getTime() - knownNewMoon) / (1000 * 60 * 60 * 24);
  const cycle = (diffDays % synodicMonth) / synodicMonth;
  return cycle < 0 ? cycle + 1 : cycle;
}

const VS_SOURCE = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    // Flip Y to match standard WebGL texture coordinates
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uNormalMap;
  uniform float uPhase;
  uniform float uSunAngle;
  uniform float uOpacity;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    // The clean moon disk is centered with exact radius R = 490 / 512 = 0.95703125
    float dist = length(p) / 0.95703125;
    if (dist > 1.002) {
      discard;
    }

    vec4 samp = texture2D(uNormalMap, vUv);
    // Perturbed surface normal from NASA crater topography (smoothly aligned to sphere at limb)
    vec3 N_bump = normalize(samp.rgb * 2.0 - 1.0);
    float albedo = samp.a;

    // Macro sphere normal for terminator envelope
    vec2 pNorm = p / 0.95703125;
    vec3 N_sphere = vec3(pNorm.x, pNorm.y, sqrt(max(0.0, 1.0 - dot(pNorm, pNorm))));

    // Phase angle beta from illumination
    float beta = acos(clamp(2.0 * uPhase - 1.0, -1.0, 1.0));
    vec3 S = normalize(vec3(
      sin(beta) * cos(uSunAngle),
      sin(beta) * sin(uSunAngle),
      cos(beta)
    ));

    float dot_bump = dot(N_bump, S);
    float dot_sphere = dot(N_sphere, S);

    // Lommel-Seeliger scattering on lunar regolith: mu0 / (mu0 + mu)
    float mu0 = max(0.0, dot_bump);
    float lommel = mu0 / (mu0 + max(0.001, N_bump.z));

    // Realistic terminator grazing penumbra
    float terminator = clamp(dot_sphere / 0.12 + 0.5, 0.0, 1.0);
    terminator = terminator * terminator * (3.0 - 2.0 * terminator);

    float lit = clamp(lommel * 1.85, 0.0, 1.0) * terminator;

    // Bright sunlit moon: crisp brilliant white highlights, soft slate maria
    vec3 sunlitWhite = vec3(255.0 / 255.0, 254.0 / 255.0, 252.0 / 255.0);
    vec3 moonRgb = sunlitWhite * (0.72 + 0.28 * albedo);

    // Sub-pixel smooth antialiased outer limb (seamless transition directly into sky)
    float limb = clamp((1.0 - dist) / 0.005, 0.0, 1.0);
    limb = limb * limb * (3.0 - 2.0 * limb);

    // Translucent see-through atmosphere alpha: blue sky permeates through the sunlit rock
    float alpha = limb * clamp(lit * 1.15, 0.0, 1.0) * uOpacity;

    gl_FragColor = vec4(moonRgb, alpha);
  }
`;

export default function DuskMoon({
  phase = 0.76,  // Real Waxing Gibbous
  angle = -135,   // Sun at top-left, casting shadow bottom-right
  opacity = 0.68, // Ethereal translucent daytime/dusk sky atmosphere
  className = "",
  size = 350,
}: DuskMoonProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<{
    uPhase: WebGLUniformLocation | null;
    uSunAngle: WebGLUniformLocation | null;
    uOpacity: WebGLUniformLocation | null;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) {
      setUseFallback(true);
      return;
    }
    glRef.current = gl;

    // Helper: compile shader
    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.warn('Shader compile error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VS_SOURCE);
    const fs = compileShader(gl.FRAGMENT_SHADER, FS_SOURCE);
    if (!vs || !fs) {
      setUseFallback(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      setUseFallback(true);
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering [-1, 1]
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uPhase = gl.getUniformLocation(program, 'uPhase');
    const uSunAngle = gl.getUniformLocation(program, 'uSunAngle');
    const uOpacity = gl.getUniformLocation(program, 'uOpacity');
    uniformsRef.current = { uPhase, uSunAngle, uOpacity };

    // Load lunar normal/albedo texture
    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = '/moon_surface_normals.webp';
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      renderFrame(phase, angle, opacity);
    };
    image.onerror = () => {
      setUseFallback(true);
    };

    function renderFrame(currentPhase: number, currentAngle: number, currentOpacity: number) {
      if (!gl || !uniformsRef.current) return;
      gl.viewport(0, 0, canvas!.width, canvas!.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uniformsRef.current.uPhase, currentPhase);
      gl.uniform1f(uniformsRef.current.uSunAngle, (currentAngle * Math.PI) / 180.0);
      gl.uniform1f(uniformsRef.current.uOpacity, currentOpacity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(texture);
    };
  }, []);

  // Update uniforms when phase, angle, or opacity props change
  useEffect(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    if (!gl || !canvas || !uniformsRef.current) return;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uniformsRef.current.uPhase, phase);
    gl.uniform1f(uniformsRef.current.uSunAngle, (angle * Math.PI) / 180.0);
    gl.uniform1f(uniformsRef.current.uOpacity, opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }, [phase, angle, opacity]);

  return (
    <div
      className={`relative aspect-square flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Soft atmospheric forward-scattering halo */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 45% 45%, rgba(255, 255, 255, 0.16) 0%, rgba(180, 210, 255, 0.06) 50%, transparent 72%)',
          filter: 'blur(28px)',
          transform: 'scale(1.15)',
        }}
      />

      {/* Real-time 3D Photometric WebGL Moon Canvas */}
      {!useFallback ? (
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          className="w-full h-full object-contain relative select-none"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.14))',
          }}
          aria-label="3D Realistic Dusk Moon"
        />
      ) : (
        /* Pre-rendered 3D Physical Lighting Fallback */
        <img
          src="/moon_dusk.webp"
          alt="3D Realistic Dusk Moon"
          width={size}
          height={size}
          loading="lazy"
          className="w-full h-full object-contain relative select-none"
          style={{
            filter: 'drop-shadow(0 0 16px rgba(255, 255, 255, 0.14))',
          }}
        />
      )}
    </div>
  );
}
