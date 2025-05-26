/**
 * Mendez Roofing - Particle Animation
 * Creates an immersive 3D particle effect for the hero section
 */

// Initialize particle animation
const initParticleAnimation = () => {
  const particleContainer = document.getElementById('particles-js');
  if (!particleContainer) return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ffffff"
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000"
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
};

// Initialize 3D roof model
const init3DModel = () => {
  const container = document.getElementById('model-3d');
  if (!container) return;
  
  // Set up scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1e293b);
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Create house with roof
  const houseGroup = new THREE.Group();
  
  // Create roof (triangular prism)
  const roofGeometry = new THREE.ConeGeometry(2, 1.5, 4);
  roofGeometry.rotateY(Math.PI / 4);
  const roofMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x3b82f6,
    shininess: 100,
    specular: 0x111111
  });
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 1;
  houseGroup.add(roof);
  
  // Create house base (cube)
  const houseGeometry = new THREE.BoxGeometry(2.5, 2, 2.5);
  const houseMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xf8fafc,
    shininess: 50
  });
  const house = new THREE.Mesh(houseGeometry, houseMaterial);
  house.position.y = -0.5;
  houseGroup.add(house);
  
  // Add house to scene
  scene.add(houseGroup);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0xf59e0b, 1, 10);
  pointLight.position.set(-3, 3, 3);
  scene.add(pointLight);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    houseGroup.rotation.y += 0.005;
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  animate();
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize after a short delay to ensure elements are ready
  setTimeout(() => {
    initParticleAnimation();
    if (typeof THREE !== 'undefined') {
      init3DModel();
    }
  }, 100);
});
