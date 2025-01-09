precision highp float;

varying vec3 v_normal;
varying vec2 v_uv;
varying vec4 v_color;
// varying vec4 v_id;

varying float v_random;

uniform float u_time;
uniform float u_a_scroll;



void main() {
    float dist = distance(v_uv, vec2(0.5));
    float alpha = 1.0 - smoothstep(0., 0.5, dist);

    float color = smoothstep(0.9, 0., dist);

    alpha *= (v_random * 0.5 + 0.5 + sin(u_time * 3. + v_random)) * .5 - u_a_scroll * .05;
    // alpha = 1.;
    

    gl_FragColor.rgb = vec3(1.);
    gl_FragColor.a = alpha * .5;
    // gl_FragColor.a = alpha ;
}
