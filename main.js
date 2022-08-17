var objects = []
var status = ""
function preload() {
    video = createVideo("video.mp4")
}

function setup() {
    canvas = createCanvas(500, 400)
    //canvas.center()
    video.hide()
}

function draw() {
    image(video, 0, 0, 500, 400)
    if(status!=""){
    objectDetector.detect(video,gotResults)
    document.getElementById("status").innerHTML="Objects Detected"
    document.getElementById("numberOfObjects").innerHTML="Number of objects detected-"+ objects.length;
    for(var i=0; i<objects.length; i++){
        percent=floor(objects[i].confidence*100)
        noFill()
        stroke("red")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        fill("red")
        text(objects[i].label+" "+percent + "%", objects[i].x +15, objects[i].y +15)
    }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        objects=results
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML="Detecting Objects";
}

function modelLoaded() {
    console.log("Model has loaded")
    video.loop()
    video.speed(1)
    video.volume(0)
    status = true
}