# 概要

　HTMLの要素に値を割り当てる。CSSセレクタで指定した所へ、指定した値をセットする。TSVファイルで指定する。

# 例

map.tsv
```tsv
query	target	和	英
p	innerText	pに入れる	inP
option[value="male"]	textContent	男	Male
option[value="female"]	textContent	女	Female
```

* 1行目はヘッダである。2列目以降は自由に指定する
* 2行目以降がデータである
    * 1列目は`document.querySelectorAll()`の引数
    * 2列目は値をセットする場所
    * 3列目以降はセットする値
        * 1行目3列目以降とともに自由に指定する

　以下のように実行する。

```javascript
Mapper.map('和');
Mapper.map('英');
```

