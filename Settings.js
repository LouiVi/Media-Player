"use strict"

function Settings()
{
var self = this;
    //Show settings dialog.
    this.Show = function()
    {
        dlgPub.Show();
    }

    //Handle contact via email button.
    this.btnContact_OnTouch = function()
    {
         /*app.SendMail( "mycompany@mycompany.com", "MyCompany - Query", 
    		      "Please help me!" );*/
				dlgPub.Dismiss();
    }

		this.OnChange = function (value)
{
	app.ShowPopup( value );
	duration = value;
	delay = value;
}

this.OnCheckBox = function (index, value)
{
    app.ShowPopup(lst.split(",")[index] + " is "+value);
app.SetClipboardText( chk.GetCheckItem() );
self.GetEffects(chk.GetCheckItem());
}

this.GetEffects = function (effects)
{
	var h = new Array();
	effects = "" + effects;
	var e = effects.split(",");
	for(var g = 0; g < e.length; g++){
		h.push(lst.split(",")[parseInt(e[g])]);
	}
	txt.SetText( h.join(",") );
app.SaveText( "effects", h.join(","), "effects.txt" );
//var effects = app.LoadText( "effects", "", "effects.txt" );

}

this.ListUpperCase = function (ls)
{
	var luc1 = ls.split(",");
	var luc2 = "";
	var luc3 = new Array();
	for(var luc4=0; luc4 < luc1.length; luc4++){
		luc2 = "";
		var luc5 = luc1[luc4].split("");
		for(var luc6=0; luc6 < luc5.length; luc6++){
			if(luc6==0) luc2 += luc5[luc6].toUpperCase();
			else luc2 += luc5[luc6];
		}
		luc3.push(luc2);
	}
return luc3.join(",");
}

    
    //Create dialog window.
    var dlgPub = app.CreateDialog( "Settings", "NoCancel");
dlgPub.SetBackColor( "#ffffff" );
dlgPub.SetSize( 1.0, 0.95 );
    var layPub = app.CreateLayout( "linear", "vertical,fillxy" );
    layPub.SetPadding( 0.05, 0.05, 0.05, 0 );
    
    //Add an icon to top layout.
  /*  var img = app.CreateImage( "Img/Hello.png", 0.2 );
    img.SetPosition( drawerWidth*0.06, 0.04 );
    layPub.AddChild( img );*/

 var picker = uix.CreateNumberPicker( 2000, "Cycle" );
 picker.SetRange( 200, 5000 );
picker.SetDecimalPlaces(0);
picker.SetValue(duration);
picker.SetTextColor("#4285F4");
 picker.SetOnChange( self.OnChange );
 layPub.AddChild( picker );

    
//var lst = "Apple,Mango,Orange,Banana";
var lst = "turn,shift,louvers,cube_over,tv,lines,bubbles,dribbles,glass_parallax,parallax,brick,collage,seven,kenburns,cube,blur,book,rotate,domino,slices,blast,blinds,basic,basic_linear,fade,fly,flip,page,stack,stack_vertical";
        var chk = MUI.CreateCheckbox(self.ListUpperCase(lst), 0.97, 0.35);
chk.SetMargins(0.02, 0.02, 0.02, 0.02);
        chk.SetOnTouch(self.OnCheckBox)
        layPub.AddChild(chk)

    //Create a text with formatting.
    /*var text = "<p>This is my app " + 
        "<a href=http://www.google.com>My Link</a></p>";
    */
var txt = app.CreateText( "", 0.8, -1, "Html,Link" );
    txt.SetPadding( 0.03, 0.03, 0.03, 0 );
    txt.SetTextSize( 12 );
    txt.SetTextColor( "#444444" );
    layPub.AddChild( txt );
    
    //Create contact button.
    var btnContact = app.CreateButton( "Set & Exit", 0.63, 0.1 );
    btnContact.SetMargins( 0,0,0,0.02 );
    btnContact.SetOnTouch( this.btnContact_OnTouch );
    layPub.AddChild( btnContact );
    
    //Add dialog layout and show dialog.
    dlgPub.AddLayout( layPub );
}