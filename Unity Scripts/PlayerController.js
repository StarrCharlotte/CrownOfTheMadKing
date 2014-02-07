#pragma strict

var speed : float = 4;
var jumpHeight : float = 5;

var superSpeed : float = 10;
var superSpeedTime : float = 5;

var health : int = 1;

private var superSpeedOn : boolean = false;
private var superSpeedElapsed : float = 0;

function FixedUpdate () {
	
	//Handle the horizontal movement of the player
	if(superSpeedOn == true) {
		rigidbody.velocity.x = superSpeed * Input.GetAxis("Horizontal");
		
		//Add to elapsed time
		superSpeedElapsed += Time.fixedDeltaTime;
		
		//Check if required time has passed
		if(superSpeedElapsed >= superSpeedTime) {
			superSpeedOn = false;
		}
		
	}else{
		rigidbody.velocity.x = speed * Input.GetAxis("Horizontal");
	}
	
	//Handle the jumping for the player
	if(Input.GetButton("Jump") && IsGrounded()) {
		rigidbody.velocity.y = jumpHeight;
	}
	
	//Check if we are hitting the sides of an object
	var distance : float = rigidbody.velocity.magnitude * Time.fixedDeltaTime;
	var hit : RaycastHit;
	
	if(rigidbody.SweepTest(rigidbody.velocity, hit, distance)) {
		//Stop moving
		rigidbody.velocity.x = 0;
	}
}

function IsGrounded() {
	//Fire araycast to check for the ground
	return Physics.Raycast(transform.position, Vector3.down, collider.bounds.extents.y + 0.01);
}

function Hit() {
	//Remove one hit point and check if we're dead
	health -= 1;
	if(health == 0) {
		Debug.Log("You are dead!");
		Destroy(gameObject);
	}
}

function OnCollisionEnter(collision : Collision) {
	//Check if we hit an object that can hurt us
	if(collision.gameObject.tag == "Hurt") {
		Hit();
	}
}

function SuperSpeed() {
	//Turn on super speed
	superSpeedOn = true;
	superSpeedElapsed = 0;
}
