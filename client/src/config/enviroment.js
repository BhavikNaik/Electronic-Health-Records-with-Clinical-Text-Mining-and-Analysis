// // change the file name dummy.environment.js to "environment.js"
// // and add your keys below

// var environments = {
// 	staging: {
// 		FIREBASE_API_KEY: 'AIzaSyBj9rSVGsSEV6cF2TQYupAUHGNw9-iv7a8',
// 		FIREBASE_AUTH_DOMAIN: "ehrproj-37cac.firebaseapp.com",
		
// 		FIREBASE_PROJECT_ID: 'ehrproj-37cac',
// 		FIREBASE_STORAGE_BUCKET: 'ehrproj-37cac.appspot.com',
// 		FIREBASE_MESSAGING_SENDER_ID: '886429482645',
// 		GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyAL29aOJgF6S5386W-usz9_Be9jPk0J8yE'
// 	},
// 	production: {
// 		// Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
// 	}
// };

// function getReleaseChannel() {
// 	let releaseChannel = Expo.Constants.manifest.releaseChannel;
// 	if (releaseChannel === undefined) {
// 		return 'staging';
// 	} else if (releaseChannel === 'staging') {
// 		return 'staging';
// 	} else {
// 		return 'staging';
// 	}
// }
// function getEnvironment(env) {
// 	console.log('Release Channel: ', getReleaseChannel());
// 	return environments[env];
// }
// var Environment = getEnvironment(getReleaseChannel());
// export default Environment;