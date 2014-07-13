
		    //************************click on login function***********************************************
          
		    function ButtonClick(label)
			{
			  
				var str="";
			    str = UI2UIChanges();
		
				$.ajax({
						type:'POST',
						url: "http://localhost/Fomaba/default.py?hdnSave=1",
						data: {"str":str},
						success:function(msg)
						{		
							
							
						}
			
					});		
				
			}
			//*******************UI change class*************************************************************			
            function UIChange(type, formName, id, fieldname,value)
			{
				this.Type = type; 
				this.FormName = formName;
				this.Id = id;
				this.FieldName = fieldname;
                this.Value = value;
			}
			
			//************************** UI2UIChanges Function***********************************************		
						
			function UI2UIChanges()
			{					
			  			  
			    var uiChanges = new Array(); //array of UI changes
				var uiChange;
				
				var ementArr = document.getElementsByTagName('INPUT');
				var k = 0;
				
				for(i=0; i < ementArr.length; i++)
				{
				
					input = ementArr[i];
					if (input.type == 'text')
					{		uiChange = new UIChange();
							
					
							uiChange.type = 'Text';
							uiChange.FormName = 'login';
							uiChange.Id = -1;
							uiChange.FieldName = input.name;
							uiChange.Value = input.value;
					
					
					uiChanges[k++] = uiChange;
					
					}
				}
				
				
				var str = UIChangesToXML(uiChanges);
				return str;
				/*
				var pageurl = 'http://localhost/gl/default.py?FormName=login';
				$.ajax({
					type: 'POST',
					url: pageurl + "?functionName=SaveFormData",
					data: { id: FormDefId, FormXml: escape($.xmlToString(formDataXmlDom[0])), FormDefName: FormDefName },
				success: function (result) {
				SavePageIntoDataBaseCallback(result);


				
				*/
			  
			  		  
			}
			
			//******************************convert UiChanges to XML string***********************************
			function UIChangesToXML(uiChanges)
			{
			var uiXMLStr = "";
			
			uiXMLStr += "<UIChanges>";			
			for (i=0; i<uiChanges.length; i++)
				{
					uiChange = 	uiChanges[i];
					
					uiXMLStr += "<UIChange>";			
						uiXMLStr += "<Type>"
							uiXMLStr += uiChange.type;
						uiXMLStr += "</Type>"
						uiXMLStr += "<FormName>"
							uiXMLStr += uiChange.FormName;
						uiXMLStr += "</FormName>"
						uiXMLStr += "<Id>"
							uiXMLStr += uiChange.Id;
						uiXMLStr += "</Id>"
						uiXMLStr += "<FieldName>"
							uiXMLStr += uiChange.FieldName;
						uiXMLStr += "</FieldName>"
						uiXMLStr += "<Value>"
							uiXMLStr += uiChange.Value;
						uiXMLStr += "</Value>"
					uiXMLStr += "</UIChange>";			
					
				}
			
			uiXMLStr += "</UIChanges>";						
			return uiXMLStr;
				
			}
			
			//*************************convert XML string to Array of UIChanges***********************************
			function XMLtoUIChanges()
			{
			 
			}
		