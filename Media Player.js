cfg.Light, cfg.Portrait, cfg.MUI;
app.LoadPlugin( "Support" );
app.LoadPlugin( "ImageGrid" );
app.LoadPlugin( "Jimp" );
app.LoadPlugin( "Utils" );
app.LoadPlugin( "Picasso" );
app.LoadPlugin( "UIExtras" );
//app.LoadPlugin( "ProTools" );
//app.LoadPlugin('DroidScriptUIKit');

//Load external scripts.
app.Script( "Home.js" );
app.Script( "About.js" );
app.Script( "Settings.js" );
app.Script( "File.js" );
app.Script( "Utils.js" );
app.Script( "Folders.js" );
var counter = 0;
//Init some global variables.
var appPath = "storage/emulated/0/" + app.GetAppName() + " (v) 1.0";
var curMenu = "Home";
var currentPath;
var curPage = null;
var duration = 2000;
var delay = 2000;
var webserver1 = null;
var DURATION = 2000;
//localStorage.clear();
//app.DeleteFolder( appPath );

function RenameLGB()
{
	files = app.ListFolder( "/storage/emulated/0/LGB", "%C3%B1", 5000, "FullPath" );
	for(f=0;f<files.length;f++){
		app.RenameFile( files[f], files[f].split("%26").join("&").split("%25").join("").split("%2B").join("").split("%C3%B1").join("ñ"));
		app.ShowPopup( (f+1) );
	}
	alert("Finish renaming files");
}

function RenameLP()
{
	files = app.ListFolder( "/storage/emulated/0/Lina Posada", ".jpg", 5000, "FullPath" );
	for(f=0;f<files.length;f++){
		app.RenameFile( files[f], files[f].split("%26").join("&").split("%25").join(" ").split("%2B").join(" "));
		app.ShowPopup( (f+1) );
	}
	alert("Finish renaming files");
}

function CreateMenuBar()
{
	//Create horizontal layout for top bar.
    layHoriz2 = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz2.SetBackGradient( color.ORANGE_LIGHT_3, color.ORANGE_DARK_2, color.ORANGE_ACCENT_2 );
    layMain.AddChild( layHoriz2 );
		layHoriz2.SetSize( 1.0, 0.09481 );
//layHoriz2.SetCornerRadius( 5 );
//layHoriz2.SetElevation( 5 );

mh = new Array();
mv = new Array();
mi = new Array();
mt = new Array();
mi = ["Home","Scan","Audio","Videos","Settings"];
mi2 = ["home","image","music_note","video_library","settings"];
//mi = ["Home","","","","Settings"];
//mi2 = ["home","","","","settings"];

for(c=0;c<5;c++){
mh[c] = app.CreateLayout( "Linear", "Vertical" );
mh[c].SetSize(0.20, 1.0);
if(c==0) mh[c].SetBackColor("#a96969ea");
layHoriz2.AddChild( mh[c] );
for(d=0;d<2;d++){
mv[d] = app.CreateLayout( "Linear", "Vertical,VCenter,Bottom" );
//if(d==0) { mv[d].SetSize(1.0, 0.25);}else{mv[d].SetSize(1.0, 1.75);}
//if(d==0) mv[d].SetBackColor("#ef000000");
if(d==0) mt[c] = app.CreateText( mi2[c] ), mt[c].SetMargins(0.01,0.01,0.01,0.01), mt[c].index = c, mt[c].SetOnTouch(mt_OnTouch),mt[c].SetFontFile("Fonts/Icon.ttf"), mv[d].AddChild(mt[c]), mt[c].SetTextSize(24), mt[c].SetTextColor("#ffffff"), mt[c].SetTextShadow(5,0,0,color.INDIGO_DARK_4);
if(d==1) mt[c] = app.CreateText( mi[c] ), mv[d].AddChild(mt[c]), mt[c].index = c, mt[c].SetOnTouch(mt_OnTouch),mt[c].SetTextColor("#ffffff"), mt[c].SetTextShadow(5,0,0,color.INDIGO_DARK_4);
//if(d==0) mv[d].SetSize(-1, 0.45);
//app.AddText( mv[d], mi[c] );
mh[c].AddChild(mv[d]);
}
}
}

