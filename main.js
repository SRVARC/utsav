song_1 = "music.mp3";
song_2 = "music2.mp3";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreleftwrist = 0;
scorerightwrist = 0;
Status_1="";
Status_2="";

function preload()
{
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function draw()
{
    image(video,0,0,600,500);
    Status_1 = song_1.isPlaying();
    Status_2 = song_2.isPlaying();
    

    fill("red");
    stroke("red");

    if( scorerightwrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song_2.stop();

        if(Status_1 == false)
        {
            song_1.play();
            document.getElementById("Song_Name").innerHTML = "Playing song 1";
        }
    }
    if( scoreleftwrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song_1.stop();
    

    if(Status_2 == false)
    {
        song_2.play();
        document.getElementById("Song_Name").innerHTML = "Playing song 2";
    }
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist" + scoreleftwrist + "scoreleftwrist" + scoreleftwrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY =" + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY);
    }
}