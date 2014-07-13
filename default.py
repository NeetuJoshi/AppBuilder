
from mod_python import apache
from mod_python import util
import simplejson as sj
from xml.dom.minidom import parse
from DB import DBFactory
#import webbrowser



def handler(req):
    req.content_type = 'html'
    htmlStr = "<HTML><HEAD>"
    form = util.FieldStorage(req, keep_blank_values=1)
    currentTable = form.getfirst("FormName")
    str = form.getfirst("str")
    db = DBFactory(dbName="Intead")
    xmldom = get_XMLDom()
    isSave = form.getfirst("hdnSave")
    htmlStr +=get_jsSourcefiles()
    chk='No'
    htmlStr +="""<script type="text/javascript" src = "js/fomaba.js"></script>"""
    if isSave == '1':
        """ """
        xmlstr = form.getfirst("str")        
        f = open('c:\workspace\Fomaba\uiChanges.xml' , 'w')
        f.write(xmlstr)
        f.close()
        
        uichangesDom = get_UIchanges_XMLDOM()    
        uiList = get_UIChanges(uichangesDom) 
        namestr = LoginFunction(db,uiList)     
        a = len(namestr)   
        if a!=0:
            chk ='Yes'
            i = open('c:\workspace\Fomaba\hjh.txt' , 'w')
            i.write(namestr)
            i.close()
            #url = "http://localhost/Fomaba/index.html"
            #webbrowser.open(url,new=new)
         
        else:
            i = open('c:\workspace\Fomaba\hjh.txt' , 'w')
            i.write('zero')
            i.close()
    db.Close()
    htmlStr += "</HEAD>"
    htmlStr += "<BODY>"
    htmlStr += "<form  name=formMain method=post>"
    htmlStr += "<input type=hidden value='' name=hdnData >"
    htmlStr += "<input type=hidden value=7 name=hdnSave >"
    htmlStr += "</form>"
    frmList = get_FormDefs(xmldom)
    for frm in frmList:
        htmlStr += frm.generate_UIStr()
    htmlStr +=newWindow(chk)   
    htmlStr +="</BODY>"    
    htmlStr +="</HTML>"
    req.write(htmlStr)
    #req.write(chk)
    return apache.OK



def newWindow(chk):
    """ """
    str ="""
   
	<script type="text/javascript">
	 chkval ='"""+chk+"""'
	if (chkval =='Yes')
	{
    	 window.open("http://localhost/Fomaba/index.html");
     }
	</script>
	"""
    return str

	
def get_jsSourcefiles():
    """ """
    scriptForHead = """
    
    <link rel="stylesheet" type="text/css" media="screen" href="jquery/JQGrid/themes/steel/grid.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="jquery/JQGrid/themes/jqModal.css" />	
	<link rel="stylesheet" type="text/css" media="screen" href="jquery/NewGrid/jquery-ui-1.8.10.custom/css/ui-lightness/jquery-ui-1.8.10.custom.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="jquery/NewGrid/css/ui.jqgrid.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="jquery/NewGrid/src/css/ui.multiselect.css" />
	   
    <script src="jquery/NewGrid/js/jquery.js" type="text/javascript"></script>
    <script src="jquery/NewGrid/jquery-ui-1.8.10.custom/js/jquery-ui-1.8.10.custom.min.js" type="text/javascript"></script>
	<script src="jquery/NewGrid/src/i18n/grid.locale-en.js" type="text/javascript"></script>
	<script src="jquery/NewGrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>
	<script src="jquery/NewGrid/src/ui.multiselect.js" type="text/javascript"></script>
	<script src="jquery/NewGrid/src/i18n/jquery.tablednd.js" type="text/javascript"></script>
	
	<script type="text/javascript" src="jquery/JQGrid/jquery.js" ></script>
    <script type="text/javascript" src="jquery/JQGrid/jquery.jqGrid.js" ></script> 
	<script type="text/javascript" src="jquery/JQGrid/js/jqModal.js"></script>
    <script type="text/javascript" src="jquery/JQGrid/js/jqDnR.js" ></script>
	
	
    <script type ="text/javascript" src="jquery/NewGrid/Jquery/jquery.xmldom.js" ></script>
    <script type ="text/javascript" src="jquery/NewGrid/Jquery/jquery.xmldom.min.js"></script>
    <script type ="text/javascript" src="jquery/NewGrid/Jquery/jquery.json2xml.js"></script>
    <script type ="text/javascript" src="jquery/NewGrid/Jquery/jquery.xml2json.js"></script>

    <script type ="text/javascript" src= "jquery/NewGrid/Jquery/jquery-1.3.2.min.js"></script>
	"""
    return scriptForHead
    
	
def get_XMLDom():
    dom = parse("C:\workspace\Fomaba\loginFrm.xml")
    return dom

def get_UIchanges_XMLDOM():	
    """ """
    dom = parse("c:\workspace\Fomaba\uiChanges.xml")
    return dom

class UIChanges(object):
   """ Class to maintain the UI Changes"""
   def __init__(self, type , formName, id, fieldname, value):
        self.Type = type 
        self.FormName = formName
        self.Id = id
        self.FieldName = fieldname
        self.Value = value

class pendingDBChanges(object):
    """class to maintain DB changes"""
	
