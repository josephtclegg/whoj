export const vert_sin3 = `
  varying vec3 vUv;
  uniform float time;
  
  void main() {
    const float amp = 0.05;
    const float wk = 10.0;
    const float f = 0.2;
    const float k1 = 1.75;
    const float k2 = 1.82;
    const float k3 = 0.49;
    const float k4 = 2.1;
    const float k5 = 2.89;
    const float k6 = 0.02;
    const float a1 = 0.028;
    const float a2 = 0.058;
    const float a3 = 0.091;
    const float a4 = 0.022;
    const float a5 = 0.053;
    const float a6 = 0.03;
    const float wk1 = -15.12;
    const float wk2 = -5.22;
    const float wk3 = 1.67;
    const float wk4 = 4.67;
    const float wk5 = -8.91;
    const float wk6 = 8.91;
    vec3 pos = position;
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk1*pos.x)+(f*time*k1)) )*a1));
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk2*pos.y)+(f*time*k2)) )*a2));
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk3*pos.x)+(f*time*k3)) )*a3));
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk4*pos.y)+(f*time*k4)) )*a4));
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk5*pos.x)+(f*time*k5)) )*a5));
    pos = vec3(pos.x,
               pos.y,
               pos.z+(sin( ((wk6*pos.y)+(f*time*k6)) )*a6));
    vUv = pos;
    vec4 mvp = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

export const frag_sin3 = `
  varying vec3 vUv;

  void main() {
    vec3 bg = vec3(0.0, 1.0, 1.0);
    vec3 alm   = vec3(0.8, 1.0, 1.0);
    vec4 fwhite = vec4(1.0, 1.0, 1.0, 0.9);
    vec4 fbg = vec4(0.0, 1.0, 1.0, 0.4);

    vec4 FragColor = mix(fbg, fwhite, pow(smoothstep(-0.1, 0.15, vUv.z), 1.0));
    gl_FragColor = FragColor;
  }
`;
