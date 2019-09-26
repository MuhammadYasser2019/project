/* iTi Fish Hunter */

function start() {

    var audio = new Audio('Eating.mp3');      // yasser
    var audio2 = new Audio('underwater.mp3');  // yasser
    var audio3 = new Audio('SoundGameOver.mp3'); //yasser
    var audio4 = new Audio('cup.mp3'); //yasser

    var anim_id;
    var container = document.getElementById('container'); 
    var fish = document.getElementById('fish'); 
    var fishImg = document.getElementById('myFish');
    
    // for selecting character 
    fishImg.src = localStorage.getItem("selected_character");
    
    var levelNum = document.getElementById("levelNum"); 

    var fish_1 = document.getElementById('fish_1'); 
    var fish_2 = document.getElementById('fish_2'); 
    var fish_3 = document.getElementById('fish_3');
    var fish_4 = document.getElementById("fish_4"); 
    var fish_5 = document.getElementById("fish_5");
    var fish_6 = document.getElementById("fish_6");

    var shark1 = document.getElementById("shark1");
    var shark3 = document.getElementById("shark3");
    var diamond = document.getElementById('diamond'); 
    var pearl = document.getElementById('pearl'); 
     
    var restart_div =  document.getElementById('restart_div');
    var restart_btn =  document.getElementById('restart'); 
    var win_div =  document.getElementById('win_div');
    var win_btn =  document.getElementById('win_restart'); 

    var score = document.getElementById('score');
    var high_score = localStorage.getItem('high_score');
    
    document.getElementById('high_score').innerText = high_score;
    
    //saving some initial setup

    var container_left = parseInt(container.offsetLeft);
    var container_width = parseInt(container.offsetWidth);
    var container_height = parseInt(container.offsetHeight); 
    var fish_width = parseInt(fish.offsetWidth); 
    var fish_height = parseInt(fish.offsetHeight); 

    //some other declarations
    var game_over = false;

    var score_counter = 1;
    var count  = 0;   // for eating fish counter  
    var StagingCounter = 0;
    
    var speed = 2;
    var appear = 0; //to control appearin elements for once

    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;

    /* ------------------------------GAME CODE STARTS HERE------------------------------------------- */

    /* Move the fishes */
    document.addEventListener('keydown' , function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });
    
    document.addEventListener('keyup' , function(e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });


    function left() {
        if (game_over === false && parseInt(fish.offsetLeft) > 0) {
            fish.style.left = parseInt(fish.offsetLeft) - 8 + "px"
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {

        if (game_over === false && parseInt( fish.offsetLeft ) < container_width - fish_width) {
            fish.style.left = parseInt(fish.offsetLeft) + 8 +"px";
            move_right = requestAnimationFrame(right);
           
        }
    }

    function up() {
        if (game_over === false && parseInt(fish.offsetTop) > 0 ) {
            fish.style.top = parseInt(fish.offsetTop) - 3 + "px";
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (game_over === false && parseInt(fish.offsetTop) < container_height - fish_height) {
            fish.style.top = parseInt(fish.offsetTop) + 3 + "px";
            move_down = requestAnimationFrame(down);
        }
    }

    /* Start the smooth moving */
    anim_id = requestAnimationFrame(repeat);
  
    /* Hide some elements to be used later */
    fish_4.style.display = "none";
    
    //to be shown in the 2nd level
    fish_5.style.display = "none";  
    shark1.style.display = "none";  

    //to be shown in the last level
    fish_6.style.display = "none";  
    shark3.style.display = "none";  
    pearl.style.display = "none"; 
    
    function repeat() {
     
        //level 1
        if (count >=0 && count <= 50){
            levelNum.innerHTML = "1";
        }

        //level 2
        if(count >=51 && count <= 100){
            levelNum.innerHTML = "2";

            //To display it once;
            if(appear == 0){
                fish_5.style.display = "block";
                shark1Fun(); 
                appear++;
            }
           
        }

        //level 3
        if(count >=101 && count <= 150){
            levelNum.innerHTML = "3";
            if(appear == 1){
                pearl.style.display = "block";
                fish_6.style.display = "block";
                shark2Fun();
                appear++;
            }
            
        }

        //The cup
        if(count>150){
            levelNum.innerHTML = "Win";
            the_end();
            
        }


        //enemy collisions
        if (collision(fish, fish_4) || collision(fish, shark1) || collision(fish, shark3) ){
            stop_the_game()
            return;
        }

         audio2.play();  // yasser


        if (collision(fish, fish_1)){
            fish_1.style.display = "none";  
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";
            setTimeout (audio.play() , 50) // yasser

            
            setTimeout(() => {
                fish_1.style.display = "block";
            }, 2000);
            count++;
            score.innerText = count;   
        }

        //Friendly Collisions
        if (collision(fish, fish_2)){
            fish_2.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";

            setTimeout (audio.play() , 50) ;// yasser

            
            setTimeout(() => {
                fish_2.style.display = "block";
            }, 2000);
            count++;
            score.innerText = count; 
        }


        if (collision(fish, fish_3)){
            fish_3.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";

            setTimeout (audio.play() , 50) ;// yasser


            setTimeout(() => {
                fish_3.style.display = "block";
            }, 2500);
            count++;
            score.innerText = count;
        }

        if (collision(fish, fish_5)){
            fish_5.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";
            setTimeout (audio.play() , 50) ;// yasser

            setTimeout(() => {
                fish_5.style.display = "block";
            }, 3500);
            count++;
            score.innerText = count;
        }

        if (collision(fish, fish_6)){ 
            fish_6.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";

            setTimeout (audio.play() , 50) ;// yasser

            setTimeout(() => {
                fish_6.style.display = "block";
            }, 6000);
            count +=2;
            score.innerText = count;
        }


        if (collision(fish, diamond)){
            diamond.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 1 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 1 +"px";

            setTimeout (audio.play() , 50) ;// yasser

            
            setTimeout(() => {
                diamond.style.display = "block";
            }, 8000);
            count +=3;
            score.innerText = count;
        }

        if (collision(fish, pearl)){
            pearl.style.display = "none";
            fishImg.style.width = parseInt(fishImg.offsetWidth) + 3 +"px";
            fishImg.style.height = parseInt(fishImg.offsetHeight) + 3 +"px";

            setTimeout (audio.play() , 50) ;// yasser

            
            setTimeout(() => {
                pearl.style.display = "block";
            }, 15000);
            count +=5;
            score.innerText = count;
        }


        //For Controlling the Speed
        score_counter++;
        if (score_counter % 1600 == 0 ) {
            speed++;     
        }

        //Friends
        fish_down(fish_1);
        fish_down(fish_2);
        fish_down(fish_3);
        fish_down(diamond);
        fish_down(fish_5);
        fish_down(pearl);
        fish_down(fish_6);


        // Enemy
        fish_down(shark1);
        fish_down(fish_4);
        fish_down(shark3);

        //this is for the first shark executed automatically
        setInterval(() => {
            fish_4.style.display = "block";
        }, 4000);

        function shark1Fun()
        {
            setInterval(() => {
                shark1.style.display = "block";
            }, 7000);

        }
            function shark2Fun()
        {
            setInterval(() => {
                shark3.style.display = "block";
            }, 10000);
        }
          
        //To continuosly respond on pressing the key
        anim_id = requestAnimationFrame(repeat);
    }



    function fish_down(fish) {
        var fish_current_top = parseInt(fish.offsetTop);
        if (fish_current_top > container_height) {
            fish_current_top = -200;
            var fish_left = parseInt(Math.random() * (container_width - fish_width));
            fish.style.left = fish_left + "px";
        }
        fish.style.top = fish_current_top + speed +"px";
    }

    restart_btn.onclick = function() {
        location.reload();
    };

    win_btn.onclick = function() {
        location.reload();
    };

    

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        audio2.pause(); //yasser
        audio3.play(); //yasser
        restart_div.style.display = "block";
        restart_btn.focus();
        setHighScore();
    }

    function the_end() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        audio2.pause(); //yasser

        win_div.style.display = "block";
        win_btn.focus();
        setTimeout (audio4.play() , 4000)//yasser

        setHighScore();
    }

    

    function setHighScore() {
        if (high_score < parseInt(score.innerText)) {
            high_score = parseInt(score.innerText);
            localStorage.setItem('high_score', parseInt(score.innerText));
        }
        document.getElementById('high_score').innerText = high_score;
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */
    
    //Some Outer size JavaScript Functions
    function outerHeight(el) {
        var height = el.offsetHeight;
        var style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        return height;
    }

    function outerWidth(el) {
        var width = el.offsetWidth;
        var style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        return width;
    }

    function collision(div1, div2) {
        var x1 = div1.offsetLeft;
        var y1 = div1.offsetTop;
        var h1 = outerHeight(div1);
        var w1 = outerWidth(div1);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = div2.offsetLeft;
        var y2 = div2.offsetTop;
        var h2 = outerHeight(div2);
        var w2 = outerWidth(div2);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

}

start();


