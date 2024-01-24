/*
 * mamory-cameraview.js
 *
 */

// define namespace: MamoryCameraViewApi
var MamoryCameraViewApi = MamoryCameraViewApi || {};

/**
 * MamoryCameraViewApi.Authentication class
 */
MamoryCameraViewApi.Authentication = class {

	APP_URL = "https://relay.kids-way.ne.jp";
	login_url = this.APP_URL + "/api/auth/login";
	refresh_url = this.APP_URL + "/api/auth/refresh";

	constructor() {
	}

	/**
	 * MamoryCameraViewApi.Authenticationクラスのインスタンスを取得
	 * @retuns {MamoryCameraViewApi.Authentication} インスタンス
	 */
	static instance() {
		if (!this._instance) {
			this._instance = new this();
		}
		return this._instance;
	}

	/**
	 * ログイン情報オブジェクト作成
	 *
	 *
	 * @param {string} user_id - ユーザーID
	 * @param {string} password - パスワード
	 * @returns {LoginInfo} ログイン情報
	 */
	makeAuthenticationData(user_id, password) {
		return { user_id: user_id, password: password };
	}


	/**
	 * ログイン
	 * @param {LoginInfo} ログイン情報
	 * @return {LoginSuccess} 認証トークン
	 * @example 
	 * let authApi = new MamoryCameraViewApi.Authentication();
	 * let authData = new authApi.makeAuthenticationData('user', 'password');
	 * await authApi.login(authData);
	 */
	async login(authenticationData) {

		let response = await fetch(this.login_url,
								   {
									   method: "POST",
									   mode: "cors",
									   cache: "no-cache",
									   headers: {
										   Accept: "application/json",
										   "Content-Type": "application/json"
									   },
									   credentials: 'include',
									   body: JSON.stringify({
										   "user_id" : authenticationData.user_id,
										   "password" : authenticationData.password
									   })
								   });

		if (response.ok) {
			let json = await response.json();

			this.AuthenticationResult = json;
			localStorage.setItem("cameraToken", json.access_token);

			setInterval(async function () {
				let api = MamoryCameraViewApi.Authentication.instance();
				await api.refresh();
			}, 60 * 60 * 1000);

			return json;
		} else {
			return false;
		}

	}


	/**
	 * 認証クッキーのトークンリフレッシュ
	 * @return {TokenRefreshSuccess} リフレッシュの結果
	 * @example
	 * let authApi = new MamoryCameraViewApi.Authentication();
	 * await authApi.refresh();
	 */
	async refresh() {

		let response = await fetch(this.refresh_url,
								   {
									   method: "POST",
									   mode: "cors",
									   cache: "no-cache",
									   headers: {
										   Accept: "application/json",
										   "Content-Type": "application/json"
									   },
									   credentials: 'include',
									   body: JSON.stringify({
										   "message" : "OK"
									   })
								   });

		if (response.ok) {
			let json = await response.json();
			this.access_token = json.access_token;
			localStorage.setItem("cameraToken", json.access_token);
			return json;
		} else {
			return false;
		}

	}


}

/**
 * MamoryCameraViewApi.Camera class
 */
