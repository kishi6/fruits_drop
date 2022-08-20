//キャンパスのサイズ
var canvasSize = 3000;

//スプライトの変数
var hole;
var apple;
var grape;
var pear;
var suika;
var fruitsGroup;
var sunadokei;
var speed;
var itemsGroup;

//ホールの画像
var holeImage;
var pointerImage;
var sunadokeiImage;
var speedImage;
// フルーツの画像
var appleImage;
var grapeImage;
var pearImage;
var suikaImage;

//ゲーム管理の変数
var moveSpeed = 10;
var fruitsCount = 0;
var fruitsCatch;
var gameMode;
var score;
var timer;
var frame;

// サウンドの変数
var gameFinishSound;
var levelupSound;
//var bgmSound;



function preload() {
    //画像の読み込み
    holeImage = loadImage('./img/hole.png');
    pointerImage = loadImage('./img/scoreView.png');
    sunadokeiImage = loadImage('./img/sunadokei.png');
    speedImage = loadImage('./img/speed.png');
    // フルーツの読み込み
    appleImage = loadImage('./img/apple.png');
    grapeImage = loadImage('./img/grape.png');
    suikaImage = loadImage('./img/suika.png');
    pearImage = loadImage('./img/pear.png');
    //サウンドの読み込み
    gameFinishSound = loadSound('./sound/game_finish.mp3');
    levelupSound = loadSound('./sound/levelup.mp3');
    //bgmSound = loadSound('./sound/bgm.mp3');
}

function setup() {
    //キャンバスを作る
    createCanvas(windowWidth, windowHeight);
    //スプライトを作る
    hole = createSprite(0, 300, 500, 500);
    hole.setCollider('circle');
    hole.scale = 0.7;
    //画像をスプライトに張り付ける
    hole.addImage(holeImage);
    // 当たり判定用にフルーツとアイテムのグループを作る
    fruitsGroup = new Group();
    itemsGroup = new Group();


    // フルーツを作る
    for (var i = 0; i < 20; i++) {
        apple = createSprite(random(canvasSize), random(canvasSize));
        grape = createSprite(random(canvasSize), random(canvasSize), 100, 100);
        pear = createSprite(random(canvasSize), random(canvasSize), 300, 300);
        suika = createSprite(random(canvasSize), random(canvasSize), 500, 500);

        // 画像をスプライトに付ける
        apple.addImage(appleImage);
        grape.addImage(grapeImage);
        pear.addImage(pearImage);
        suika.addImage(suikaImage);


        // 画像の大きさを変える(いらないかも)
        apple.scale = 0.5;
        grape.cale = 0.7;
        pear.scale = 1;
        suika.scale = 1.5;

        //衝突判定確認用のコード
        //    hole.debug = true;
        //    apple.debug =true;
        //    pear.debug =true;
        //    grape.debug =true;
        //    suika.debug =true;


        //フルーツの衝突基準
        apple.setCollider('circle');
        pear.setCollider('circle');
        grape.setCollider('circle')
        suika.setCollider('circle')

        // それぞれのフルーツをフルーツのグループに追加する
        fruitsGroup.add(apple);
        fruitsGroup.add(grape);
        fruitsGroup.add(pear);
        fruitsGroup.add(suika);
    }
    //アイテムをつくる
   for (var i = 0; i < 3; i++) {
    sunadokei = createSprite(random(canvasSize), random(canvasSize));
    speed = createSprite(random(canvasSize), random(canvasSize), 100, 100);


    // 画像をスプライトに付ける
    sunadokei.addImage(sunadokeiImage);
    speed.addImage(grapeImage);

    // 画像の大きさを変える(いらないかも)
    sunadokei.scale = 0.5;
    speed.cale = 0.7;

    //衝突判定確認用のコード
    //    hole.debug = true;
    //    apple.debug =true;
    //    pear.debug =true;
    //    grape.debug =true;
    //    suika.debug =true;


    //フルーツの衝突基準
    sunadokei.setCollider('circle');
    speed.setCollider('circle');

    // それぞれのフルーツをフルーツのグループに追加する
    itemsGroup.add(sunadokei);
    itemsGroup.add(speed);



  }
    // ゲームモードを初期化
    gameMode = 'gamePlaying';

    // 曲をループ再生
    //bgmSound.loop();

    // 文字の設定
    fill(250);
    textFont('Paytone One');
    textStyle(BOLD);

    // スコアやタイマーの変数を初期化
    score = 0;
    timer = 35;
    frame = 0;

    camera.zoom *= 0.5;


}


