#pragma strict
static var score: int;
public var customSkin : GUISkin;


function OnGUI()
{
	GUI.skin = customSkin;
	GUI.Label(new Rect(50,30,300,75),"Score  " + score.ToString("f0"));
}