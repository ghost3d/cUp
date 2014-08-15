#pragma strict
public var customSkin : GUISkin;
public var PLayTexture: Texture;
public var LeaderBoardTexture: Texture;
public var buttonAudio: AudioClip;
private var usingGoogle: boolean;
private var ButtonSize: float = 460;
private var screenPossition: float = 140;
private var screenHieght: float = 9;


function OnGUI()
{
	GUI.skin = customSkin;
	if(!PLayTexture){
		Debug.LogError ("please assign button texture");
		return;
	}	
	if (Screen.width <= 1024){
		ButtonSize = 210;
		screenPossition = 110;

	}
	if(Screen.width >= 1136) {
		screenHieght = 6;
	}

	if (GUI.Button(Rect(Screen.width/screenHieght,Screen.height/2-screenPossition,ButtonSize,ButtonSize),PLayTexture)){
		audio.PlayOneShot(buttonAudio);
		Application.LoadLevel ("Level001");
	}
	#if UNITY_IPHONE
	if (GUI.Button(Rect(Screen.width/screenHieght,Screen.height/2+screenPossition,ButtonSize,ButtonSize),LeaderBoardTexture)){
		audio.PlayOneShot(buttonAudio);
		Social.ShowLeaderboardUI();
	}
	#endif

}