// スプライトの変数
var pooh;
var balloon;
var honeyGroup;

// 画像の変数
var poohImage;
var balloonImage;
var woodImage;
var honeyImage;
var honeyCounterImage;



// ゲーム管理の変数
var woodHeight = 736;
var honeyCount;
var gameMode;

// 画像とのロード
function preload() {
  poohImage = loadImage('./img/hole.png');
  balloonImage = loadImage('./img/apple.png');
  woodImage = loadImage('./img/suika.png');
  honeyImage = loadImage('./img/grape.png');
  honeyCounterImage = loadImage('./img/pear.png');

}

// 全体の初期化
function setup() {
  // キャンバスを作る
  createCanvas(600, windowHeight);

  // 木を並べる
  for (var i = 0; i < 10; i++) {
    // 木のスプライトを作る
    var wood = createSprite(width / 2, height / 2 - i * woodHeight, 600, woodHeight);
    // スプライトに木の画像を追加する
    wood.addImage(woodImage);
  }

  // プーさんのスプライトを作る
  pooh = createSprite(width / 2, height / 2);
  // スプライトにプーさんの画像を追加する
  pooh.addImage(poohImage);
  // 風船のスプライトを作る
  balloon = createSprite(width / 2, height / 2 - 110);
  // スプライトに風船の画像を追加する
  balloon.addImage(balloonImage);

  // ハチミツを作る
  // 当たり判定用にハチミツのグループを作る
  honeyGroup = new Group();
  for (var i = 0; i < 20; i++) {
    // ハチミツのスプライトを作る
    var honey = createSprite(random(50, width - 50), 100 - i * 500);
    // スプライトにハチミツの画像を追加する
    honey.addImage(honeyImage);
    // ハチミツをハチミツのグループに追加する
    honeyGroup.add(honey);
  }

  // ハチミツの数をゼロにする
  honeyCount = 0;

  // ゲームモードを初期化
  gameMode = 'gamePlaying';



  // 文字の設定
  fill(250);
  textFont('Paytone One');
  textStyle(BOLD);
}

// ゲームの進行と表示
function draw() {
  // 背景の色で塗りつぶす
  background(200, 220, 230);

  // ゲームモードで動作を変える
  switch (gameMode) {
    case 'gamePlaying':
      // ゲームプレイの処理（しょり）
      gamePlaying();
      break;
    case 'gameCompleted':
      // ハチミツを集め終わった時の処理
      gameCompleted();
      break;
  }

  // 全てのスプライトを描く
  drawSprites();

  // カメラの影響をなくす
  camera.off();

  // ハチミツのカウンターを表示
  image(honeyCounterImage, width - 145, 10);
  // カウンターの数字を表示
  textSize(40);
  textAlign(RIGHT);
  text(honeyCount, width - 40, 88);

  // ハチミツを集め終わっていたら「COMPLETED」を表示
  if (gameMode == 'gameCompleted') {
    textSize(90);
    textAlign(CENTER);
    text('COMPLETED', width / 2, height / 2);
  }
}


// ゲームプレイの処理
function gamePlaying() {
  // プーさんを上に移動させる
  pooh.velocity.y = -1;

  // プーさんを横に移動させる
  pooh.velocity.x += (mouseX - pooh.position.x) * 0.00005;

  // プーさんが画面の左端に触れたら
  if (pooh.position.x < 0) {
      // 左端を越えない
      pooh.position.x = 0;
      pooh.velocity.x = 0;
  }
  // プーさんが画面の右端に触れたら
  if (pooh.position.x > width) {
      // 右端を越えない
      pooh.position.x = width;
      pooh.velocity.x = 0;
  }

  // 風船をプーさんの位置に合わせる
  balloon.position.y = pooh.position.y - 110;
  balloon.position.x = pooh.position.x;

  // カメラをプーさんの位置に合わせる
  camera.position.y = pooh.position.y - 180;

  // あたり判定
  pooh.overlap(honeyGroup, honeyCatch);

  //ハチミツを集めたらゲーム終了
  if (honeyCount == 5) {
      gameMode = 'gameCompleted';
     
  }
}

// ハチミツを拾う
function honeyCatch(pooh, honey) {
  // ハチミツを消す
  honey.remove();

  // 拾ったハチミツの数を数える
  honeyCount++;
}

// ハチミツを集め終わった
function gameCompleted() {
    // プーさんは動かさない
    pooh.velocity.x = 0;
    pooh.velocity.y = 0;
}