function draw() {

    //キャンバスを塗りつぶす
    background(100);

    // ゲームモードで動作を変える
    switch (gameMode) {
        case 'gamePlaying':
            // ゲームプレイの処理（しょり）
            gamePlaying();
            break;
        case 'gameCompleted':
            // フルーツを集め終わった時の処理
            gameCompleted();
            break;
    }

    //スプライトを表示させる
    drawSprites();
    // カメラの影響をなくす
    camera.off();

    // フルーツのカウンターを表示
    //image(pointerImage, width - 500, 10);
    // カウンターの数字を表示
    // スコアとタイマー表示
    textSize(50);
    text('SCORE', width - 400, 200);
    text('TIME', width - 400, 300);
    textSize(60);
    text(score, width - 200, 200);
    text(timer, width - 200, 300);



    // フルーツを集め終わっていたら「GameFinish」を表示
    if (gameMode == 'gameCompleted') {
        textSize(150);
        textAlign(CENTER);
        text('GameFinish', width / 2, height / 2);
        text('score', width / 2 - 150, height / 2 + 200);
        text(score, width / 2 + 200, height / 2 + 200);
    }
}


// ゲームプレイの処理
function gamePlaying() {
    
    if (keyDown('RIGHT')) { //右矢印を押したとき
        //速度を10にする
        hole.position.x += moveSpeed;
    } else if (keyDown('LEFT')) {//左矢印を押したとき
        //速度を-10にする
        hole.position.x += -moveSpeed;
    } else if (keyDown('UP')) {    //上矢印を押したとき
        hole.position.y += -moveSpeed;
    } else if (keyDown('DOWN')) {//下矢印を押したとき
        hole.position.y += moveSpeed;
    }
    if (hole.position.x > canvasSize + 200) { //右からはみ出ないように
        hole.position.x = canvasSize + 200;
    } else if (hole.position.x < -200) {  //左からはみ出ないように
        hole.position.x = -200;
    }
    if (hole.position.y > canvasSize + 200) { //下からはみ出ないように
        hole.position.y = canvasSize + 200;
    } else if (hole.position.y < -200) {  //上からはみ出ないように
        hole.position.y = -200;
    }


    // カメラをホールの位置に合わせる
    camera.position.x = hole.position.x - 180;
    camera.position.y = hole.position.y - 180;


    // あたり判定
    hole.overlap(fruitsGroup, fruitsCatch);
    hole.overlap(itemsGroup,itemsCatch);





    // １秒毎にタイマーを減らす
    if (frame++ >= 60) {
        if (timer > 0) {
            timer--;
        }
        frame = 0;
    }



    //フルーツを集めたらゲーム終了
    if (timer == 0) {
        gameMode = 'gameCompleted';
        gameFinishSound.play();

    }
}

// フルーツを拾う
function fruitsCatch(hole, fruits) {
    // フルーツを消す
    // |x座標の中心間距離|<holeの半径-fruitsの半径かつ
    // |y座標の中心間距離|<holeの半径-fruitsの半径のとき
    // if (Math.abs(fruits.position.x-hole.position.x)<(hole.width*hole.scale - fruits.width)/2||
    // Math.abs(fruits.position.y-hole.position.y)<(hole.height*hole.scale - fruits.height)/2){
    //    if((fruits.position.x+fruits.width*fruits.scale/2-hole.position.x-hole.width*hole.scale/2)**2+(fruits.position.y+fruits.height*fruits.scale/2-hole.position.y-hole.height*hole.scale/2)**2<((hole.width*hole.scale - fruits.width*fruits.scale)/2)**2){

    //半径での衝突条件
    // if((fruits.position.x-hole.position.x)**2+(fruits.position.y-hole.position.y)**2<((hole.width*hole.scale - fruits.width*fruits.scale)/2)**2||fruits.radius<hole.radius){

    if ((fruits.position.x - hole.position.x) ** 2 + (fruits.position.y - hole.position.y) ** 2 < ((hole.width * hole.scale - (fruits.width - 20) * fruits.scale) / 2) ** 2 && fruits.width * fruits.scale < hole.width * hole.scale) {
        fruits.remove();
        // 拾ったフルーツの数を数える
        fruitsCount++;
        score += 1;
        if (fruitsCount == 10) {
            //  hole.width += 25;
            //  hole.height += 25;
            levelupSound.play();
            hole.scale += 0.5;
            camera.zoom *= 0.9;
            fruitsCount = 0;

        }

    }
}

// アイテムを拾う
function itemsCatch(hole, items) {
    if (items == speed){
        moveSpeed = 20;
        items.remove();
        // setTimeout(moveSpeed = 10, 7000);
    }
    if(items == sunadokei){
        timer += 5;
        items.remove();
        // setTimeout(text('+5', width - 100, 300), 5000);
    } 


}



// ゲーム終了
function gameCompleted() {
    // ホールは動かさない
    hole.position.x = 0;
    hole.position.y = 0;
}