function mt_OnTouch(event)
{
self = this;
//alert(self.GetText());
if(event.action == "Down") {
for(rt=0;rt<5;rt++){
mh[rt].SetBackColor("#00000000");
}
mh[self.index].Animate("Rubberband",null, 1250);
mh[self.index].SetBackColor("#a96969ea");
if(mi[self.index]=="Home" ) ChangePage( home, "Home" ),txtMenu.SetText( "[fa-home]" )
//Test below
else if(mi[self.index]=="Settings" ) settings.Show(), txtMenu.SetText( "[fa-arrow-circle-o-left]" )
else /*ChangePage( file, mi[self.index] ),*/ txtMenu.SetText( "[fa-arrow-circle-o-left]" );
    
}

if(event.action == "Up") {
for(rt=0;rt<5;rt++){
//mh[rt].SetBackColor("#00000000");
}
mh[self.index].Animate("Tada",null, 750);
mh[self.index].SetBackColor("#a969ea69");
if(mi[self.index]=="Home" ) ChangePage( home, "Home" ),txtMenu.SetText( "[fa-home]" )
//Test below
else if(mi[self.index]=="Settings" ) settings.Show(), txtMenu.SetText( "[fa-arrow-circle-o-left]" )
else /*ChangePage( file, mi[self.index] ),*/ txtMenu.SetText( "[fa-arrow-circle-o-left]" );
    
}
	//alert(JSON.stringify(event.source));
}
//Called when application is started.
function OnStart()
{    

//alert(localStorage.length);
//alert(JSON.stringify(localStorage));
    //Lock screen orientation to Portrait.
    //app.SetOrientation( "Landscape" );

		utils = app.CreateUtils();
		uix = app.CreateUIExtras();
    
    //Create and set a 'material style' theme.
    CreateTheme();
    
    //Create a local storage folder.
    app.MakeFolder( appPath );
    
	//Create the main app layout with objects vertically centered.
	layMain = app.CreateLayout( "Linear", "FillXY" );
	layMain.SetBackColor( "#ffffff" );

    //Create main controls and menus.
	CreateActionBar();
	CreateMenuBar();
	CreatePageContainer();
	CreateDrawer();
	
	//Create page/dialog objects.
    home = curPage = new Home( appPath, layContent );
    about = new About();
		settings = new Settings();
	  file = new File( appPath, layContent );
	
	//Add main layout and drawer to app.	
	app.AddLayout( layMain );
	app.AddDrawer( drawerScroll, "Left", drawerWidth, drawerWidth/2 );
	
	//List files on menu and show home page.
	ShowFiles();
	home.Show( true, "Home" );
	//home.SetSpinner();
	
	//Detect keyboard showing.
    app.SetOnShowKeyboard( app_OnShowKeyBoard );
    
    //Prevent back key closing the app.
    app.EnableBackKey( false );

	//RenameLP();
	//RenameLGB();
}

function getLocalStorage(lsKey, lsIndex) {
        var ls = localStorage;
        if(ls && ls.getItem(lsKey) ) {
            var lsValue = ls.getItem(lsKey);
            var lsArray = JSON.parse(lsValue);
            if( lsArray['data'] != undefined && lsArray['data'][lsIndex] != undefined){
                return lsArray['data'][lsIndex];
            }
        }
        return '';
}

function getSessionStorage(lsKey, lsIndex) {
        var ls = sessionStorage;
        if(ls && ls.getItem(lsKey) ) {
            var lsValue = ls.getItem(lsKey);
            var lsArray = JSON.parse(lsValue);
            if( lsArray['data'] != undefined && lsArray['data'][lsIndex] != undefined){
                return lsArray['data'][lsIndex];
            }
        }
        return '';
}

Grid_OnTouch = function( fileName )
{
//app.SetClipboardText( fileName );
  //alert( fileName );
	file.SetImage(fileName);
}

