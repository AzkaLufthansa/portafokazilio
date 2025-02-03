import * as THREE from 'three';

export class LiquidBackground {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private material: THREE.ShaderMaterial;
  private clock: THREE.Clock;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    const { width, height } = container.getBoundingClientRect();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    this.renderer.setSize(width, height);
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.zIndex = '-1';
    container.appendChild(this.renderer.domElement);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          vec2 u = f * f * (3.0 - 2.0 * f);

          return mix(a, b, u.x) +
                  (c - a)* u.y * (1.0 - u.x) +
                  (d - b) * u.x * u.y;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy/resolution.xy;
          float t = time * 0.2;
          
          // Warping effect
          vec2 warp = vec2(
            noise(uv * 3.0 + t + vec2(0.0, 0.0)),
            noise(uv * 3.0 + t + vec2(5.2, 1.3))
          );
          
          vec2 warp2 = vec2(
            noise(uv * 5.0 + t * 2.0 + warp),
            noise(uv * 5.0 + t * 2.0 + warp)
          );
          
          vec2 finalWarp = uv + warp * 0.2 + warp2 * 0.2;
          
          // Color layers
          // Warna dasar yang bergerak seiring waktu
          vec3 color1 = vec3(0.1, 0.2, 0.5); // Dark blue
          vec3 color2 = vec3(0.2, 0.3, 0.7); // Medium blue
          vec3 color3 = vec3(0.3, 0.4, 0.9); // Light blue
          
          float noise1 = noise(finalWarp * 4.0 + t);
          float noise2 = noise(finalWarp * 4.0 - t * 1.5);
          float noise3 = noise(finalWarp * 4.0 + t * 0.5);
          
          vec3 finalColor = mix(
            mix(color1, color2, noise1),
            color3,
            noise2 * noise3
          );
          
          // Menambah variasi untuk efek kilau air
          finalColor += vec3(noise(finalWarp * 10.0)) * 0.12;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);

    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.onWindowResize()
  }

  private animate = () => {
    requestAnimationFrame(this.animate)
    this.material.uniforms.time.value = this.clock.getElapsedTime()
    this.renderer.render(this.scene, this.camera)
  }

  private onWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    
    this.renderer.setSize(width, height)
    this.material.uniforms.resolution.value.set(width, height)
  }

  public dispose() {
    window.removeEventListener('resize', this.onWindowResize.bind(this))
    this.renderer.dispose()
  }
} 