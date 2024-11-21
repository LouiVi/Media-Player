
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