Grid_OnLongTouch = function( fileName  )
{
  alert( fileName );
}

//Create area for showing page content.
function CreatePageContainer()
{
    layContent = app.CreateLayout( "Frame", "VCenter,FillXY" );
    layContent.SetSize( 1, 0.95 );
    layMain.AddChild( layContent );
}
   
//Swap the page content.
function ChangePage( page, title, force )
{ 
    //Check for changes.
    if( !force && curPage.IsChanged() )
    {
        var yesNoSave = app.CreateYesNoDialog( "Discard Changes?" );
	    yesNoSave.SetOnTouch( function(ret){if(ret=="Yes") ChangePage(page,title,true)} );
	    yesNoSave.Show();
        return;
    }
    
    //Fade out current content.
    if( home.IsVisible() ) home.Show( false );
    if( file.IsVisible() ) file.Show( false );
    
    //Fade in new content.
    page.Show( true, title );
    
    //Highlight the chosen menu item in the appropriate list.
    if( curMenuList==lstMenuMain ) lstMenuFiles.SelectItemByIndex(-1);
    else lstMenuMain.SelectItemByIndex(-1);
if(typeof(curMenuList.SelectItem) == "function"){
//alert("function");
  curMenuList.SelectItem( title );
  }else{
  //alert("no function");
  lstMenuFiles.SelectItem( title );
  }
    
    //Set title and store current page.
    txtBarTitle.SetText( title );
    curMenu = title;
    curPage = page;
}

//Called when back button is pressed.
function OnBack()
{
    if( file.IsVisible() ) {
        curMenu = "Home";
        ChangePage( home, curMenu );
    }
    else {
        var yesNo = app.CreateYesNoDialog( "Exit the app?" );
    	yesNo.SetOnTouch( function(result){ if(result=="Yes") app.Exit()} );
    	yesNo.Show();
    }
}

//Called when harware menu key pressed.
function OnMenu( name )
{  
   app.OpenDrawer();
}

//Handle soft-keyboard show and hide.
//(Re-size/adjust controls here if required)
function app_OnShowKeyBoard( shown )
{
}

//Create a theme for all controls and dialogs.
function CreateTheme()
{
    theme = app.CreateTheme( "Light" );
    theme.AdjustColor( 35, 0, -10 );
    theme.SetBackColor( "#ffffffff" );
    theme.SetBtnTextColor( "#000000" );
    theme.SetButtonOptions( "custom" );
    theme.SetButtonStyle( "#fafafa","#fafafa",5,"#999999",0,1,"#ff9000" );
    theme.SetCheckBoxOptions( "dark" );
    theme.SetTextEditOptions( "underline" );
    theme.SetDialogColor( "#ffffffff" );
    theme.SetDialogBtnColor( "#ffeeeeee" );
    theme.SetDialogBtnTxtColor( "#ff666666" );
    theme.SetTitleHeight( 42 );
    theme.SetTitleColor( "#ff888888" ); 
    theme.SetTitleDividerColor( "#ff0099CC" );
    theme.SetTextColor( "#000000" );
    app.SetTheme( theme );
}

//Create an action bar at the top.
function CreateActionBar()
{
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz.SetBackGradient("#2063D2","#3174E3", "#4285F4");
    layMain.AddChild( layHoriz );
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-home]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,10,12,10, "dip" );
    txtMenu.SetTextSize( 28 );
    txtMenu.SetTextColor( "#ffffff" );
