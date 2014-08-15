#pragma strict
public var changeScript : GameObject;





function OnTriggerEnter(other : Collider)

{

	if (other.gameObject.CompareTag("Hero")){
		changeScript.GetComponent(changeMaterial).BoostSpeed();
		Destroy (gameObject);

	}
	

}
