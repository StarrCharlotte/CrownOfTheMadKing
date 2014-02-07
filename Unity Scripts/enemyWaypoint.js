#pragma strict

var waypoint : Transform[]; //create array of transforms, holds waypoints
var speed : float = 2; //var to control speed of enemy
private var currentWaypoint : int; //hold value of current waypoint

function Update () {
	if(currentWaypoint < waypoint.Length) {
		var target : Vector3 = waypoint[currentWaypoint].position;
		var moveDirection : Vector3 = target - transform.position;
		var velocity = moveDirection.normalized * speed;
		
		if(moveDirection.magnitude < 1) {
			currentWaypoint++;
		}
		
	} else {
		currentWaypoint = 0; //reset waypoint to 0, i.e. start over
	}
	
	rigidbody.velocity = velocity;
}