txtMenu.SetTextShadow( 7,0,0,"#000000" );
    txtMenu.SetOnTouchUp( function(){app.OpenDrawer()} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( "Home", -1,-1, "Left" );
    txtBarTitle.SetMargins(0,6,0,0,"dip");
    txtBarTitle.SetTextSize( 24);
    txtBarTitle.SetTextColor( "#ffffff" );
txtBarTitle.SetTextShadow( 7,0,0,"#000000" );
    layBarTitle.AddChild( txtBarTitle );
    
    
    //Create search icon.
    txtSearch = app.CreateText( "[fa-power-off]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 0,10,0,10, "dip" );
    txtSearch.SetTextSize( 28 );
    txtSearch.SetTextColor( "#ffffff" );
txtSearch.SetTextShadow( 7,0,0,"#000000" );
    txtSearch.SetOnTouchUp( OnBack );
    layHoriz.AddChild( txtSearch );
    
}

//Called when a drawer is opened or closed.
function OnDrawer( side, state )
{
    console.log( side + " : " + state );
}

//Create the drawer contents.
function CreateDrawer()
{
    //Create a layout for the drawer.
	//(Here we also put it inside a scroller to allow for long menus)
	drawerWidth = 0.90;
    drawerScroll = app.CreateScroller( drawerWidth, 1 );
    drawerScroll.SetBackColor( "White" );
	layDrawer = app.CreateLayout( "Linear", "Left" );
	drawerScroll.AddChild( layDrawer );
	
	//Create layout for top of drawer.
	layDrawerTop = app.CreateLayout( "Linear", "Left" );
	layDrawerTop.SetBackGradient("#692063D2","#3174E3", "#4285F4", "top-bottom");
	layDrawerTop.SetSize( drawerWidth );
	layDrawer.AddChild( layDrawerTop );
	
	//Add an icon to top layout.
	var img = app.CreateImage( "Img/Picture Slider Pro.png", 0.15 );
	img.SetMargins( 0.02,0.02,0.02,0.01 );
	layDrawerTop.AddChild( img );
	
	//Add app name to top layout.
	var txtName = app.CreateText( app.GetAppName(),-1,-1,"Bold");
	txtName.SetMargins( 0.04,0.01,0.02,0.02 );
	txtName.SetTextColor( "White" );
	txtName.SetTextSize( 14 );
	layDrawerTop.AddChild( txtName );
	
	//Create menu layout.
	var layMenu = app.CreateLayout( "Linear", "Left" );
	layDrawer.AddChild( layMenu );
	
    //Add a list to menu layout (with the menu style option).
    var listItems = "Home::[fa-home],Scan::[fa-qrcode],About::[fa-question-circle],Settings::[fa-gears],New Gallery::[fa-plus]";
    lstMenuMain = app.CreateList( listItems, drawerWidth, -1, "Menu,Expand" );
    lstMenuMain.SetColumnWidths( -1, 0.35, 0.18 );
    lstMenuMain.SelectItemByIndex( 0, true );
    lstMenuMain.SetItemByIndex( 0, "Home" );
		lstMenuMain.SetIconSize( 28, "dip" );
    lstMenuMain.SetOnTouch( lstMenu_OnTouch );
    layMenu.AddChild( lstMenuMain );
    curMenuList = lstMenuMain;
    
    //Add seperator to menu layout.
    var sep = app.CreateImage( null, drawerWidth,0.001,"fix", 2,2 );
    sep.SetSize( -1, 1, "px" );
    sep.SetColor( "#4285F4" );
    layMenu.AddChild( sep );
    
    //Add title between menus.
	txtTitle = app.CreateText( "Galleries:",-1,-1,"Left");
	txtTitle.SetTextColor( "#666666" );
	txtTitle.SetMargins( 16,12,0,0, "dip" );
	txtTitle.SetTextSize( 14, "dip" );
	layMenu.AddChild( txtTitle );
	
    //Add a second list to menu layout.
    lstMenuFiles = app.CreateList( "", drawerWidth,-1, "Menu,Expand" );
    lstMenuFiles.SetColumnWidths( -1, 0.45, 0.18 );
    lstMenuFiles.SetIconSize( 98, "px" );
    lstMenuFiles.SetOnTouch( lstMenu_OnTouch );
    lstMenuFiles.SetOnLongTouch( lstMenu_OnLongTouch );
    layMenu.AddChild( lstMenuFiles );
}

//Handle menu item selection.
function lstMenu_OnTouch( title, body, type, index )
{
    curMenuList = this;
    
    //Handle New Gallery creation.
    if( title=="New Gallery" ) { 
        //app.ShowTextDialog( "File Name", "", OnAdd );
				var dir = "/storage/emulated/0";
				OnSelect(dir+"/"+prompt("Enter the name:","Rachel Hunter"));
				//app.ChooseFolder(1,0.8,OnSelect,dir);
        return;
    }
    else if( title=="About" ) {
        about.Show();
        app.CloseDrawer( "Left" );
        return;
    }

else if( title=="Settings" ) {
        settings.Show();
        app.CloseDrawer( "Left" );
        return;
    }
    
    //Handle page changes.
    curMenu = title;
    if( title=="Home" ) ChangePage( home, title );
    else ChangePage( file, title );
    
    //Close the drawer.
    app.CloseDrawer( "Left" );
}

//Handle menu long press.
function lstMenu_OnLongTouch( title, body, type, index )
{
    curMenuList = this;
    curMenu = title;
    
    //Show options dialog.
    var sOps = "Rename,Delete" 
    lstOps = app.CreateListDialog( "Actions", sOps, "AutoCancel" );
    lstOps.SetOnTouch( lstOps_Select ); 
    lstOps.Show();
}

//Handle menu item selection.
function lstOps_Select( item )
{
    if( item=="Delete" ) 
    {
        var msg = "Are you sure you want to delete '" + curMenu + "' ?"
        yesNo = app.CreateYesNoDialog( msg );
        yesNo.SetOnTouch( yesNoDelete_OnTouch );
        yesNo.Show();
    }
    else if( item=="Rename" ) {
        app.ShowTextDialog( "Rename Program", curMenu, OnRename );
    }
}

//Handle delete 'are you sure' dialog.
function yesNoDelete_OnTouch( result )
{
    if( result=="Yes" ) 
    {
        //Delete the file and refresh list.
        app.DeleteFolder( appPath+"/" + curMenu );
        ShowFiles();
        ChangePage( home, "Home" );
    }
}

//Called after user enters renamed program.
function OnRename( name )
{
    //Check up name.
	if( !isValidFileName(name) ) {
		alert( "Name contains invalid characters!" );
		app.ShowTextDialog( "Rename Program", curMenu, "OnRename" );
		return;
	}
	
    //Check if already exists.
    var fldr = appPath+"/"+name;
    if( app.FolderExists( fldr ) ) {
        app.Alert( "App already exists!" );
    }
    else {
        //Rename the .json data file.
        var oldfile = appPath+"/"+curMenu+"/"+curMenu+".json";
        var newfile = appPath+"/"+curMenu +"/"+name+".json";
        if( app.FileExists( oldfile ) ) app.RenameFile( oldfile, newfile );
        
        //Rename folder and refresh list.
        app.RenameFile( appPath+"/"+curMenu, appPath+"/"+name );
        ShowFiles();
        ChangePage( file, name );
    }
}

//Called after user enters New Gallery name.
function OnAdd( name, type )
{
	//Check up name.
	if( !isValidFileName(name) ) {
		alert( "Name contains invalid characters!" );
		app.ShowTextDialog( "File Name", "", OnAdd );
		return;
	}
    var fldr = appPath+"/"+name;
    if( app.FolderExists( fldr ) ) {
        app.Alert( "App already exists!" );
    }
    else {
        app.MakeFolder( fldr );
        app.MakeFolder( fldr +"/Img" );
        
        //Start New Gallery and refresh list.
        curMenuList = lstMenuFiles;
        ChangePage( file, name );
        file.Save();
        ShowFiles();
    }
    app.CloseDrawer( "Left" );
}

function OnSelect(fol) {
		//app.Alert(fol);
	name = fol.split("/")[fol.split("/").length-1];
  var fldr = appPath+"/"+name;
    if( app.FolderExists( fldr ) ) {
        app.Alert( "App already exists!" );
    }
    else {
        app.MakeFolder( fldr );
        app.MakeFolder( fldr +"/Img" );
        
        //Start New Gallery and refresh list.
        curMenuList = lstMenuFiles;
				currentPath = fol;
        ChangePage( file, name );
        file.Save();
        ShowFiles();
    }
    app.CloseDrawer( "Left" );
}

//Get user files list.
function GetFileList()
{    
    var fileList = "";
    var list = app.ListFolder( appPath,"",0,"alphasort");
    for( var i=0; i<list.length; i++ )
    {
        if( app.FileExists( appPath+"/"+list[i]+"/"+list[i]+".json" ) ) 
		{
            if( fileList.length>0 ) fileList += ",";
            fileList += list[i];
        }
    }
    return fileList;
}

//Update menus to show list of file.
function ShowFilesOld()
{
    //Get list of user's file.
    var fileList = GetFileList().split(",");
    
    //Create a menu item for each app.
    var  list = "";
    var list1 = "";
    for( var i=0; i<fileList.length && fileList[0]!=""; i++ )
    {
        if( list.length>0 ) list += ",", list1 += ",";
				var settings = JSON.parse(app.ReadFile(appPath+"/"+fileList[i]+"/"+fileList[i]+".json"));
        list += fileList[i] + ":" + settings.image; //"::[fa-file]";
        list1 += fileList[i];
    }
    lstMenuFiles.SetList( list );
    home.SetSpinner( list1 );
}

//Update menus to show list of file.
function ShowFiles()
{
		app.ShowProgress();
    //Get list of user's file.
    var fileList = GetFileList().split(",");
    
    //Create a menu item for each app.
    var  list = "", list1 = "";
    for( var i=0; i<fileList.length && fileList[0]!=""; i++ )
    {
        if( list.length>0 ) list += ",",list1 += ",";
        //list += fileList[i] + "::[fa-file]";
        list += fileList[i] + GetOnePic(fileList[i]);
        list1 += fileList[i];
        //app.Wait(2);
    }
		
		app.HideProgress();
    lstMenuFiles.SetList( list );
    home.SetSpinner( list1 );
		app.WriteFile( "ShowFiles.json", JSON.stringify(list), "Write" );
}

function GetOnePic(name)
{
appPathImg = appPath + "/" + name + "/Img";
app.MakeFolder( appPathImg )
if(!app.FileExists( appPathImg + "/" + name + ".png" )){
app.ShowPopup( "Creating " + name, "Bottom" );
//aa = app.ReadFile( appPath+"/"+name+"/"+name+".json" );
if (webserver1 == null) {webserver1 = app.CreateWebServer( 6969, "ListDir" );}else{webserver1.Stop();webserver1.Disconnect( app.GetIPAddress()  );webserver1 = app.CreateWebServer(6969,"ListDir");}
webserver1.SetFolder( "/storage/emulated/0/" + name );
webserver1.Start();
	f = "" + app.ListFolder( "/storage/emulated/0/" + name, ".jpg", 0);
/*  Picasso.get().fit()
   .load( "http://" + app.GetIPAddress() + ":" + "6969" + "/" + f.split(",")[2]+"".replace(" ", "%20").replace(" ", "%20").replace(" ","%20").replace(" ","%20"))
	 .transform( "circle" )
   .save( appPathImg + "/" + name + ".png", img_Saved );
   app.Wait( 3 );*/
   /*Picasso.get()
 	.fit()
   .load( "http://" + app.GetIPAddress() + ":" + "6969" + "/" + f.split(",")[3].replace(" ", "%20").replace(" ", "%20").replace(" ","%20").replace(" ","%20"))
	 .transform( "circle" )
   .save( appPathImg + "/" + name + ".png", img_Saved );
   app.Wait( 4 );*/
   //app.OpenUrl( "http://" + app.GetIPAddress() + ":" + "6969" + "/" + f[1].replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20"));
//}else{
//GetOnePic(name);
//app.Wait( 7 );
//app.OpenUrl( "http://" + app.GetIPAddress() + ":" + "6969" + "/" + f.split(",")[7].replace(" ", "%20").replace(" ", "%20").replace(" ", "%20").replace(" ", "%20"));
}/*else{return GetOnePic(name);}*/

	return "::" + appPathImg + "/" + name + ".png";
}

function img_Saved(res)
{
	app.ShowPopup( res);
}