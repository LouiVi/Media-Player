"use strict"

//Create an new file viewer object.
//(Note: a single instance of this object is used for all file data)
function File( path, layContent )
{
    var self = this;
    var name = "";
    var dfltImage = "Img/Icon.png";
    var dfltText = "";
		var grid, port;
		var img;
		var web;
		var hh = "";
		var cData = null;
		var duration = DURATION;
		//var protools = app.CreateProTools(null);
    
    //Get page states.
    this.IsVisible = function() { return lay.IsVisible() }
    this.IsChanged = function() { return btnSave.IsEnabled() }
    
    //Show or hide this page.
    this.Show = function( show, title )
    {
        if( show ) 
        {
            name = title;
            self.Load();
            lay.Animate("FadeIn");
        }
        else lay.Animate( "FadeOut" );
    }
    
    //Load page settings from json file.
    this.Load = function()
    {
        //Read settings from json file.
        var file = path+"/"+name+"/"+name+".json";
        var json = app.ReadFile( file );
        
        if( json ) 
        {
            //Set controls.
            var data = JSON.parse(json);
            var dfltName = name ;
            
            //Test
/*
port = data.port ? data.port : utils.RandomIntegerRange(6969, 9999).toString(); 

var fpath = data.gallery ? data.gallery : dfltName;
var webserver = app.CreateWebServer( port, "ListDir" );
webserver.Stop();
webserver.SetFolder( "/storage/emulated/0/" + fpath );
webserver.Start();
app.HttpRequest( "GET", "http://" + app.GetIPAddress() + ":" + port + "/", null, null, self.handleReply );
*/
			//End Test
            
            img.SetImage( data.image ? data.image : dfltImage, img.GetWidth(), -1 );
            img.imageFile =  data.image ? data.image : dfltImage;
            
            txtTitle.SetText( data.text ? data.text : dfltText );
						var pattern = "(?!~.*)(.*\.jpg|.*\.jpeg|.*\.jfif|.*\.webp|.*\.png)";
var files = data.files ? data.files : app.ListFolder( data.path, pattern, 0, "AlphaSort, FullPath, RegEx" );
//alert("Load: " + files);
if(name=="Ninel Conde"){
//app.CopyFolder( "/storage/emulated/0/Android/data/com.smartphoneremote.androidscriptfree/files/Ninel Conde", "/storage/emulated/0/Ninel Conde" );
app.ShowPopup( "The folder of "+name+" is being copied. Enjoy jerking hard your cock in her name. Imagine fucking her brains out." );
}
//app.SetClipboardText( files );
//app.Exit(  );
//protools.WriteCompressFile(files, app.GetAppPath()+"/"+name+".json",true);
//app.ShowPopup( "Total images: " + data.total, "Bottom" );
  //grid = app.CreateImageGrid( files, 1, 0.4, 3,3 );
  //grid.SetOnTouch( Grid_OnTouch );
  //grid.SetOnLongTouch( Grid_OnLongTouch );
if(files!="") grid.SetList(files, ",");
//if(data.cData){
//web.LoadHtml( data.cData );//protools.UnCompress(data.cData) );
//app.ShowPopup( "Loading..." );
//}else{
if(files!="") self.SetWebFiles("" + files);
//}
	//grid.SetSpacing(0.25, 0.15);
  //lay.AddChild( grid );
						//app.Alert( data.path, "Path: " );
						//app.Alert( data.image, "Image: " );
        }
        else {self.Clear(); self.Save();  self.Load();}
        
        btnSave.SetEnabled( false );
    }

this.GetFileName = function( fileName, noExtension )
{
    var title = fileName.substr( fileName.lastIndexOf("/")+1 );
    if( noExtension ) title = title.substr( 0, title.lastIndexOf(".") );
    return title;
}

this.SetWebFiles = function (ff)
{
/*if(getSessionStorage(name, 'htmlCode') != '') {
var con = confirm("Do you want to refresh the gallery?");
if(con) sessionStorage[name] = JSON.stringify({data: {htmlCode: ''}});

}
if (typeof getSessionStorage != 'undefined' &&  getSessionStorage(name, 'htmlCode') != "") {
            //var safeMode = getLocalStorage('cacheableUserPreference', 'isSafeModeOn');
 var r = getSessionStorage(name, 'htmlCode');
//alert(r);
web.LoadHtml(r);
}else{*/
	var h = "";//<br />";
	var g = "file://";
	var f = ff.split(",");
	var r = "";
	for(var j = 0; j < f.length; j++){
		h += "<li><img onTouch='alert(\"" + name + "\");' alt='" + name + "' title='" + j + " - " + self.GetFileName(f[j], true) + "' src='" + g + f[j] + "' id='wow1_" + (j+1) + "' /></li>";
		if(j<20){
	  	hh = "<li><img onTouch='alert(\"" + name + "\");' alt='" + name + "' title='" + self.GetFileName(f[j], true) + "' src='" + self.Base64Image(f[j]) + "' id='wow1_" + (j+1) + "' /></li>\n";
			app.WriteFile( app.GetAppPath() + "/Base64Images.html", hh, "Append" );
		}
	}
var effects = app.LoadText( "effects", "", "effects.txt" );
r = app.ReadFile( "Html/pageTemplate.html" );
r = r.replace("[TEMPLATE]", h).replace("[DURATION]", duration).replace("[DELAY]",delay).replace("[EFFECTS]", effects);
//app.SetClipboardText( r );

//cData = r;//protools.Compress(r);
//self.Save();
//self.Load();
//protools.WriteCompressFile(r,app.GetAppPath()+"/"+name+".txt",true);
web.LoadHtml(r);
//sessionStorage[name] = JSON.stringify({data: {htmlCode: r}});
//}
//app.SetClipboardText( r );

//var file = "/storage/emulated/0/" + name + "/" + name + ".html";
//var file = "/storage/emulated/0/" + name;
//app.WriteFile( file, r, "Write");

//app.ZipFolder( file, "/storage/emulated/0/" + name + ".zip" );
//alert("Data Length: " + r.length);
//alert("Zip Length: " + app.GetFileSize( file + ".zip" ));
//setTimeout(()=>{ app.OpenUrl( "file://" + file ); }, 12000);

setTimeout(self.SS, 15500);

}

this.Base64Image = function (imgFilex)
		{
//alert(imgFilex);
			var img1 = app.CreateImage( imgFilex );
			var img2 = "";//img1.GetPixelData( "jpgbase64", 0, 0, img1.GetAbsWidth(), img1.GetAbsHeight());
			return "data:image/jpg;base64," + img2;
		}

this.SS = function ()
{
	app.ScreenShot( app.GetAppPath() + "/Img/" + app.GetAppName() + ".png", 100 );
	app.ShowPopup( "Screenshot saved!", "Bottom");
//self.Save();
}

//Handle tab selection.
this.tabs_OnChange = function ( name )
{
/*tabs.Animate("ZoomOutExit", ()=>{tabs.Animate( "ZoominEnter" );}, 300);
    app.ShowPopup( name );*/
}
    
    //Save page settings to json file.
    this.Save = function()
    {
    counter++;
    if(counter >= 2) {
    self.Load();
    }else{
				var pattern = "(?!~.*)(.*\.jpg|.*\.jpeg|.*\.webp|.*\.jfif|.*\.png)";
				var files = "" + app.ListFolder( currentPath, pattern, 0, "AlphaSort, FullPath, RegEx" );
				alert("Files: " +files);

        //Create settings object.
        var settings = 
        { 
            image : files.split(",")[utils.RandomIntegerRange(0, files.split(",").length)],
            text : name,
						path : currentPath,
						files : files,
						total: files.split(",").length//,
						//cData: cData
						//gallery : name, /* img.imageFile,*/
           // port : utils.RandomIntegerRange(6969, 9999).toString()//txtNotes.GetText(),
				};
        
        //Write settings to file as json.
        var file = path+"/"+name+"/"+name+".json";
        app.WriteFile( file, JSON.stringify( settings ) );
        //btnSave.SetEnabled( false );
				//self.Load();
				//alert("End");
				}
    }
    
    //Clear page controls.
    this.Clear = function()
    {
        img.SetImage( dfltImage, img.GetWidth() );
        img.imageFile =  dfltImage;
        //self.Load();
        //txtNotes.SetText( dfltText );
    }


    
    //Swap image.
    this.OnImageChoose = function( file )
    {
        app.MakeFolder( path+"/"+name+"/Img" );
        var imageFile = path+"/"+name+"/Img/"+name+".png";
        app.GetThumbnail( file, imageFile, 340, 340 );
        img.SetImage( imageFile, 0.2,-1 );
        img.imageFile = imageFile;
        btnSave.SetEnabled( true );
    }
    
    //Handle image button.
    this.btnImage_OnTouch = function()
    {
        app.ChooseFile( "Choose Image", "image/*", self.OnImageChoose );
    }

	this.SetImage = function (imageFile)
{
	 img.SetImage(imageFile, img.GetWidth(),-1);
		img.imageFile = imageFile;
img.Animate( "ZoominEnter" );
}

this.btn_OnTouch = function ()
{
//alert( this.GetText() );
switch( this.GetText() )
    {
        case "Sepia": 
					img.Animate( "ZoomOutTop", function(){ Jimp.read(img.imageFile, self.ProcessSepia);}, 2500);
						img.Animate( "ZoomInEnter" );
            break;
        case "Greyscale": 
            	img.Animate( "ZoomOutTop", function(){Jimp.read(img.imageFile, self.ProcessGreyscale);}, 3200);
						img.Animate( "ZoomInEnter" );
            break;
		}

}

this.ProcessSepia = function(err, robot)
{
          if (err) alert(err);
          robot.sepia();
          robot.getBase64(Jimp.MIME_JPEG, self.SetData );
}

this.ProcessGreyscale = function(err, robot)
{
          if (err) alert(err);
          robot.greyscale();
          robot.getBase64(Jimp.MIME_JPEG, self.SetData );
}

this.SetData = function (err, src)
{
     if( err ) alert( err );
     else {
          img.SetPixelData( src, img.GetWidth(), -1, "square");
img.Animate( "ZoomInEnter" );
     }
}

this.web_OnError = function (error)
{
	alert(JSON.stringify(error));
//continue;
}

this.img_OnTouch = function(event)
{
	//alert(img.GetAbsHeight());
}
    
    //Create layout for app controls.
    var lay = app.CreateLayout( "Linear", "FillXY,VCenter" );
    lay.Hide();
    layContent.AddChild( lay );
    
var tabs = app.CreateTabs( "Info,Grid,Slideshow", 1, 1, "VCenter" )
    tabs.SetOnChange( self.tabs_OnChange );
tabs.SetCornerRadius(20);
    lay.AddChild( tabs );
var tabInfo = tabs.GetLayout("Info");
var tabGrid = tabs.GetLayout("Grid");
var tabSlideshow = tabs.GetLayout("Slideshow");

//Create card layout.
	var layCard = app.CreateLayout( "Card" );
//layCard.SetBackground( "/res/drawable/pattern_carbon", "repeat" );

	layCard.SetBackColor(  "#4285F4"  );
	layCard.SetElevation( 34 );
	layCard.SetCornerRadius( 12 );
	tabInfo.AddChild( layCard );
layCard.SetChildMargins( 0.01, 0.02, 0.01, 0.02 );

	//Create card contents.
	var pad = 0.02;
	var cardWidth = 0.895;
	var layInfo = app.CreateLayout( "Linear" );
	layInfo.SetMargins( pad,pad,pad,pad );
	layCard.AddChild( layInfo );
    
    //Create image.
	img = app.CreateImage( dfltImage, cardWidth, -1 );
img.SetOnTouch( self.img_OnTouch )
	img.imageFile = dfltImage;
	layInfo.AddChild( img );
	
var txtTitle = app.AddText( layInfo, "Card Info", -1,-1, "HCenter,FillX" )
    txtTitle.SetMargins( 0,0.01,0,0.01 )
    txtTitle.SetTextColor( "#FFFFFF" );
		txtTitle.SetTextShadow( 7, 0, 0, "#dc000000" );
    txtTitle.SetTextSize( 22 );

var layInfo1 = app.CreateLayout( "Linear", "Horizontal, FillX" );
layInfo.AddChild( layInfo1 );

var btnSepia = app.CreateButton( "Sepia", 0.35, -1, "Lego");
btnSepia.SetOnTouch( self.btn_OnTouch );
layInfo1.AddChild( btnSepia );

var btnBW = app.CreateButton( "Greyscale", 0.35, -1, "Lego");
btnBW.SetOnTouch( self.btn_OnTouch );
layInfo1.AddChild( btnBW );
	

var sep = app.CreateImage( null, 1.0, 0.001,"fix", 2,2 );
    sep.SetSize( -1, 205, "px" );
    tabInfo.AddChild( sep );


grid = app.CreateImageGrid( "", 1, 1, 2, 3, "fit" );
  grid.SetOnTouch( Grid_OnTouch );
  grid.SetOnLongTouch( Grid_OnLongTouch );
	//grid.SetSpacing(0.025, 0.015);
  tabGrid.AddChild( grid );

web = app.CreateWebView( 0.85, 0.85 );
web.SetOnError( self.web_OnError );
tabSlideshow.AddChild( web );

    //Create a save button.
    var btnSave = app.CreateButton( "SAVE", 0.35, 0.1 );
    btnSave.SetMargins( 0,0.2,0,0 );
    btnSave.SetOnTouch( self.Save );
    //lay.AddChild( btnSave );
}

//Show context help.
function btn_OnHelp()
{
    var txt = ""
    switch( this.help )
    {
        case "image": 
            txt = "This is a popup help box";
            app.ShowTip( txt, 0.25, 0.42); 
            break;
        case "notes": 
            txt = "This is where you type some notes etc...bla bla bla";
            app.ShowTip( txt, 0.15, 0.53 ); 
            break;
    }
}