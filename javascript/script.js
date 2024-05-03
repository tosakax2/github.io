//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Circle(splash_text, {//id名を指定
  easing: 'easeOut',  //アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
  duration: 1400, //時間指定(1000＝1秒)
  strokeWidth: 6, //進捗ゲージの太さ
  color: 'linen', //進捗ゲージのカラー
  trailWidth: 3,  //ゲージベースの線の太さ
  trailColor: '#111', //ゲージベースの線のカラー
  text: { //テキストの形状を直接指定       
    style: {  //天地中央に配置
      position: 'absolute',
      left: '50%',
      top: '50%',
      padding: '0',
      margin: '0 0 0 0',  //バーより上に配置
      transform:'translate(-50%,-50%)',
      'font-size':'1.3rem',
      color: '#fff'
    },
    autoStyleContainer: false //自動付与のスタイルを切る
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
  }
});

//アニメーションスタート
bar.animate(1.0, function () {  //バーを描画する割合を指定します 1.0 なら100%まで描画します
  $("#splash_text").fadeOut(10);  //フェイドアウトでローディングテキストを削除
  $(".loader_cover-up").addClass("coveranime"); //カバーが上に上がるクラス追加
  $(".loader_cover-down").addClass("coveranime"); //カバーが下に下がるクラス追加
  $("#splash").fadeOut(); //#splashエリアをフェードアウト
});

/*==========ハンバーガーメニュー==========*/
$(".openbtn").click(function() {  //ボタンがクリックされたら
  $(this).toggleClass('active');  //ボタン自身にactiveクラスを付与し
  $("#g-nav").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () { //ナビゲーションのリンクがクリックされたら
  $(".openbtn").removeClass('active'); //ボタンの activeクラスを除去し
  $("#g-nav").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
});

/*==========トップページボタン==========*/
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
  var scroll = $(window).scrollTop(); //スクロール値を取得
  if (scroll >= 200) { //200pxスクロールしたら
    $('#page-top').removeClass('DownMove');   //DownMoveというクラス名を除去して
    $('#page-top').addClass('UpMove');      //UpMoveというクラス名を追加して出現
  }
  else {  //それ以外は
    if ($('#page-top').hasClass('UpMove')){  //UpMoveというクラス名が既に付与されていたら
      $('#page-top').removeClass('UpMove'); //UpMoveというクラス名を除去し
      $('#page-top').addClass('DownMove');  //DownMoveというクラス名を追加して非表示
    }
  }
  
  var wH = window.innerHeight; //画面の高さを取得
  var footerPos =  $('#footer').offset().top; //footerの位置を取得
  if (scroll+wH >= (footerPos+5)) {
    var pos = (scroll+wH) - footerPos+5 //スクロールの値＋画面の高さからfooterの位置＋5pxを引いた場所を取得し
    $('#page-top').css('bottom',pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
  }
  else {  //それ以外は
    if ($('#page-top').hasClass('UpMove')) {  //UpMoveというクラス名がついていたら
      $('#page-top').css('bottom','10px');  //下から10pxの位置にページリンクを指定
    }
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime(); //スクロールした際の動きの関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  PageTopAnime(); //スクロールした際の動きの関数を呼ぶ
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
  $('body,html').animate( {
      scrollTop: 0  //ページトップまでスクロール
  }, 700);  //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

/*==========アコーディオン==========*/
//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
  $('.box').slideUp(400);//クラス名.boxがついたすべてのアコーディオンを閉じる
  var findElm = $(this).next(".box");//タイトル直後のアコーディオンを行うエリアを取得
  if($(this).hasClass('close')) {//タイトル要素にクラス名closeがあれば
    $(this).removeClass('close');//クラス名を除去    
  }
  else { //それ以外は
    $('.close').removeClass('close'); //クラス名closeを全て除去した後
    $(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
    $(findElm).slideDown(400);//アコーディオンを開く
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function() {
  $('.accordion-area li:first-of-type section').addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $(".open").each(function(index, element) { //openクラスを取得
    var Title =$(element).children('.title'); //openクラスの子要素のtitleクラスを取得
    $(Title).addClass('close');       ///タイトルにクラス名closeを付与し
    var Box =$(element).children('.box'); //openクラスの子要素boxクラスを取得
    $(Box).slideDown(400);          //アコーディオンを開く
  });
});