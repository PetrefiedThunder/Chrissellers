import '@testing-library/jest-dom'

global.matchMedia = global.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }
}

global.ResizeObserver = global.ResizeObserver || class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = global.IntersectionObserver || class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock WebGL Context for Three.js
HTMLCanvasElement.prototype.getContext = function(contextType) {
  if (contextType === 'webgl' || contextType === 'webgl2' || contextType === '2d') {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: (x, y, w, h) => ({ data: new Array(w * h * 4) }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
      createShader: () => ({ compile: () => {} }),
      shaderSource: () => {},
      compileShader: () => {},
      createProgram: () => ({ link: () => {}, use: () => {} }),
      attachShader: () => {},
      linkProgram: () => {},
      getUniformLocation: () => ({ value: null }),
      getAttribLocation: () => 0,
      enableVertexAttribArray: () => {},
      vertexAttribPointer: () => {},
      createBuffer: () => ({ bind: () => {}, bufferData: () => {}, bufferSubData: () => {} }),
      bindBuffer: () => {},
      bufferData: () => {},
      bufferSubData: () => {},
      createTexture: () => ({ bind: () => {}, image: {}, texImage2D: () => {}, texParameteri: () => {} }),
      bindTexture: () => {},
      texImage2D: () => {},
      texParameteri: () => {},
      activeTexture: () => {},
      uniform1i: () => {},
      uniform1f: () => {},
      uniform3f: () => {},
      uniformMatrix4fv: () => {},
      getProgramParameter: () => 0,
      getShaderParameter: () => 0,
      getInfoLog: () => '',
      clear: () => {},
      enable: () => {},
      disable: () => {},
      depthFunc: () => {},
      blendFunc: () => {},
      viewport: () => {},
      ScissorTest: () => {},
      scissor: () => {},
    }
  }
  return null
}
