export const vert_sinnoise = `
  varying vec3 vUv;
  uniform float time;

  void main() {
    const float amp = 0.2;
    const float f = 0.2;
    const float k = 3.0;
    vec3 pos = position;
    pos = vec3(pos.x, pos.y, pos.z+(sin((k*pos.x)+(f*time))*amp));
    pos = vec3(pos.x, pos.y, pos.z+(sin((k*pos.y)+(f*time))*amp));
    vUv = pos;
    vec4 mvp = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

export const frag_sinnoise = `
  varying vec3 vUv;

  const float sep = 0.5; // distance between lines
  const float lw = 0.05; // line width

  float onLine(float x, float y, float m, float b){
    float my = m*y;
    if((x < (my+b+(lw/2.0))) && (x > (my+b-(lw/2.0)))){
      return 1.0;
    }
    return 0.0;
  }

  void main() {
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 black = vec3(0.0, 0.0, 0.0);
    vec3 bg = vec3(0.0, 1.0, 1.0);
    vec3 green = vec3(0.0, 1.0, 0.0);
    vec3 rg = vec3(1.0, 1.0, 0.0);
    vec3 rb = vec3(1.0, 0.0, 1.0);
    vec3 pb = vec3(1.0, 0.8, 1.0);
    vec3 oj = vec3(1.0, 0.9, 0.0);
    float modx = mod(vUv.x, sep);
    float mody = mod(vUv.y, sep);

    if(onLine(modx, mody, 1.0, 0.0) == 1.0){
      gl_FragColor = vec4(bg, 1.0);
    } else if(onLine(modx, mody, -1.0, sep) == 1.0){
      gl_FragColor = vec4(green, 1.0);
    } else {
      gl_FragColor = vec4(black, 0.0);
    }
  }
`;
