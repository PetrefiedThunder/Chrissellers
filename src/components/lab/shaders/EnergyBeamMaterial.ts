import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

export const EnergyBeamMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.4, 1.0),
    opacity: 1.0,
    speed: 1.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    uniform float opacity;
    uniform float speed;
    varying vec2 vUv;

    void main() {
      // Create a moving pulse effect
      float flow = mod(vUv.x * 10.0 - time * speed, 1.0);
      
      // Make it look like a beam/dash
      float beam = smoothstep(0.0, 0.2, flow) * smoothstep(0.6, 0.4, flow);
      
      // Add a base glow
      float glow = 0.2;
      
      // Fade out at ends (vUv.x is 0 to 1 along the cylinder length usually, but depends on UV mapping)
      // For a cylinder, y is usually length. Let's check UVs.
      // Assuming standard cylinder UVs where y goes 0-1 along height.
      float fade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

      vec3 finalColor = color + vec3(beam);
      float finalAlpha = (glow + beam) * opacity * fade;

      gl_FragColor = vec4(finalColor, finalAlpha);
    }
  `
)

extend({ EnergyBeamMaterial })

// Add type definition for the new material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      energyBeamMaterial: any
    }
  }
}
