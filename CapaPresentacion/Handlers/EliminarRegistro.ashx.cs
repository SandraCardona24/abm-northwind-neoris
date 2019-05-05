using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CapaNegocio;
using System.Web.Script.Serialization;

namespace CapaPresentacion.Handlers
{
    /// <summary>
    /// Descripción breve de EliminarRegistro
    /// </summary>
    public class EliminarRegistro : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();
            string jsonOutput = string.Empty;
            context.Response.ContentType = "application/json";
            string id = Convert.ToString(context.Request.Form["id"]);     

                      
            bool result = manejador.EliminarRegistro(id);
            

            if(result){
                jsonOutput = new JavaScriptSerializer().Serialize("true");
            }else{
                jsonOutput = new JavaScriptSerializer().Serialize("false");
            }
             context.Response.Write(jsonOutput);             

        }       
           


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}