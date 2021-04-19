export const vert_head = `
  varying vec3 vUv;
  uniform float time;

  void main() {
    vec3 pos = position;
    pos = vec3(pos.x+(pos.y/4.0), pos.y+(8.0*sin(time+pos.x)), pos.z);
    vUv - pos;
    vec4 mvp = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

export const frag_head = `
  varying vec3 vUv;

  void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.1, 1.0);
  }
`;
