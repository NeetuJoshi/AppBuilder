import MySQLdb as mdb


class DBFactory(object):
    """Basic class for database access"""

    conn = None
    cursor = None

    def __init__(self, dbName="xxx", server="localhost", usr="root", pwd="4495"):
        self.conn = mdb.connect(db=dbName, host=server, user=usr, passwd=pwd)
     
    def SelectQry(self, qry):
        self.cursor = self.conn.cursor(mdb.cursors.DictCursor)
        self.cursor.execute(qry)
        rows = self.cursor.fetchall()
        return rows

    def ExecuteQry(self, qry):
        self.cursor = self.conn.cursor()
        self.cursor.execute(qry)

    def Close(self):
        if self.cursor:
            self.cursor.close()
        self.conn.close()

    def Commit(self):
        """ commit to db """
        self.conn.commit()

    def RollBack(self):
        """ Rollback if any error comes """
        self.conn.rollback()

    def GetMaxID(self):
        qry = " UPDATE GetIDTable SET ID = ID + 1 "
        self.ExecuteQry(qry)
        self.Commit()
        theID = -1
        rows = self.SelectQry("SELECT id FROM GetIDTable")
        for row in rows:
            theID = row["id"]
        return theID


    def SaveXMLToDB(xmlFileName):
        """ The data from XML will be saved in the respective tables"""


    def CreateXMLFromDB(tableName):
        """ Create an xml from DB """
        fObj = open('htdocs/gl/UI.xml', 'w')
        fStr = """
               <tables>
                   <table>
                       <col>data</col>
                   </table>
            </tables>
               """  
        fObj.write(fStr)
        fObj.close()

    def UpdateXMLFromUI():
        """  """


        