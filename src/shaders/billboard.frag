#ifdef GL_ES
precision highp float;
#endif

varying vec2 position;

uniform float percentage;
uniform float random;

void main() {
	float curve = 0.0;
	if (percentage > 0.0 && percentage < 1.0)
		curve += sin(random + 3.0*position.t);

	if (position.x < percentage + curve / 100.0) {
		if (position.x <= 0.5)
			gl_FragColor = vec4(1.0 - position.s + 250.0/255.0, 2.0 * position.s, 0, 1.0);
		else
			gl_FragColor = vec4(1.0 - position.s * 3.0 + 402.0/255.0, 1.0, 0.0, 1.0);
	} else {
		gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
	}
}