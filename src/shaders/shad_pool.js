export const vert_pool = `
  varying vec3 vUv;
  
  void main() {
    vUv = position;
    vec4 mvp = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

export const frag_pool = `
  varying vec3 vUv;  

  float onLine(float x, float y, float m, float b){
    const float lw = 0.1;
    float my = m*y;
    if((x < (my+b+(lw/2.0))) && (x > (my+b-(lw/2.0)))){
      return 1.0;
    }
    return 0.0;
  }

  void main() {
    vec3 bwhite = vec3(0.9, 0.9, 1.0);
    vec3 white = vec3(1.0, 1.0, 1.0);
    gl_FragColor = vec4(bwhite, 1.0);
  }
`;
