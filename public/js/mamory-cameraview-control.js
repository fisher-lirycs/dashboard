/*
 * mamory-cameraview-control.js
 *
 */

var MamoryCameraViewApi = MamoryCameraViewApi || {};

/**
 * MamoryCameraViewApi.Control class
 */
MamoryCameraViewApi.Control = class {

	APP_URL = "{{appurl}}";

	static instance() {
		if (!this._instance) {
			this._instance = new this();
		}
		return this._instance;
	}

    /**
	 * constructor
	 */
	constructor() {
        //
        this.initPostMessage();
        //時間経過で自動でデータが消えるstack型変数
        this._expiryArrayClass = class ExpiryArray {
            
            constructor(maxSec) {
                this._maxSec = maxSec;
                this.arr = [];
            }

            //追加する
            add(id, obj){
                let param = new Object();
                param.obj = obj;
                param.dt = new Date();
                this.arr[id] = param;
                //
                this.tidy();
            }

            //指定のIDの値を取得する
            get(id){
                if (id in this.arr) {
                    let param = this.arr[id];
                    let obj = param.obj;
                    //
                    return obj;
                }
                //
                return null;
            }

            //内容を取り出して、削除する
            pop(id){
                if (id in this.arr) {
                    let param = this.arr[id];
                    let obj = param.obj;
                    //削除する
                    delete this.arr[id];
                    //
                    return obj;
                }
                //
                return null;
            }

            //指定のIDを削除する
            del(id){
                if (id in this.arr) {
                    delete this.arr[id];
                }
                //
                this.tidy();
            }

            //時間経過したデータを削除する
            tidy(){
                let arrrmvid = [];
                let now = new Date();
                for (let id in this.arr) {
                    if (id in this.arr) {
                        let param = this.arr[id];
                        let diffMSec = now - param.dt;
                        let diffSec = Math.floor(diffMSec / 1000);
                        if (diffSec > this._maxSec){
                            arrrmvid.push(id);
                        }
                    }
                }
                //削除候補をすべて削除する
                for (let i = 0; i < arrrmvid.length; i++) {
                    let id = arrrmvid[i];
                    delete this.arr[id];
                }
            }

            //現在スタックされているデータを取得する
            getTextArray(){
                let textArr = [];
                for (let id in this.arr) {
                    if (id in this.arr) {
                        let param = this.arr[id];
                        //
                        let text = "id=" + id + "  dt=" + param.dt;
                        textArr.push(text);
                    }
                }
                //
                return(textArr);
            }
        }
        //
        this._expiryArray = new this._expiryArrayClass(30);
	}

    /**
     * ライブ再生または録画再生に切り替える
     * @param {Element} iframeElement - 対象iFrameのElement
     * @param {int} playMode - 0: ライブ再生、1: 録画再生
     * @param {string} playDatetime 録画再生日時。ライブ再生時は未使用 ＜例＞2000年1月2日15時40分50秒の場合20000102154050
     * @param {Function} func callback関数
     */
    setPlayMode(iframeElement, playMode, playDatetime, func){
        //
        let obj = new Object();
        obj.id = this._getUuid();
        obj.key = "setPlayMode";
        obj.playMode = playMode;
        obj.playDatetime = playDatetime;
        this._expiryArray.add(obj.id, func);
        //
        iframeElement.contentWindow.postMessage(obj, this.APP_URL);
    }

    /**
     * 動画再生または静止画更新に切り替える
     * @param {Element} iframeElement - 対象iFrameのElement
     * @param {int} playPattern - 0: 動画再生、1: 静止画更新
     * @param {Function} func callback関数
     */
    setPlayPattern(iframeElement, playPattern, func){
        //
        let obj = new Object();
        obj.id = this._getUuid();
        obj.key = "setPlayPattern";
        obj.playPattern = playPattern;
        this._expiryArray.add(obj.id, func);
        //
        iframeElement.contentWindow.postMessage(obj, this.APP_URL);
    }

    /**
     * 映像の一時停止を行う
     * @param {Element} iframeElement - 対象iFrameのElement
     * @param {Function} func callback関数
     */
    pauseVideo(iframeElement, func){
        //
        let obj = new Object();
        obj.id = this._getUuid();
        obj.key = "pauseVideo";
        this._expiryArray.add(obj.id, func);
        //
        iframeElement.contentWindow.postMessage(obj, this.APP_URL);
    }

    /**
     * 映像の一時停止を解除する
     * @param {Element} iframeElement - 対象iFrameのElement
     * @param {Function} func callback関数
     */
    resumeVideo(iframeElement, func){
        //
        let obj = new Object();
        obj.id = this._getUuid();
        obj.key = "resumeVideo";
        this._expiryArray.add(obj.id, func);
        //
        iframeElement.contentWindow.postMessage(obj, this.APP_URL);
    }

    /**
     * VRモードを切り替える
     * @param {Element} iframeElement - 対象iFrameのElement
     * @param {int} vrModeNum - 0: 魚眼、1: VirtualPTZ表示、3: ダブルパノラマ 、4: ４分割 、-1: VRモードを使用しない
     * @param {Function} func callback関数
     */
    setVRMode(iframeElement, vrModeNum, func){
        //
        let obj = new Object();
        obj.id = this._getUuid();
        obj.key = "setVRMode";
        obj.vrModeNum = vrModeNum;
        this._expiryArray.add(obj.id, func);
        //
        iframeElement.contentWindow.postMessage(obj, this.APP_URL);
    }

    /**
     * postmessage処理
     */
    initPostMessage(){
        //メッセージ受信時処理
        window.addEventListener("message", (event) => {
            if (event.origin != ""){//originチェックは不要とする
                //
                if (event.data.key == 'setPlayMode'){
                    //callback関数を実行する
                    let func = this._expiryArray.pop(event.data.id);
                    if (func != null && typeof(func) == 'function'){
                        func(event.data.result, event.data.recyyyymmddhhmmss);
                    }
                }
                else if (event.data.key == 'pauseVideo'){
                    //callback関数を実行する
                    let func = this._expiryArray.pop(event.data.id);
                    if (func != null && typeof(func) == 'function'){
                        func(event.data.result);
                    }
                }
                else if (event.data.key == 'resumeVideo'){
                    //callback関数を実行する
                    let func = this._expiryArray.pop(event.data.id);
                    if (func != null && typeof(func) == 'function'){
                        func(event.data.result);
                    }
                }
                else if (event.data.key == 'setVRMode'){
                    //callback関数を実行する
                    let func = this._expiryArray.pop(event.data.id);
                    if (func != null && typeof(func) == 'function'){
                        func(event.data.result);
                    }
                }
            }
        });
    }

    /**
     * uuidを取得する
     */
    _getUuid() {
        return (this._GetS4() + this._GetS4() + "-" + this._GetS4() + "-" + this._GetS4() + "-" + this._GetS4() + "-" + this._GetS4() + this._GetS4() + this._GetS4());
    };

    /**
     * uuid作成サブ処理
     */
    _GetS4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
}

