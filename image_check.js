//画像出力確認
let img;
// setup()より先に呼び出される
function preload() {
    img = loadImage('img/hole.png');
}

function setup() {
    // 読み込む画像のサイズは480 x 240
    createCanvas(1280, 1280);
}

// イメージをキャンバスに描画する
function draw() {
    image(img, 0, 0);
}