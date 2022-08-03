var sp;

function setup() {
    createCanvas(500, 300);
    // Spriteオブジェクトを(100,50)の位置に、100 x 50のサイズで作成する。
    sp = createSprite(100, 50, 100, 50);
}

function draw() {
    background(100);
    // Spriteオブジェクトspを描画する
    drawSprite(sp);
    ellipse(100,100,100);
    fill(100);
}