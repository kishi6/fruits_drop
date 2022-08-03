//キャンパスのサイズ
var canvasSize = 2560;

//スプライトの変数
var hole;
var apple;
var grape;
var pear;
var suika; 
var fruitsGroup;

//ホールの画像
var holeImage;
// フルーツの画像
var appleImage;
var grapeImage;
var pearImage;
var suikaImage;

//ゲーム管理の変数
var fruitsCount = 0;
var fruitsCatch;

function preload(){
   //画像の読み込み
   holeImage = loadImage('./img/hole.png');
   // フルーツの読み込み
    appleImage= loadImage('./img/apple.png');
    grapeImage= loadImage('./img/grape.png');
    suikaImage= loadImage('./img/suika.png');
    pearImage = loadImage('./img/pear.png');
    
}

function setup(){
   //キャンバスを作る
   createCanvas(canvasSize ,canvasSize);
   //スプライトを作る
   hole = createSprite(300, 300,50,50);
   hole.scale = 1;
   //画像をスプライトに張り付ける
   hole.addImage(holeImage);
   
   // 当たり判定用にフルーツのグループを作る
   fruitsGroup = new Group();
   
   
   // フルーツを作る
   for(var i = 0; i < 20; i++){
       apple = createSprite(random(canvasSize), random(canvasSize),30,30);
       grape = createSprite(random(canvasSize), random(canvasSize),45,45);
        pear  = createSprite(random(canvasSize), random(canvasSize),70,70);
        suika = createSprite(random(canvasSize), random(canvasSize),100,100);

       // 画像をスプライトに付ける
       apple.addImage(appleImage);
       grape.addImage(grapeImage);
       pear.addImage(pearImage);
       suika.addImage(suikaImage);


       // 画像の大きさを変える(いらないかも)
       //apple.scale = 0.2;
       //grape.cale  = 0.3;
       //pear.scale  = 0.4;
       //suika.scale = 0.6;
       
       // それぞれのフルーツをフルーツのグループに追加する
       fruitsGroup.add(apple);
       fruitsGroup.add(grape);
       fruitsGroup.add(pear);
       fruitsGroup.add(suika);
   }
   


}

function draw(){
   //キャンバスを塗りつぶす
   background(100);
   //スプライトを表示させる
   drawSprites(); 
   //ホールの操作
   holeControl();
   // あたり判定
   hole.overlap(fruitsGroup, fruitsCatch);
  // カメラをホールの位置に合わせる
  camera.position.x = hole.position.x - 180;
  camera.position.y = hole.position.y - 180;
}


// ホールのコントロール
function holeControl(){
   if(keyDown('RIGHT')){ //右矢印を押したとき
       //速度を10にする
       hole.position.x += 10;
   }else if(keyDown('LEFT')){//左矢印を押したとき
       //速度を-10にする
       hole.position.x += -10;
   }else if(keyDown('UP')){    //上矢印を押したとき
       hole.position.y += -10; 
   }else if(keyDown('DOWN')){//下矢印を押したとき
       hole.position.y += 10;
   }
   if(hole.position.x > canvasSize- 30){ //右からはみ出ないように
       hole.position.x = canvasSize-30 ; 
   } else if(hole.position.x < 30){  //左からはみ出ないように
       hole.position.x = 30;
   }
}
// フルーツを拾う
function fruitsCatch(hole, fruits) {
    // フルーツを消す
    // |x座標の中心間距離|<holeの半径-fruitsの半径かつ
    // |y座標の中心間距離|<holeの半径-fruitsの半径のとき
    // if (Math.abs(fruits.position.x-hole.position.x)<(hole.width*hole.scale - fruits.width)/2||
    // Math.abs(fruits.position.y-hole.position.y)<(hole.height*hole.scale - fruits.height)/2){
    if((fruits.position.x-hole.position.x)**2+(fruits.position.y-hole.position.y)**2<((hole.width*hole.scale - fruits.width)/2)**2){
        fruits.remove();
        // 拾ったフルーツの数を数える
        fruitsCount++;
        if (fruitsCount==7){
            //  hole.width += 25;
            //  hole.height += 25;
             hole.scale += 0.5
            fruitsCount =0;
        }
    
}
}
