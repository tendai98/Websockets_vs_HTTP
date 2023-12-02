let shaderObject;

const vertexShader = `
    attribute vec3 aPosition;\n

    void main(){
          vec4 position = vec4(aPosition, 1.0);
          position.xy = position.xy * 2.0 - 1.0;
          gl_Position = position;
    }
`

const fragmentShader = `
    precision mediump float;

    uniform vec2 resolution;
    uniform float time;

    vec4 palette(float t){
            vec4 a = vec4(0.5, 0.5, 0.5, 1.0);
            vec4 b = vec4(0.5, 0.5, 0.5, 1.0);
            vec4 c = vec4(1.0, 1.0, 1.0, 1.0);  
            vec4 d = vec4(0.263, 0.416, 0.557, 1.0);

            return a + b * cos(6.28318 * (c*t+d));
    }


    void main(){
      vec2 uv = ((gl_FragCoord.xy / resolution) - 0.5) * 2.0;
      uv.x *= resolution.x / resolution.y;
      vec2 uv0 = uv;
      vec4 colorOutput = vec4(0.0);

      for(float i = 0.0; i < 4.0; i++){
        uv = fract(uv) - 0.5;

        float d = length(uv);
        vec4 computeColor = palette(length(uv0) + time);

        d = sin(d * 20.0 + time) / 4.0;
        d = abs(d);
        d = 0.05 / d;
        computeColor *= d;
        colorOutput += computeColor * d;
      }

      gl_FragColor = colorOutput;
}`

const RESOLUTION_RATIO = 2
const CUSTOM_WIDTH = screen.width 
const CUSTOM_HEIGHT = screen.height / RESOLUTION_RATIO

function setup() {
  createCanvas(CUSTOM_WIDTH, CUSTOM_HEIGHT, WEBGL);
  shaderObject = createShader(vertexShader, fragmentShader);
  shader(shaderObject);
}


function draw() {}
