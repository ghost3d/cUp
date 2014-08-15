#pragma strict
static var speed:float;
private var alive: boolean =true;
static var frozen: boolean=false;

function Start () {
	alive = true;
	speed = 350;
	frozen = false;

}

function Update () {
	var dir : Vector3 = Vector3.zero;
	dir.x	=	Input.acceleration.x;
	dir.z 	=	Input.acceleration.y;
	if (dir.sqrMagnitude > 1){
		dir.Normalize();
	}
	dir *=Time.deltaTime;
	if (alive == true){
			rigidbody.AddForce (dir * speed);
	}
	if (alive == false){
		inGameGUI.guiMode = "GameOver";
	}
	
	if (dir.x != 0){
			playAnimation.moving = true;
		}
		else if (dir.z != 0){
			playAnimation.moving = true;
		}
		else{
			playAnimation.moving = false;
		}
	if (frozen == true){
		freeze();
	}

}



function OnCollisionEnter(other: Collision){
	if (other.gameObject.CompareTag("wall")){
		alive = false;
		freeze();


	}
}

function slowDown(){
	rigidbody.drag = 2;

}
function speedUP(){
	rigidbody.drag = 0;
}
function freeze(){
	rigidbody.constraints = RigidbodyConstraints.FreezeAll;
}