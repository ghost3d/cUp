#pragma strict
import UnityEngine.SocialPlatforms.GameCenter;
private var showAchievementBanners: boolean = true;

function Start () {
#if UNITY_IPHONE
Social.localUser.Authenticate(function(success){
	if (success && showAchievementBanners){
		GameCenterPlatform.ShowDefaultAchievementCompletionBanner(showAchievementBanners);
		Debug.Log ("Authenticated"+Social.localUser.userName);
	}
	else{
		Debug.Log("Failed to authenticate"+Social.localUser.userName);
	}
});
#endif
}
static function Score(name:String,score:double){
	#if UNITY_IPHONE
	if (Social.localUser.authenticated){
		Social.ReportScore (score, name, function(success){
			if (success){
				Debug.Log("Posted"+score+" on Leaderboard"+ name);
			}
			else{
				Debug.Log("failed to post"+score+"on leaderboard"+name);
			}
		});
	}
	#endif
}