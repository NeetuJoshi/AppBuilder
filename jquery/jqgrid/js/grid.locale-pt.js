;(function($){
/**
 * jqGrid Portuguese Translation
 * Traduccion jqGrid en Espa�ol por Yamil Bracho
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = {};

$.jgrid.defaults = {
	recordtext: "Bicha(s)",
	loadtext: "Carregando...",
	pgtext : "/"
};
$.jgrid.search = {
    caption: "Busca...",
    Find: "Procurar",
    Reset: "Limpar",
    odata : ['igual', 'n�o igual', 'menor', 'menor ou igual', 'maior', 'maior ou igual', 'ome�a com', 'termina com','cont�m' ]
};
$.jgrid.edit = {
    addCaption: "Agregar Registro",
    editCaption: "Modificar Registo",
    bSubmit: "Enviar",
    bCancel: "Cancelar",
	bClose: "Fechar",
    processData: "Processando...",
    msg: {
        required:"Campo � requerido",
        number:"Faz favor, introduza um numero",
        minValue:"O valor deve ser maior ou igual que",
        maxValue:"O valor deve ser menor ou igual a",
        email: "n�o � um direccion de correio valida",
        integer: "Faz favor, introduza um inteiro",
		date: "Please, enter valid date value"
    }
};
$.jgrid.del = {
    caption: "Eliminar",
    msg: "� Deseja eliminar os registos seleccionados?",
    bSubmit: "Eliminar",
    bCancel: "Cancelar",
    processData: "Processando..."
};
$.jgrid.nav = {
	edittext: " ",
    edittitle: "Modificar bicha seleccionada",
	addtext:" ",
    addtitle: "Agregar nova bicha",
    deltext: " ",
    deltitle: "Eliminar bicha seleccionada",
    searchtext: " ",
    searchtitle: "Procurar informacion",
    refreshtext: "",
    refreshtitle: "Refrescar Rejilla",
    alertcap: "Aviso",
    alerttext: "Faz favor, seleccione uma bicha"
};
// setcolumns module
$.jgrid.col ={
    caption: "Mostrar/Ocultar Colunas",
    bSubmit: "Enviar",
    bCancel: "Cancelar"	
};
$.jgrid.errors = {
	errcap : "Erro",
	nourl : "N�o se especificou uma url",
	norecords: "N�o h� dados para processar",
    model : "Length of colNames <> colModel!"
};
$.jgrid.formatter = {
	integer : {thousandsSeparator: " ", defaulValue: 0},
	number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0},
	currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaulValue: 0},
	date : {
		dayNames:   [
			"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		],
		AmPm : ["am","pm","AM","PM"],
		S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
		srcformat: 'Y-m-d',
		newformat: 'd/m/Y',
		masks : {
            ISO8601Long:"Y-m-d H:i:s",
            ISO8601Short:"Y-m-d",
            ShortDate: "n/j/Y",
            LongDate: "l, F d, Y",
            FullDateTime: "l, F d, Y g:i:s A",
            MonthDay: "F d",
            ShortTime: "g:i A",
            LongTime: "g:i:s A",
            SortableDateTime: "Y-m-d\\TH:i:s",
            UniversalSortableDateTime: "Y-m-d H:i:sO",
            YearMonth: "F, Y"
        },
        reformatAfterEdit : false
	},
	baseLinkUrl: '',
	showAction: 'show'
};
})(jQuery);
