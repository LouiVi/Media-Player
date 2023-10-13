/*
Main Script
Not Commented
Copyright of
https://hjcdstudios.github.io

callback wont be called if canceled

methods:
app.ChooseFolder(width,height,callback,directory);
width: fraction 0...1
height: fraction 0...1
callback: function(selected); selected: absolute directory
directory: needs to be absolute for ex: /Storage
*/
app.ChooseFolder = function(aa,ab,ac,ad) {
		return new _CFL(aa,ab,ac,ad,);
}
function _CFL(w,h,callback,di) {
		var dir = "/storage";
		dir = di;
		var fold = app.ListFolder(dir,null,null,"Folders,Alphasort");
		var TM = "Already at the top";
		
		var dlg = app.CreateDialog(dir);
		
		var lay_d = app.CreateLayout("Linear","Vertical");

		if(dir == "/storage/emulated" && fold == "") fold += "0";
		
		var list = app.CreateList(fold,w,h);
		list.SetOnTouch(function(item) {
				dir = dir += "/" + item;
				fold = app.ListFolder(dir,null,null,"Folders,Alphasort");
				if(dir == "/storage/emulated" && fold == "") fold += "0";
				dlg.SetTitle(dir);
				list.SetList(fold);
		});
		lay_d.AddChild(list);
		
		var lay_btns = app.CreateLayout("Linear","Horizontal");
		
		var btn_cancel = app.CreateButton("Cancel");
		btn_cancel.SetOnTouch(function() {
				dlg.Dismiss();
		});
		lay_btns.AddChild(btn_cancel);
		
		var btn_select = app.CreateButton("Select");
		btn_select.SetOnTouch(function() {
				callback(dir);
				dlg.Dismiss();
		});
		lay_btns.AddChild(btn_select);
		
		var btn_upper = app.CreateButton("Upper Folder");
		btn_upper.SetOnTouch(function() {
				if (dir != "/storage" && dir != "/storage/" && dir != "/sdcard/" && dir != "/sdcard") {
						dir = dir.slice(0,dir.lastIndexOf("/"));
						fold = app.ListFolder(dir,null,null,"Folders,Alphasort");
						if(dir == "/storage/emulated" && fold == "") fold += "0";
						dlg.SetTitle(dir);
						list.SetList(fold);
				} else {
						app.ShowPopup(TM,"Bottom,Short");
				}
		});
		lay_btns.AddChild(btn_upper);
		
		lay_d.AddChild(lay_btns);
		
		dlg.AddLayout(lay_d);
		dlg.Show();
		
		this.SetDirectory = function(aa) {
				dir = aa;
		}
		this.SetSize = function(aa,ab,ac) {
				list.SetSize(aa,ab,ac);
		}
		this.SetTopMsg = function(aa) {
				TM = aa;
		}
}
//Demo on how to use
function OnStartxx() {
		var dir = "/storage/emulated/0";
		app.ChooseFolder(1,0.8,OnSelectx,dir);
}
function OnSelectx(fol) {
		app.Alert(fol);
}