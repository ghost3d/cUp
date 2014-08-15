#pragma strict
@script RequireComponent(AudioSource)
public var GUI: inGameGUI;


function Start()
{
	GUI = GameObject.FindWithTag("GUI").GetComponent(inGameGUI);

}

function OnTriggerEnter(other : Collider)

{
	if (other.gameObject.CompareTag("Hero")){
		Destroy(gameObject);
		scoreKeeper.score++;
		inGameGUI.CurrentScore++;
		GUI.PickedUP();


		

	}
	

}

