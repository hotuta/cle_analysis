CLE_Analysis
======================
This software is released under the MIT License, see LICENSE.  
東海大学のキャンパスライフエンジンのトップページにある週間予定表から指定期間分データを抽出しGoogleカレンダー用CSVファイルに変換するブックマークレットです。  
使用方法  
1.以下のスクリプトをコピーしてブックマークに登録してください。  
```
javascript:(function(docbk,funcbk,scrpbk){scrpbk=docbk.createElement('script');scrpbk.src='https://cdn.rawgit.com/prprhyt/cle_analysis/master/cle_analysis_alpha.js';scrpbk.onload=function(){funcbk()};docbk.body.appendChild(scrpbk);funcbk=function(){analysiscle();};})(document)
```
2.キャンパスライフエンジンにログインし、1で作成したブックマークをクリックして実行してください。  
  
Version0.0.7より、湘南、代々木、高輪、清水、熊本、阿蘇、札幌キャンパスの時間割に対応しました。(一部を除く/※)
※現在、伊勢原キャンパス(医学部/健康科学部)の時間割には対応していません。  
Version0.0.9住所情報を含めるオプションを追加
