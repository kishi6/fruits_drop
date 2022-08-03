
var img;// 画像データを格納する変数
var tanuki;// スプライトを格納する変数
function preload(){
   img = loadImage('img/hole.png');// 1, 画像データをロードします
}

function setup(){
   createCanvas(1280, 1280);
   tanuki =createSprite(300,300,100,100);// 2-1, スプライトを作ります
   tanuki.addImage(img);// 2-2, イメージデータを適用します
}

function draw(){
   background(100);
   drawSprites();// 3, スプライトを描画します
}