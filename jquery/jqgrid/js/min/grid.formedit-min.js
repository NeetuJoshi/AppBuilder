/*
 * jqGrid extension for form editing Grid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 */
;(function(a){var t=null;a.fn.extend({searchGrid:function(e){e=a.extend({top:0,left:0,width:360,height:80,modal:false,drag:true,closeicon:'ico-close.gif',dirty:false,sField:'searchField',sValue:'searchString',sOper:'searchOper',processData:"",checkInput:false,beforeShowSearch:null,afterShowSearch:null,onInitializeSearch:null,sopt:null},a.jgrid.search,e||{});return this.each(function(){var b=this;if(!b.grid){return}if(!e.imgpath){e.imgpath=b.p.imgpath}var d=a("table:first",b.grid.bDiv).attr("id");var k={themodal:'srchmod'+d,modalhead:'srchhead'+d,modalcontent:'srchcnt'+d};if(a("#"+k.themodal).html()!=null){if(a.isFunction('beforeShowSearch')){e.beforeShowSearch(a("#srchcnt"+d))}viewModal("#"+k.themodal,{modal:e.modal});if(a.isFunction('afterShowSearch')){e.afterShowSearch(a("#srchcnt"+d))}}else{var m=b.p.colModel;var f="<select id='snames' class='search'>";var j,o,i;for(var p=0;p<m.length;p++){j=m[p].name;i=(m[p].search===false)?false:true;if(m[p].editrules&&m[p].editrules.searchhidden===true){o=true}else{if(m[p].hidden===true){o=false}else{o=true}}if(j!=='cb'&&j!=='subgrid'&&i&&o===true){var w=(m[p].index)?m[p].index:j;f+="<option value='"+w+"'>"+b.p.colNames[p]+"</option>"}}f+="</select>";var g=e.sopt||['bw','eq','ne','lt','le','gt','ge','ew','cn'];var q="<select id='sopt' class='search'>";for(var p=0;p<g.length;p++){q+=g[p]=='eq'?"<option value='eq'>"+e.odata[0]+"</option>":"";q+=g[p]=='ne'?"<option value='ne'>"+e.odata[1]+"</option>":"";q+=g[p]=='lt'?"<option value='lt'>"+e.odata[2]+"</option>":"";q+=g[p]=='le'?"<option value='le'>"+e.odata[3]+"</option>":"";q+=g[p]=='gt'?"<option value='gt'>"+e.odata[4]+"</option>":"";q+=g[p]=='ge'?"<option value='ge'>"+e.odata[5]+"</option>":"";q+=g[p]=='bw'?"<option value='bw'>"+e.odata[6]+"</option>":"";q+=g[p]=='ew'?"<option value='ew'>"+e.odata[7]+"</option>":"";q+=g[p]=='cn'?"<option value='cn'>"+e.odata[8]+"</option>":""};q+="</select>";var y="<input id='sval' class='search' type='text' size='20' maxlength='100'/>";var l="<input id='sbut' class='buttonsearch' type='button' value='"+e.Find+"'/>";var x="<input id='sreset' class='buttonsearch' type='button' value='"+e.Reset+"'/>";var u=a("<table width='100%'><tbody><tr style='display:none' id='srcherr'><td colspan='5'></td></tr><tr><td>"+f+"</td><td>"+q+"</td><td>"+y+"</td><td>"+l+"</td><td>"+x+"</td></tr></tbody></table>");createModal(k,u,e,b.grid.hDiv,b.grid.hDiv);if(a.isFunction('onInitializeSearch')){e.onInitializeSearch(a("#srchcnt"+d))};if(a.isFunction('beforeShowSearch')){e.beforeShowSearch(a("#srchcnt"+d))};viewModal("#"+k.themodal,{modal:e.modal});if(a.isFunction('afterShowSearch')){e.afterShowSearch(a("#srchcnt"+d))}if(e.drag){DnRModal("#"+k.themodal,"#"+k.modalhead+" td.modaltext")}a("#sbut","#"+k.themodal).click(function(){if(a("#sval","#"+k.themodal).val()!=""){var h=[true,"",""];a("#srcherr >td","#srchcnt"+d).html("").hide();b.p.searchdata[e.sField]=a("option[selected]","#snames").val();b.p.searchdata[e.sOper]=a("option[selected]","#sopt").val();b.p.searchdata[e.sValue]=a("#sval","#"+k.modalcontent).val();if(e.checkInput){for(var c=0;c<m.length;c++){var r=(m[c].index)?m[c].index:j;if(r==b.p.searchdata[e.sField]){break}}h=checkValues(b.p.searchdata[e.sValue],c,b)}if(h[0]===true){b.p.search=true;if(e.dirty){a(".no-dirty-cell",b.p.pager).addClass("dirty-cell")}b.p.page=1;a(b).trigger("reloadGrid")}else{a("#srcherr >td","#srchcnt"+d).html(h[1]).show()}}});a("#sreset","#"+k.themodal).click(function(){if(b.p.search){a("#srcherr >td","#srchcnt"+d).html("").hide();b.p.search=false;b.p.searchdata={};b.p.page=1;a("#sval","#"+k.themodal).val("");if(e.dirty){a(".no-dirty-cell",b.p.pager).removeClass("dirty-cell")}a(b).trigger("reloadGrid")}})}})},editGridRow:function(z,s){s=a.extend({top:0,left:0,width:0,height:0,modal:false,drag:true,closeicon:'ico-close.gif',imgpath:'',url:null,mtype:"POST",closeAfterAdd:false,clearAfterAdd:true,closeAfterEdit:false,reloadAfterSubmit:true,onInitializeForm:null,beforeInitData:null,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,afterSubmit:null,onclickSubmit:null,afterComplete:null,onclickPgButtons:null,afterclickPgButtons:null,editData:{},recreateForm:false,addedrow:"first"},a.jgrid.edit,s||{});t=s;return this.each(function(){var l=this;if(!l.grid||!z){return}if(!s.imgpath){s.imgpath=l.p.imgpath}var x=a("table:first",l.grid.bDiv).attr("id");var u={themodal:'editmod'+x,modalhead:'edithd'+x,modalcontent:'editcnt'+x};var e=a.isFunction(t.beforeShowForm)?t.beforeShowForm:false;var A=a.isFunction(t.afterShowForm)?t.afterShowForm:false;var B=a.isFunction(t.beforeInitData)?t.beforeInitData:false;var G=a.isFunction(t.onInitializeForm)?t.onInitializeForm:false;if(z=="new"){z="_empty";s.caption=s.addCaption}else{s.caption=s.editCaption};var v="FrmGrid_"+x;var n="TblGrid_"+x;if(s.recreateForm===true&&a("#"+u.themodal).html()!=null){a("#"+u.themodal).remove()}if(a("#"+u.themodal).html()!=null){a(".modaltext","#"+u.modalhead).html(s.caption);a("#FormError","#"+n).hide();if(B){B(a("#"+v))}D(z,l);if(z=="_empty"){a("#pData, #nData","#"+n).hide()}else{a("#pData, #nData","#"+n).show()}if(e){e(a("#"+v))}viewModal("#"+u.themodal,{modal:s.modal});if(A){A(a("#"+v))}}else{var H=a("<form name='FormPost' id='"+v+"' class='FormGrid'></form>");var C=a("<table id='"+n+"' class='EditTable' cellspacing='0' cellpading='0' border='0'><tbody></tbody></table>");a(H).append(C);a(C).append("<tr id='FormError' style='display:none'><td colspan='2'>&nbsp;</td></tr>");if(B){B(a("#"+v))}var K=L(z,l,C);var I=l.p.imgpath;var M="<img id='pData' src='"+I+l.p.previmg+"'/>";var N="<img id='nData' src='"+I+l.p.nextimg+"'/>";var O="<input id='sData' type='button' class='EditButton' value='"+s.bSubmit+"'/>";var P="<input id='cData' type='button'  class='EditButton' value='"+s.bCancel+"'/>";a(C).append("<tr id='Act_Buttons'><td class='navButton'>"+M+"&nbsp;"+N+"</td><td class='EditButton'>"+O+"&nbsp;"+P+"</td></tr>");createModal(u,H,s,l.grid.hDiv,l.grid.hDiv);if(G){G(a("#"+v))}if(s.drag){DnRModal("#"+u.themodal,"#"+u.modalhead+" td.modaltext")}if(z=="_empty"){a("#pData,#nData","#"+n).hide()}else{a("#pData,#nData","#"+n).show()}if(e){e(a("#"+v))}viewModal("#"+u.themodal,{modal:s.modal});if(A){A(a("#"+v))}a("#sData","#"+n).click(function(m){var f={},j=[true,"",""],o={};a("#FormError","#"+n).hide();var i=0;a(".FormElement","#"+n).each(function(r){var b=true;switch(a(this).get(0).type){case"checkbox":if(a(this).attr("checked")){f[this.name]=a(this).val()}else{var d=a(this).attr("offval");f[this.name]=d;o[this.name]=d}break;case"select-one":f[this.name]=a("option:selected",this).val();o[this.name]=a("option:selected",this).text();break;case"select-multiple":f[this.name]=a(this).val();var k=[];a("option:selected",this).each(function(h,c){k[h]=a(c).text()});o[this.name]=k.join(",");break;case"password":case"text":case"textarea":f[this.name]=a(this).val();j=checkValues(f[this.name],K[r],l);if(j[0]===false){b=false}else{f[this.name]=htmlEncode(f[this.name])}break}i++;if(!b){return false}});if(i==0){j[0]=false;j[1]=a.jgrid.errors.norecords}if(a.isFunction(t.onclickSubmit)){t.editData=t.onclickSubmit(s)||{}}if(j[0]){if(a.isFunction(t.beforeSubmit)){j=t.beforeSubmit(f,a("#"+v))}}var p=t.url?t.url:l.p.editurl;if(j[0]){if(!p){j[0]=false;j[1]+=" "+a.jgrid.errors.nourl}}if(j[0]===false){a("#FormError>td","#"+n).html(j[1]);a("#FormError","#"+n).show()}else{if(!s.processing){s.processing=true;a("div.loading","#"+u.themodal).fadeIn("fast");a(this).attr("disabled",true);f.oper=f.id=="_empty"?"add":"edit";f=a.extend(f,t.editData);a.ajax({url:p,type:t.mtype,data:f,complete:function(c,r){if(r!="success"){j[0]=false;j[1]=r+" Status: "+c.statusText+" Error code: "+c.status}else{if(a.isFunction(t.afterSubmit)){j=t.afterSubmit(c,f)}}if(j[0]===false){a("#FormError>td","#"+n).html(j[1]);a("#FormError","#"+n).show()}else{f=a.extend(f,o);if(f.id=="_empty"){if(!j[2]){j[2]=parseInt(a(l).getGridParam('records'))+1}f.id=j[2];if(t.closeAfterAdd){if(t.reloadAfterSubmit){a(l).trigger("reloadGrid")}else{a(l).addRowData(j[2],f,s.addedrow);a(l).setSelection(j[2])}hideModal("#"+u.themodal)}else if(t.clearAfterAdd){if(t.reloadAfterSubmit){a(l).trigger("reloadGrid")}else{a(l).addRowData(j[2],f,s.addedrow)}a(".FormElement","#"+n).each(function(h){switch(a(this).get(0).type){case"checkbox":a(this).attr("checked",0);break;case"select-one":case"select-multiple":a("option",this).attr("selected","");break;case"password":case"text":case"textarea":if(this.name=='id'){a(this).val("_empty")}else{a(this).val("")}break}})}else{if(t.reloadAfterSubmit){a(l).trigger("reloadGrid")}else{a(l).addRowData(j[2],f,s.addedrow)}}}else{if(t.reloadAfterSubmit){a(l).trigger("reloadGrid");if(!t.closeAfterEdit){a(l).setSelection(f.id)}}else{if(l.p.treeGrid===true){a(l).setTreeRow(f.id,f)}else{a(l).setRowData(f.id,f)}}if(t.closeAfterEdit){hideModal("#"+u.themodal)}}if(a.isFunction(t.afterComplete)){setTimeout(function(){t.afterComplete(c,f,a("#"+v))},500)}}s.processing=false;a("#sData","#"+n).attr("disabled",false);a("div.loading","#"+u.themodal).fadeOut("fast")}})}}m.stopPropagation()});a("#cData","#"+n).click(function(h){hideModal("#"+u.themodal);h.stopPropagation()});a("#nData","#"+n).click(function(h){a("#FormError","#"+n).hide();var c=E();c[0]=parseInt(c[0]);if(c[0]!=-1&&c[1][c[0]+1]){if(a.isFunction(s.onclickPgButtons)){s.onclickPgButtons('next',a("#"+v),c[1][c[0]])}D(c[1][c[0]+1],l);a(l).setSelection(c[1][c[0]+1]);if(a.isFunction(s.afterclickPgButtons)){s.afterclickPgButtons('next',a("#"+v),c[1][c[0]+1])}F(c[0]+1,c[1].length-1)};return false});a("#pData","#"+n).click(function(h){a("#FormError","#"+n).hide();var c=E();if(c[0]!=-1&&c[1][c[0]-1]){if(a.isFunction(s.onclickPgButtons)){s.onclickPgButtons('prev',a("#"+v),c[1][c[0]])}D(c[1][c[0]-1],l);a(l).setSelection(c[1][c[0]-1]);if(a.isFunction(s.afterclickPgButtons)){s.afterclickPgButtons('prev',a("#"+v),c[1][c[0]-1])}F(c[0]-1,c[1].length-1)};return false})};var J=E();F(J[0],J[1].length-1);function F(h,c,r){var b=l.p.imgpath;if(h==0){a("#pData","#"+n).attr("src",b+"off-"+l.p.previmg)}else{a("#pData","#"+n).attr("src",b+l.p.previmg)}if(h==c){a("#nData","#"+n).attr("src",b+"off-"+l.p.nextimg)}else{a("#nData","#"+n).attr("src",b+l.p.nextimg)}};function E(){var h=a(l).getDataIDs();var c=a("#id_g","#"+n).val();var r=a.inArray(c,h);return[r,h]};function L(r,b,d){var k,m,f,j,o,i=0,p,w,g,q=[];a('#'+r+' td',b.grid.bDiv).each(function(h){k=b.p.colModel[h].name;if(b.p.colModel[h].editrules&&b.p.colModel[h].editrules.edithidden==true){m=false}else{m=b.p.colModel[h].hidden===true?true:false}w=m?"style='display:none'":"";if(k!=='cb'&&k!=='subgrid'&&b.p.colModel[h].editable===true){if(k==b.p.ExpandColumn&&b.p.treeGrid===true){p=a(this).text()}else{try{p=a.unformat(this,{colModel:b.p.colModel[h]},h)}catch(_){p=a.htmlDecode(a(this).html())}}var c=a.extend(b.p.colModel[h].editoptions||{},{id:k,name:k});if(!b.p.colModel[h].edittype)b.p.colModel[h].edittype="text";g=createEl(b.p.colModel[h].edittype,c,p);a(g).addClass("FormElement");f=a("<tr "+w+"></tr>").addClass("FormData").attr("id","tr_"+k);j=a("<td></td>").addClass("CaptionTD");o=a("<td></td>").addClass("DataTD");a(j).html(b.p.colNames[h]+": ");a(o).append(g);f.append(j);f.append(o);if(d){a(d).append(f)}else{a(f).insertBefore("#Act_Buttons")}q[i]=h;i++}});if(i>0){var y=a("<tr class='FormData' style='display:none'><td class='CaptionTD'>&nbsp;</td><td class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+r+"'/></td></tr>");if(d){a(d).append(y)}else{a(y).insertBefore("#Act_Buttons")}}return q};function D(r,b){var d,k,m=0,f;a('#'+r+' td',b.grid.bDiv).each(function(c){d=b.p.colModel[c].name;if(b.p.colModel[c].editrules&&b.p.colModel[c].editrules.edithidden===true){k=false}else{k=b.p.colModel[c].hidden===true?true:false}if(d!=='cb'&&d!=='subgrid'&&b.p.colModel[c].editable===true){if(d==b.p.ExpandColumn&&b.p.treeGrid===true){f=a(this).text()}else{try{f=a.unformat(this,{colModel:b.p.colModel[c]},c)}catch(_){f=a.htmlDecode(a(this).html())}}switch(b.p.colModel[c].edittype){case"password":case"text":f=a.htmlDecode(f);a("#"+d,"#"+n).val(f);break;case"textarea":if(f=="&nbsp;"||f=="&#160;"){f=''}a("#"+d,"#"+n).val(f);break;case"select":a("#"+d+" option","#"+n).each(function(h){if(!b.p.colModel[c].editoptions.multiple&&f==a(this).text()){this.selected=true}else if(b.p.colModel[c].editoptions.multiple){if(a.inArray(a(this).text(),f.split(","))>-1){this.selected=true}else{this.selected=false}}else{this.selected=false}});break;case"checkbox":if(f==a("#"+d,"#"+n).val()){a("#"+d,"#"+n).attr("checked",true);a("#"+d,"#"+n).attr("defaultChecked",true)}else{a("#"+d,"#"+n).attr("checked",false);a("#"+d,"#"+n).attr("defaultChecked","")}break}if(k){a("#"+d,"#"+n).parents("tr:first").hide()}m++}});if(m>0){a("#id_g","#"+n).val(r)}else{a("#id_g","#"+n).val("")}return m}})},delGridRow:function(u,e){e=a.extend({top:0,left:0,width:240,height:90,modal:false,drag:true,closeicon:'ico-close.gif',imgpath:'',url:'',mtype:"POST",reloadAfterSubmit:true,beforeShowForm:null,afterShowForm:null,beforeSubmit:null,onclickSubmit:null,afterSubmit:null,onclickSubmit:null,delData:{}},a.jgrid.del,e||{});return this.each(function(){var o=this;if(!o.grid){return}if(!u){return}if(!e.imgpath){e.imgpath=o.p.imgpath}var i=typeof e.beforeShowForm==='function'?true:false;var p=typeof e.afterShowForm==='function'?true:false;if(isArray(u)){u=u.join()}var w=a("table:first",o.grid.bDiv).attr("id");var g={themodal:'delmod'+w,modalhead:'delhd'+w,modalcontent:'delcnt'+w};var q="DelTbl_"+w;if(a("#"+g.themodal).html()!=null){a("#DelData>td","#"+q).text(u);a("#DelError","#"+q).hide();if(i){e.beforeShowForm(a("#"+q))}viewModal("#"+g.themodal,{modal:e.modal});if(p){e.afterShowForm(a("#"+q))}}else{var y=a("<table id='"+q+"' class='DelTable'><tbody></tbody></table>");a(y).append("<tr id='DelError' style='display:none'><td >&nbsp;</td></tr>");a(y).append("<tr id='DelData' style='display:none'><td >"+u+"</td></tr>");a(y).append("<tr><td >"+e.msg+"</td></tr>");var l="<input id='dData' type='button' value='"+e.bSubmit+"'/>";var x="<input id='eData' type='button' value='"+e.bCancel+"'/>";a(y).append("<tr><td class='DelButton'>"+l+"&nbsp;"+x+"</td></tr>");createModal(g,y,e,o.grid.hDiv,o.grid.hDiv);if(e.drag){DnRModal("#"+g.themodal,"#"+g.modalhead+" td.modaltext")}a("#dData","#"+q).click(function(d){var k=[true,""];var m=a("#DelData>td","#"+q).text();if(typeof e.onclickSubmit==='function'){e.delData=e.onclickSubmit(e)||{}}if(typeof e.beforeSubmit==='function'){k=e.beforeSubmit(m)}var f=e.url?e.url:o.p.editurl;if(!f){k[0]=false;k[1]+=" "+a.jgrid.errors.nourl}if(k[0]===false){a("#DelError>td","#"+q).html(k[1]);a("#DelError","#"+q).show()}else{if(!e.processing){e.processing=true;a("div.loading","#"+g.themodal).fadeIn("fast");a(this).attr("disabled",true);var j=a.extend({oper:"del",id:m},e.delData);a.ajax({url:f,type:e.mtype,data:j,complete:function(h,c){if(c!="success"){k[0]=false;k[1]=c+" Status: "+h.statusText+" Error code: "+h.status}else{if(typeof e.afterSubmit==='function'){k=e.afterSubmit(h,m)}}if(k[0]===false){a("#DelError>td","#"+q).html(k[1]);a("#DelError","#"+q).show()}else{if(e.reloadAfterSubmit){if(o.p.treeGrid){a(o).setGridParam({treeANode:0,datatype:o.p.treedatatype})}a(o).trigger("reloadGrid")}else{var r=[];r=m.split(",");if(o.p.treeGrid===true){try{a(o).delTreeNode(r[0])}catch(d){}}else{for(var b=0;b<r.length;b++){a(o).delRowData(r[b])}}o.p.selrow=null;o.p.selarrrow=[]}if(a.isFunction(e.afterComplete)){setTimeout(function(){e.afterComplete(h,m)},500)}}e.processing=false;a("#dData","#"+q).attr("disabled",false);a("div.loading","#"+g.themodal).fadeOut("fast");if(k[0]){hideModal("#"+g.themodal)}}})}}return false});a("#eData","#"+q).click(function(h){hideModal("#"+g.themodal);return false});if(i){e.beforeShowForm(a("#"+q))}viewModal("#"+g.themodal,{modal:e.modal});if(p){e.afterShowForm(a("#"+q))}}})},navGrid:function(w,g,q,y,l,x){g=a.extend({edit:true,editicon:"row_edit.gif",add:true,addicon:"row_add.gif",del:true,delicon:"row_delete.gif",search:true,searchicon:"find.gif",refresh:true,refreshicon:"refresh.gif",refreshstate:'firstpage',position:"left",closeicon:"ico-close.gif"},a.jgrid.nav,g||{});return this.each(function(){var b={themodal:'alertmod',modalhead:'alerthd',modalcontent:'alertcnt'};var d=this;if(!d.grid){return}if(a("#"+b.themodal).html()==null){var k;var m;if(typeof window.innerWidth!='undefined'){k=window.innerWidth,m=window.innerHeight}else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){k=document.documentElement.clientWidth,m=document.documentElement.clientHeight}else{k=1024;m=768}createModal(b,"<div>"+g.alerttext+"</div>",{imgpath:d.p.imgpath,closeicon:g.closeicon,caption:g.alertcap,top:m/2-25,left:k/2-100,width:200,height:50},d.grid.hDiv,d.grid.hDiv,true);DnRModal("#"+b.themodal,"#"+b.modalhead)}var f=a("<table cellspacing='0' cellpadding='0' border='0' class='navtable'><tbody></tbody></table>").height(20);var j=document.createElement("tr");a(j).addClass("nav-row");var o=d.p.imgpath;var i;if(g.add){i=document.createElement("td");a(i).append("&nbsp;").css({border:"none",padding:"0px"});j.appendChild(i);i=document.createElement("td");i.title=g.addtitle||"";a(i).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+o+g.addicon+"'/></td><td>"+g.addtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){if(typeof g.addfunc=='function'){g.addfunc()}else{a(d).editGridRow("new",y||{})}return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});j.appendChild(i);i=null}if(g.edit){i=document.createElement("td");a(i).append("&nbsp;").css({border:"none",padding:"0px"});j.appendChild(i);i=document.createElement("td");i.title=g.edittitle||"";a(i).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+o+g.editicon+"'/></td><td valign='center'>"+g.edittext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var h=a(d).getGridParam('selrow');if(h){if(typeof g.editfunc=='function'){g.editfunc(h)}else{a(d).editGridRow(h,q||{})}}else{viewModal("#"+b.themodal)}return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});j.appendChild(i);i=null}if(g.del){i=document.createElement("td");a(i).append("&nbsp;").css({border:"none",padding:"0px"});j.appendChild(i);i=document.createElement("td");i.title=g.deltitle||"";a(i).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+o+g.delicon+"'/></td><td>"+g.deltext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){var h;if(d.p.multiselect){h=a(d).getGridParam('selarrrow');if(h.length==0){h=null}}else{h=a(d).getGridParam('selrow')}if(h){a(d).delGridRow(h,l||{})}else{viewModal("#"+b.themodal)}return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});j.appendChild(i);i=null}if(g.search){i=document.createElement("td");a(i).append("&nbsp;").css({border:"none",padding:"0px"});j.appendChild(i);i=document.createElement("td");if(a(w)[0]==d.p.pager[0]){x=a.extend(x,{dirty:true})}i.title=g.searchtitle||"";a(i).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td class='no-dirty-cell'><img src='"+o+g.searchicon+"'/></td><td>"+g.searchtext+"&nbsp;</td></tr></table>").css({cursor:"pointer"}).addClass("nav-button").click(function(){a(d).searchGrid(x||{});return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});j.appendChild(i);i=null}if(g.refresh){i=document.createElement("td");a(i).append("&nbsp;").css({border:"none",padding:"0px"});j.appendChild(i);i=document.createElement("td");i.title=g.refreshtitle||"";var p=(a(w)[0]==d.p.pager[0])?true:false;a(i).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td><img src='"+o+g.refreshicon+"'/></td><td>"+g.refreshtext+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(){d.p.search=false;switch(g.refreshstate){case'firstpage':d.p.page=1;a(d).trigger("reloadGrid");break;case'current':var c=d.p.multiselect===true?selarrrow:d.p.selrow;a(d).setGridParam({gridComplete:function(){if(d.p.multiselect===true){if(c.length>0){for(var h=0;h<c.length;h++){a(d).setSelection(c[h])}}}else{if(c){a(d).setSelection(c)}}}});a(d).trigger("reloadGrid");break}if(p){a(".no-dirty-cell",d.p.pager).removeClass("dirty-cell")}if(g.search){var r=a("table:first",d.grid.bDiv).attr("id");a("#sval",'#srchcnt'+r).val("")}return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});j.appendChild(i);i=null}if(g.position=="left"){a(f).append(j).addClass("nav-table-left")}else{a(f).append(j).addClass("nav-table-right")}a(w).prepend(f)})},navButtonAdd:function(m,f){f=a.extend({caption:"newButton",title:'',buttonimg:'',onClickButton:null,position:"last"},f||{});return this.each(function(){if(!this.grid){return}if(m.indexOf("#")!=0){m="#"+m}var c=a(".navtable",m)[0];if(c){var r,b;var b=document.createElement("td");a(b).append("&nbsp;").css({border:"none",padding:"0px"});var d=a("tr:eq(0)",c)[0];if(f.position!='first'){d.appendChild(b)}tbd=document.createElement("td");tbd.title=f.title;var k=(f.buttonimg)?"<img src='"+f.buttonimg+"'/>":"&nbsp;";a(tbd).append("<table cellspacing='0' cellpadding='0' border='0' class='tbutton'><tr><td>"+k+"</td><td>"+f.caption+"&nbsp;</td></tr></table>").css("cursor","pointer").addClass("nav-button").click(function(h){if(typeof f.onClickButton=='function'){f.onClickButton()}h.stopPropagation();return false}).hover(function(){a(this).addClass("nav-hover")},function(){a(this).removeClass("nav-hover")});if(f.position!='first'){d.appendChild(tbd)}else{a(d).prepend(tbd);a(d).prepend(b)}tbd=null;b=null}})},GridToForm:function(b,d){return this.each(function(){var h=this;if(!h.grid){return}var c=a(h).getRowData(b);if(c){for(var r in c){if(a("[name="+r+"]",d).is("input:radio")){a("[name="+r+"]",d).each(function(){if(a(this).val()==c[r]){a(this).attr("checked","checked")}else{a(this).attr("checked","")}})}else{a("[name="+r+"]",d).val(c[r])}}}})},FormToGrid:function(k,m){return this.each(function(){var r=this;if(!r.grid){return}var b=a(m).serializeArray();var d={};a.each(b,function(h,c){d[c.name]=c.value});a(r).setRowData(k,d)})}})})(jQuery);