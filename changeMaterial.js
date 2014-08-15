#pragma strict
public var shaderNormal: Material;
public var shaderBoost: Material;
public var shaderSlow: Material;
public var resetMass : GameObject;
private var seconds:float  ;
private var SlowSeconds:float ;
private var count:int;
static var displayTimer: boolean = false;
static var SlowTimer: boolean = false;
public var customSkin : GUISkin;
public var rigidMass : GameObject;
public var SlowAudio: AudioClip;
public var FastAudio: AudioClip;
public var BrokenShader: Material;



function Start () {
	renderer.material = shaderNormal;
	displayTimer = false;
	count = 0;
}
function Update(){
if (count == 1){
	seconds -= 1 * Time.deltaTime;
	displayTimer = true;
	if (seconds <= 0){
		NormalSpeed(); 
		displayTimer = false;
		}

	}
if (count == 2){
	SlowSeconds -= 1 * Time.deltaTime;
	SlowTimer = true;
	if (SlowSeconds <= 0){
		NormalSpeed(); 
		resetMass.GetComponent(CharacterControl).speedUP();
		SlowTimer= false;
		}
	}
}

function BoostSpeed(){
	audio.PlayOneShot(FastAudio);
	seconds = 10;
	if (count != 2){
		count = 1;
		renderer.material = shaderBoost;
		CharacterControl.speed = 2050;
	}
	

}
function NormalSpeed(){
	renderer.material = shaderNormal;
	CharacterControl.speed = 650;
	count = 0;

}
function SlowSpeed(){
	SlowSeconds = 15;
	audio.PlayOneShot(SlowAudio);
	if (count !=1){
		count = 2;
		renderer.material = shaderSlow;
		rigidMass.GetComponent(CharacterControl).slowDown();
	}
	
	
}
function Broken(){
	renderer.material = BrokenShader;



}
function OnGUI(){
	GUI.skin = customSkin;
	if (displayTimer){
			GUI.Label(new Rect(Screen.width/2 + -160 ,Screen.height/2 -100 ,500,75),"Boost Time  " + seconds.ToString("f0"));
	}
	if (SlowTimer){
			GUI.Label(new Rect(Screen.width/2 + -160 ,Screen.height/2 -100 ,500,75),"Slow Time  " + SlowSeconds.ToString("f0"));
	}




}