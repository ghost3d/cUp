#pragma strict
static var moving: boolean = false;



function Update(){
	if (moving == true){
		animation.Play("moving");

	}
	else{
		animation.Stop();
	}

	
}
