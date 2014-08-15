#pragma strict
public var heroPos : Transform;
public var myCamera: Transform;
function Start () {
	
}

function Update () {
	myCamera.position = heroPos.position;
}