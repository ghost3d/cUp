#pragma strict
static var guiMode : String = "InGame";
public var customSkin : GUISkin;
public var numPicked:int;
public var totalCubes:int;
public var GuiBackground: Texture2D;
private var sugarcubes:GameObject[];
static var CurrentScore: int;
private var highScore:int;
public var pickupAudio: AudioClip;
public var buttonAudio: AudioClip;
public var goAudio: AudioClip;
private var Level: int;
public var brokenMaterialChange : GameObject;
public var establishCam: Camera;
public var playerCam: Camera;
private var seconds:float = 2  ;
private var starting: int =0;
public var leaderboarID: String = "com.LostBot.LeaderBoard";



function Start(){
	establishCam.enabled=true;
    playerCam.enabled=false;  
    starting=1; 
	guiMode = "InGame";
	sugarcubes = GameObject.FindGameObjectsWithTag("cubes"); 
	totalCubes = sugarcubes.length;
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
	Level = Application.loadedLevel;
	if (Level ==  1){
		PlayerPrefs.SetInt("saved score", 0);
	}
	CurrentScore = PlayerPrefs.GetInt("saved score");
	scoreKeeper.score = CurrentScore;
	reportScore();



}
function Update()
{
	if(Input.GetKeyDown("escape")){
		Time.timeScale = 0;
		guiMode = "Paused";
	}
	if (starting==1){
		seconds -= 1 * Time.deltaTime;
		if (seconds <= 0){
			startGame();
		}


	}


	
}
function startGame(){
		establishCam.enabled=false;
    	playerCam.enabled=true; 
    	starting = 2;
    	audio.PlayOneShot(goAudio);
  
}
function OnGUI()
{
	GUI.skin = customSkin;
	if (guiMode ==  "InGame"){
		IadContoller.show = false;
	}
	if(guiMode == "Paused"){
		changeMaterial.SlowTimer = false;
		changeMaterial.displayTimer = false;
		IadContoller.show = false;
		drawBG();
		currentScoreText();
		highScoreText();
		resume();
		Quit();
	}
	if(guiMode == "GameOver"){
		changeMaterial.SlowTimer = false;
		changeMaterial.displayTimer = false;
		brokenMaterialChange.GetComponent(changeMaterial).Broken();
		IadContoller.show = true;
		drawBG();
		currentScoreText();
		highScoreText();
		reportScore();
		Retry();
		Quit();
	}	
	if(guiMode == "Success"){
		changeMaterial.SlowTimer = false;
		changeMaterial.displayTimer = false;
		CharacterControl.frozen = true;
		IadContoller.show = true;
		saveScore();
		drawBG();
		currentScoreText();
		highScoreText();
		reportScore();
		NextLevel();
		Quit();
	}
}
function drawBG(){
	GUI.DrawTexture(new Rect(Screen.width/2 - 280, Screen.height/2 - 280, 580, 580), GuiBackground);
}
function PickedUP(){
	numPicked++;
	audio.PlayOneShot(pickupAudio);
	if (numPicked == totalCubes){
		guiMode = "Success";
	}
}
function Quit(){
	if (GUI.Button(Rect(Screen.width/2-100,Screen.height/2+50,200,200),"Quit")){
		audio.PlayOneShot(buttonAudio);
		Time.timeScale = 1;
		Application.Quit();	
	}

}
function NextLevel(){
	if (GUI.Button(Rect(Screen.width/2-100,Screen.height/2-130,200,200),"Next Level"))
	{
		guiMode = "InGame";
		audio.PlayOneShot(buttonAudio);
		Application.LoadLevel(Level + 1);
	}
}
function resume(){
	if (GUI.Button(Rect(Screen.width/2-100,Screen.height/2-130,200,200),"Resume")){
		Time.timeScale = 1;
		audio.PlayOneShot(buttonAudio);
		guiMode = "InGame";
	}
}
function Retry(){
	if (GUI.Button(Rect(Screen.width/2-100,Screen.height/2-130,200,200),"Retry"))
	{
		guiMode = "InGame";
		audio.PlayOneShot(buttonAudio);
		Application.LoadLevel(Application.loadedLevel);
	}
}
function highScoreText(){
	highScore = PlayerPrefs.GetInt("Player Score");
	if (CurrentScore > highScore){
		PlayerPrefs.SetInt("Player Score", CurrentScore);
	}
	GUI.Label(new Rect(Screen.width/2 -160 ,Screen.height/2 -220 ,500,75),"High Score  " + highScore.ToString("f0"));

}
function currentScoreText(){
	GUI.Label(new Rect(Screen.width/2 -160 ,Screen.height/2 -180 ,500,75),"Current Score  " + CurrentScore.ToString("f0"));
}
function saveScore(){
	PlayerPrefs.SetInt("saved score", CurrentScore);

}
function reportScore(){
	highScore = PlayerPrefs.GetInt("Player Score");
	coffeeUPGameCenter.Score(leaderboarID,highScore);
}