MamoryCameraViewApi.Camera = class {

	APP_URL = "https://relay.kids-way.ne.jp";

	authApi = MamoryCameraViewApi.Authentication.instance();

	constructor() {
		//this.log = Logger.instance;
	}

	/**
	 * iframeに表示するページのURLを取得
	 * @param {string} camera_serial_id - カメラのシリアル
	 * @return {GetUrlResponse} 再生ページのURL情報
	 * @example
	 * let cameraapi = new MamoryCameraViewApi.camera();
	 * await cameraapi.geturl("0000-0000-0000-0000");
	 */
	async geturl(camera_serial_id) {
		let url = this._geturl_url(camera_serial_id);
		let access_token =  this.authApi.AuthenticationResult.access_token;
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Authorization": access_token
			},
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" };
		}
	}

	/**
	 * カメラの静止画ファイルのURLを取得
	 * @param {string} camera_serial_id - カメラのシリアル
	 * @return {GetUrlResponse} 再生ページのURL情報
	 * @example
	 * let cameraapi = new MamoryCameraViewApi.camera();
	 * await cameraapi.geturl("0000-0000-0000-0000");
	 */
	async getimageurl(camera_serial_id) {
		let url = this._getimageurl_url(camera_serial_id);
		let access_token =  this.authApi.AuthenticationResult.access_token;
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Authorization": access_token

			},
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" };
		}
	}

	/**
	 *  ライブ再生用プレイリスト取得
	 *  @param {string} camera_serial_id - カメラのシリアル
	 *  @return {GetUrlResponse} プレイリスト(m3u8)のURL
	 *  @example
	 *  let cameraapi = new MamoryCameraViewApi.camera();
	 *  let json = cameraapi.streamlive("0000-0000-0000-0000");
	 */
	async streamlive(camera_serial_id) {
		let url = this._streamlive_url(camera_serial_id);
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" }
		}
	}

	/**
	 *  録画再生用プレイリスト取得
	 *  @param {string} camera_serial_id - カメラのシリアル
	 *  @param {string} yyyymmddhhmm - 録画再生日時
	 *  @param {string} last_tsfilename - 最終再生予定ファイル
	 *  @return {GetUrlResponse} プレイリスト(m3u8)のURL
	 * @example
	 * let cameraapi = new MamoryCameraViewApi.camera();
	 * let json = cameraapi.streamrec("0000-0000-0000-0000", "202001010000");
	 */
	async streamrec(camera_serial_id, yyyymmddhhmm, last_tsfilename) {

		let url = this._streamrec_url(camera_serial_id, yyyymmddhhmm, last_tsfilename);
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" }
		}
	}

	/**
	 * ライブ再生用プレイリスト取得
	 * @param {string} camera_serial_id - カメラのシリアル
	 * @return {GetUrlResponse} ライブ用静止画のurl
	 * @example
	 * let cameraapi = new MamoryCameraViewApi.camera();
	 * let json = cameraapi.streamliveimage("0000-0000-0000-0000");
	 */
	async streamliveimage(camera_serial_id) {
		let url = this._streamliveimage_url(camera_serial_id);
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" }
		}
	}

	/**
	 * 録画再生用プレイリスト取得
	 * @param {string} camera_serial_id - カメラのシリアル
	 * @param {string} yyyymmddhhmm - 録画再生日時
	 * @param {string} last_tsfilename - 最終再生予定ファイル
	 * @return {GetUrlResponse} 録画用静止画のurl
	 * @example
	 * let cameraapi = new MamoryCameraViewApi.camera();
	 * let json = cameraapi.streamrecimage("0000-0000-0000-0000", "20200101000000", "MOV_0000-0000-0000-0000_20200101000000_1.ts");
	*/
	async streamrecimage(camera_serial_id, yyyymmddhhmmss) {

		let url = this._streamrecimage_url(camera_serial_id, yyyymmddhhmmss);
		let response = await fetch(url, {
			method: "GET",
			mode: "cors",
			cache: "no-cache",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			let json = await response.json();
			return json;
		} else {
			return { url: "" }
		}
	}

	/**
	 * cameraviewerurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @return {GetUrlResponse} cameraviewurl取得APIのURL
	 */
	_geturl_url(camera_serial_id) {
		return this.APP_URL + "/api/camera/" + camera_serial_id + "/cameraviewurl";
	}

	/**
	 * イメージファイルurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @return {GetUrlResponse} イメージファイルurl取得APIのURL
	 */
	_getimageurl_url(camera_serial_id) {
		return this.APP_URL + "/api/camera/" + camera_serial_id + "/imageurl";
	}

	/**
	 * ライブ再生用m3u8ファイルurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @return {GetUrlResponse} ライブ再生用m3u8ファイルurl取得APIのURL
	 */
	_streamlive_url(camera_serial_id) {
		return this.APP_URL + "/api/camera/" + camera_serial_id + "/streamlive";
	}

	/**
	 * 録画再生用m3u8ファイルurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @param {string} recplay_datetime - 録画再生日時
	 * @param {string} last_tsfilename - 最終再生予定ファイル
	 * @return {GetUrlResponse} 録画再生用m3u8ファイルurl取得APIのURL
	 */
	_streamrec_url(camera_serial_id, recplay_datetime, last_tsfilename) {
		let url = this.APP_URL + "/api/camera/" + camera_serial_id + "/streamrec/" + recplay_datetime;
		if (last_tsfilename != ""){
			url += "/" + last_tsfilename;
		}
		return url;
	}

	/**
	 * ライブ再生用m3u8ファイルurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @return {GetUrlResponse} ライブ再生用m3u8ファイルurl取得APIのURL
	 */
	_streamliveimage_url(camera_serial_id) {
		return this.APP_URL + "/api/camera/" + camera_serial_id + "/streamliveimage";
	}

	/**
	 * 録画再生用m3u8ファイルurl取得APIのURL取得
	 * @param {string} camera_serial_id - カメラのシリアルID
	 * @param {string} recplay_datetime - 録画再生日時
	 * @return {GetUrlResponse} 録画再生用m3u8ファイルurl取得APIのURL
	 */
	_streamrecimage_url(camera_serial_id, recplay_datetime) {
		let url = this.APP_URL + "/api/camera/" + camera_serial_id + "/streamrecimage/" + recplay_datetime;
		return url;
	}

}

/**
	* @typedef {Object} LoginInfo
	* @property {string} user_id ユーザーID
	* @property {string} password パスワード
	*/

/**
 * @typedef {Object} LoginSuccess 
 * @property {string} access_token アクセストークン
 * @property {intger} expires_in 有効期限
 * @property {string} refresh_token リフレッシュトークン
 * @property {string} token_type トークンタイプ
 */

/**
 * @typedef {Object} TokenRefreshSuccess
 * @property {string} access_token アクセストークン
 * @property {intger} expires_in 有効期限
 * @property {string} token_type トークンタイプ
 */

/**
 * @typedef {Object} GetUrlResponse
 * @property {string} url URL
 */
