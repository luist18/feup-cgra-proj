attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float timeFactor;
uniform float speed;
uniform float angle;

#define M_PI 3.1415926535897932384626433832795

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);

	vTextureCoord = aTextureCoord;

	float a = aTextureCoord.x * aTextureCoord.x * -angle;

	offset.z = 0.3 * aTextureCoord.s * ((speed / 10.0) + 0.2) * cos(-timeFactor * 1.5 + aVertexPosition.x);

	offset.z += a;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

