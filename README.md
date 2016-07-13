# ambient-genuino-heartrate

Genuino 101と心拍センサーを使い、心拍数をBLE経由でIoT用クラウドサービス[Ambient](https://ambidata.io)に送ってモニターするプログラムです。

## 材料

* examples/Genu_HR: 心拍センサーで心拍数を測定し、シリアルに出力
* examples/Genu_HR_BLE_dummy: ダミーデーターをBLEで通信
* examples/Genu_HR_BLE: 心拍センサーで測定した心拍数をBLEで通信
* hrm-ambient.js: 心拍数データーをBLE端末から受け取り、Ambientに送信するnode.jsプログラム
* package.json: 構成ファイル

## レシピ

右上の「Clone or download」の「Download ZIP」をクリックしてzipファイルをダウンロードし、適当なディレクトリーで展開します。
材料のファイルが展開されます。

動かし方は[Ambientサイト](https://ambidata.io/examples/genu-pulse/)に書きましたので、ご参照ください。
