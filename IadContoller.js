#pragma strict

#if UNITY_IPHONE

private var banner : ADBannerView = null;
static var show : boolean = false;
function Awake () {
  	DontDestroyOnLoad (transform.gameObject);
}
function Start (){
  show = false;
}

function Update (){

    if (banner == null && show == true) {
        CreateBanner();
    }


    if(banner != null && show == false){

        banner.visible = false;
        banner = null;
        ADBannerView.onBannerWasLoaded -= OnBannerLoaded;


    }

}
function CreateBanner (){

    banner = new ADBannerView(ADBannerView.Type.Banner, ADBannerView.Layout.TopRight);
    ADBannerView.onBannerWasLoaded  += OnBannerLoaded;


}
function OnBannerLoaded(){


    banner.visible = true;

}


#endif