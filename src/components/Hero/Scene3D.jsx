import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Scene3D = ({ onLoadingComplete = () => {} }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const timeoutRef = useRef(null);
  
  // Set a timeout to show fallback if loading takes too long
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        console.warn("3D scene loading timeout - showing fallback");
        setLoadingError(true);
        onLoadingComplete();
      }
    }, 3000); // Reduced to 3 second timeout for better UX
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, onLoadingComplete]);

  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        console.warn('WebGL not supported - showing fallback');
        setLoadingError(true);
        onLoadingComplete();
      }
    } catch (e) {
      console.error('Error checking WebGL support:', e);
      setLoadingError(true);
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  const initScene = useCallback(() => {
    if (!mountRef.current) return;
    
    try {
      // Scene setup
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      
      // Renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Clear any existing canvas
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      
      mountRef.current.appendChild(renderer.domElement);
      
      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 5);
      
      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create a simple house shape
      const houseGroup = new THREE.Group();
      
      // Base (cube)
      const baseGeometry = new THREE.BoxGeometry(2, 1, 2);
      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.5;
      houseGroup.add(base);
      
      // Roof (pyramid)
      const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
      const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xe10600 });
      const roof = new THREE.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 1.5;
      roof.rotation.y = Math.PI / 4;
      houseGroup.add(roof);
      
      // Add house to scene
      scene.add(houseGroup);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        controls.update();
        houseGroup.rotation.y += 0.005;
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Set loading state
      setLoading(false);
      onLoadingComplete();
      
      return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
          while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
          }
        }
      };
    } catch (err) {
      console.error("Error initializing 3D scene:", err);
      setLoadingError(true);
      setLoading(false);
      onLoadingComplete();
    }
  }, [onLoadingComplete]);
  
  useEffect(() => {
    // Initialize the scene
    const cleanup = initScene();
    
    // Cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, [initScene]);
  
  return (
    <div className="relative w-full h-full">
      <div 
        ref={mountRef} 
        className="w-full h-full rounded-lg overflow-hidden"
      />
      
      {loading && !loadingError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium">Loading 3D Scene</p>
        </div>
      )}
      
      {loadingError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/70 to-red-900/50 backdrop-blur-sm rounded-lg p-6 text-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">Experience Our Work</h3>
          <p className="text-white/80 text-base mb-4">Explore our gallery of completed projects below</p>
          <a href="#projects" className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            View Projects
          </a>
        </div>
      )}
    </div>
  );
};

export default Scene3D;