def get_UIChanges(dom):
    """ returns list of UI Changes """
    
    uiChangeList = []
    for node in dom.getElementsByTagName('UIChange'):       
        type = node.getElementsByTagName('Type')[0].firstChild.nodeValue		
        formName = node.getElementsByTagName('FormName')[0].firstChild.nodeValue
        id =node.getElementsByTagName('Id')[0].firstChild.nodeValue            
        fieldName =node.getElementsByTagName('FieldName')[0].firstChild.nodeValue            
        value =node.getElementsByTagName('Value')[0].firstChild.nodeValue            
        uichange = UIChanges(type, formName, id, fieldName, value )
        uiChangeList.append(uichange)
    return uiChangeList

def LoginFunction(db, uiChange):
    """ """
    for ui in uiChange:
        if ui.FieldName =='Email':
		   email = ui.Value
        elif ui.FieldName =='Password':
		   pwd = ui.Value
    name=""
    qry ="SELECT Name FROM login WHERE EmailId ='"+email+"' AND Pwd = '"+pwd+"'"
    #qry ="SELECT Name FROM login"
    rows =db.SelectQry(qry)
    for row in rows:
        name = row["Name"]  
    return name		
	
class Formdef(object):
    """ Main class that reprensents the Form Definition """
    def __init__(self, formName, tableName,  fieldsList, constraintsList=None, backendActionList=None):
        self.formName = formName
        self.tableName = tableName
        self.fields = fieldsList
        self.constraints = constraintsList
        self.backendActions = backendActionList
		
    def GetNumberFields(self):
        """ """
		
    def generate_UIStr(self):
        """  main method that will generate UI """
        txtDict={}
        btnDict={}
        htmlStr ="<BR>"
        for i in range(0,len(self.fields)):
            field = self.fields[i].fieldName
            display  = self.fields[i].displayName
            type = self.fields[i].fieldType
            if type =="Text":
                txtDict[display] = field
            if type == "Button":
                btnDict[display] =field
        htmlStr +=dict_ToTextBoxes(txtDict)
        htmlStr +=dict_ToButton(btnDict)
        return htmlStr			
        
      
	    
	
class Field(object):
    """ """
    def __init__(self, fieldName, displayName, fieldType, uiactionsList=None, constraintsList=None):
        self.fieldName = fieldName
        self.displayName = displayName
        self.fieldType = fieldType
        self.uiActions = uiactionsList
        self.constraints = constraintsList    
			
class Constraint(object):
    """ """
    def __init__(self, minVal=None, maxVal=None, decimalVal=None, uniqueVal=None, lengthVal=50, regularExpStr=None):
        self.min = minVal
        self.max = maxVal
        self.decimals = decimalVal
        self.unique = uniqueVal
        self.length = lengthVal
        self.regularExp = regularExpStr
	
class UIAction(object):
    """ """
    def __init__(self, whenVal, howVal, whatVal):
        self.when = whenVal
        self.how  = howVal
        self.what = whatVal	
	
class BackendAction(object):
    """  """
    def __init__(self, whenVal, whatVal):
        self.when = whenVal
        self.what = whatVal    
    
	
def get_FormDefs(dom):
    """ returns list of formdefs """
    
    formList = []
    fldList =[]
    for node in dom.getElementsByTagName('FormDef'):
        frmName = node.getElementsByTagName('Name')[0].firstChild.nodeValue
        for node1 in node.getElementsByTagName('Field'): 
            field = node1.getElementsByTagName('FieldName')[0].firstChild.nodeValue		
            type = node1.getElementsByTagName('FieldType')[0].firstChild.nodeValue
            display =node1.getElementsByTagName('DisplayName')[0].firstChild.nodeValue            
            fld = Field(field, display, type)   
            for node2 in node1.getElementsByTagName('Constraint'):
                node2.getElementsByTagName('Length')[0].firstChild.nodeValue
                node2.getElementsByTagName('RegularExpression')[0].firstChild.nodeValue		
	        fldList.append(fld)
        frm = Formdef(frmName, frmName, fldList)
        formList.append(frm)
	return formList
	

def dict_ToTextBoxes(aDict):
    txtStr = ""
    if len(aDict) !=0:
        txtStr = "<TABLE>" 
        for key in aDict:
            txtStr +=  get_TextBoxHTML(key, aDict[key])    
        txtStr += "</TABLE>" 
    return txtStr
	
def get_TextBoxHTML(displayName, txtBoxName):
    """ returns a textbox """
    txtStr = """<TR>"""
    txtStr += """<TD><LABEL>"""+ displayName +"""</LABEL></TD>"""
    txtStr += """<TD><INPUT TYPE=TEXT NAME=""" + txtBoxName + """ ></TD>"""
    txtStr += """</TR>"""
    return txtStr 	
	
def dict_ToButton(aDict):
    txtStr = ""
    if len(aDict) !=0:
        txtStr = "<TABLE>" 
        for key in sorted(aDict):
            txtStr +=  get_ButtonHTML(key, aDict[key])    
        txtStr += "</TABLE>" 
    return txtStr

def get_ButtonHTML(btnLabel, btnName):
    btnStr = """ <INPUT TYPE=Button Value="""+ btnLabel + """ OnClick='ButtonClick(" """ +btnLabel+ """ ")' >"""
    return btnStr

class UIChanges(object):
    """ """
    def __init__(self, type , formName, id, fieldName, value):
        self.Type = type
        self.FormName = formName
        self.Id = id
        self.FieldName = fieldName
        self.Value = value

class PendingDBChanges(object):
    """ """
    def __init__(self, id, formdef, FieldName):
        self.Id =id
        self.FormDef = formdef
        self.Fieldname = fieldName		 		 
	
	



