// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create spheres
const spheres = [];
const numSpheres = 100;

for (let i = 0; i < numSpheres; i++) {
    const geometry = new THREE.SphereGeometry(Math.random() * 30 + 10, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 60%)`),
        emissive: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 60%)`),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);

    // Random position
    sphere.position.x = Math.random() * window.innerWidth - window.innerWidth / 2;
    sphere.position.y = Math.random() * window.innerHeight - window.innerHeight / 2;
    sphere.position.z = Math.random() * 2000 - 1000;

    // Random velocity
    sphere.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
    );

    scene.add(sphere);
    spheres.push(sphere);
}

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 1000);
scene.add(pointLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update sphere positions
    spheres.forEach(sphere => {
        sphere.position.add(sphere.userData.velocity);

        // Bounce spheres within bounds
        if (sphere.position.x > window.innerWidth / 2 || sphere.position.x < -window.innerWidth / 2) {
            sphere.userData.velocity.x *= -1;
        }
        if (sphere.position.y > window.innerHeight / 2 || sphere.position.y < -window.innerHeight / 2) {
            sphere.userData.velocity.y *= -1;
        }
        if (sphere.position.z > 1000 || sphere.position.z < -1000) {
            sphere.userData.velocity.z *= -1;
        }
    });

    // Rotate the entire scene for dynamic effect
    scene.rotation.x += 0.0005;
    scene.rotation.y += 0.0005;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});
