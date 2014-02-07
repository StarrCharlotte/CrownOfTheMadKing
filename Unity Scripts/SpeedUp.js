#pragma strict

function OnTriggerEnter(collider : Collider) {
	//Check if the player has hit
	if(collider.gameObject.tag == "Player") {
		//Turn on superSpeed and destroy the object
		GameObject.Find("Player").SendMessage("SuperSpeed");
		Destroy(gameObject);
	}
}