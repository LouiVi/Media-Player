"use strict"

//Create a Home object.
function Home( path, layContent )
{

var self = this;
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return false }
    
    //Show or hide this page.
    this.Show = function( show )
    {
        if( show ) lay.Animate("FadeIn");
        else lay.Animate( "FadeOut" );
    }

this.video_OnReady = function(){
	video.Play();
}

this.video_OnComplete = function(){
	video.Play();
}
    
    this.spn_OnChange = function (item)
{
	//alert(item);
	
	if(item != "-- CHOOSE GALLERY --"){
	 	lstMenu_OnTouch( item );
	 	spn.SelectItem("-- CHOOSE GALLERY --");
	 }
}

this.SetSpinner = function(lst)
{
	//alert(path);
	lst = "-- CHOOSE GALLERY --," + lst;
	spn.SetList( lst );
	spn.Animate( "BounceRight" );
}

    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "Top,FillXY,HCenter" );
    lay.Hide();
    layContent.AddChild( lay );
    
var video = app.CreateVideoView( 1.0, 1.2, "ShowControls");
video.SetFile( "Video/intro2.webm" );
video.SetOnReady(self.video_OnReady );
video.SetOnComplete( self.video_OnComplete )
lay.AddChild( video );
    //Add a logo.
	//var img = app.CreateImage( "Img/Hello.png", 0.25 );
//	lay.AddChild( img );
	
	//Create a text with formatting.
    var text =  "<br><p>You can add links too - <a href=https://play.google.com/store>Play Store</a></p>";
    text = "<p><font color=#4285F4><big><big><b>&larr;</b></big></big> Try swiping from the " + 
    "left and choosing the <b>'New File'</b> option</font></p><hr><br>";
    var txt = app.CreateText( text, 1, -1, "Html,Link" );
    txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
    txt.SetTextSize( 17 );
    txt.SetTextColor( "#444444" );
    txt.Hide();
   lay.AddChild( txt );
   
   var spn = app.CreateSpinner( "-- CHOOSE GALLERY --", 0.85, -1 );
   spn.SetOnChange( self.spn_OnChange );
   lay.AddChild( spn );
}