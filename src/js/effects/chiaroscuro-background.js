// Chiaroscuro-inspired background animation with golden light effects
class ChiaroscuroBackground {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.lightSources = [];
    this.particles = [];
    this.animationId = null;
    this.isInitialized = false;

    // Animation configuration
    this.config = {
      lightSourcesCount: 3,
      particlesCount: 80,
      lightIntensity: 0.3,
      animationSpeed: 0.02,
      goldColor: [255, 215, 0],
      fadeSpeed: 0.95,
    };
  }

  init() {
    if (this.isInitialized) return;

    this.createCanvas();
    this.createLightSources();
    this.createParticles();
    this.bindEvents();
    this.animate();

    this.isInitialized = true;
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "chiaroscuro-bg";
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      pointer-events: none;
      opacity: 0.4;
    `;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";
  }

  createLightSources() {
    this.lightSources = [];
    const { lightSourcesCount } = this.config;

    for (let i = 0; i < lightSourcesCount; i++) {
      this.lightSources.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 150 + Math.random() * 200,
        intensity: 0.2 + Math.random() * 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }
  }

  createParticles() {
    this.particles = [];
    const { particlesCount } = this.config;

    for (let i = 0; i < particlesCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        life: Math.random(),
      });
    }
  }

  updateLightSources() {
    this.lightSources.forEach((light) => {
      // Organic movement
      light.x += light.speedX;
      light.y += light.speedY;

      // Bounce on edges
      if (
        light.x < -light.radius ||
        light.x > window.innerWidth + light.radius
      ) {
        light.speedX *= -1;
      }
      if (
        light.y < -light.radius ||
        light.y > window.innerHeight + light.radius
      ) {
        light.speedY *= -1;
      }

      // Pulsation effect
      light.pulse += light.pulseSpeed;
      light.currentIntensity = light.intensity + Math.sin(light.pulse) * 0.1;
    });
  }

  updateParticles() {
    this.particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Recycle particles that go off screen
      if (
        particle.x < 0 ||
        particle.x > window.innerWidth ||
        particle.y < 0 ||
        particle.y > window.innerHeight
      ) {
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
      }

      // Life animation
      particle.life += 0.005;
      particle.opacity = 0.3 + Math.sin(particle.life) * 0.2;
    });
  }

  render() {
    const { ctx, canvas } = this;
    const { goldColor } = this.config;

    // Fade effect
    ctx.fillStyle = "rgba(13, 13, 13, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render light sources
    this.lightSources.forEach((light) => {
      const gradient = ctx.createRadialGradient(
        light.x,
        light.y,
        0,
        light.x,
        light.y,
        light.radius
      );

      const alpha = light.currentIntensity;
      gradient.addColorStop(
        0,
        `rgba(${goldColor[0]}, ${goldColor[1]}, ${goldColor[2]}, ${alpha})`
      );
      gradient.addColorStop(
        0.4,
        `rgba(${goldColor[0]}, ${goldColor[1]}, ${goldColor[2]}, ${
          alpha * 0.3
        })`
      );
      gradient.addColorStop(1, "rgba(255, 215, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(
        light.x - light.radius,
        light.y - light.radius,
        light.radius * 2,
        light.radius * 2
      );
    });

    // Render golden particles
    this.particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${goldColor[0]}, ${goldColor[1]}, ${goldColor[2]}, ${particle.opacity})`;
      ctx.fill();

      // Shine effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${goldColor[0]}, ${goldColor[1]}, ${
        goldColor[2]
      }, ${particle.opacity * 0.1})`;
      ctx.fill();
    });
  }

  animate() {
    this.updateLightSources();
    this.updateParticles();
    this.render();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.resizeCanvas();
      // Reposition elements if needed
      this.lightSources.forEach((light) => {
        if (light.x > window.innerWidth) light.x = window.innerWidth;
        if (light.y > window.innerHeight) light.y = window.innerHeight;
      });
    });

    // Parallax effect on mouse movement
    document.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      this.lightSources.forEach((light, index) => {
        const factor = (index + 1) * 0.1;
        light.speedX += (mouseX - 0.5) * factor * 0.1;
        light.speedY += (mouseY - 0.5) * factor * 0.1;
      });
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
    this.isInitialized = false;
  }

  // Methods to control intensity
  setIntensity(intensity) {
    this.config.lightIntensity = Math.max(0, Math.min(1, intensity));
    this.lightSources.forEach((light) => {
      light.intensity = this.config.lightIntensity;
    });
  }

  pause() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resume() {
    if (!this.animationId && this.isInitialized) {
      this.animate();
    }
  }
}

// Global instance
let chiaroscuroBackground = null;

// Public API
export function initChiaroscuroBackground() {
  if (!chiaroscuroBackground) {
    chiaroscuroBackground = new ChiaroscuroBackground();
  }
  chiaroscuroBackground.init();
}

export function destroyChiaroscuroBackground() {
  if (chiaroscuroBackground) {
    chiaroscuroBackground.destroy();
    chiaroscuroBackground = null;
  }
}

export function setBackgroundIntensity(intensity) {
  if (chiaroscuroBackground) {
    chiaroscuroBackground.setIntensity(intensity);
  }
}

export function pauseBackground() {
  if (chiaroscuroBackground) {
    chiaroscuroBackground.pause();
  }
}

export function resumeBackground() {
  if (chiaroscuroBackground) {
    chiaroscuroBackground.resume();
  }
}
