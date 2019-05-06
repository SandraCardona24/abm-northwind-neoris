using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CapaNegocio;
using System.Web.Script.Serialization;
namespace CapaPresentacion.Handlers
{
    /// <summary>
    /// Descripción breve de GetTerritoriesRegion
    /// </summary>
    public class GetTerritoriesRegion : IHttpHandler
    {

        
    
        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();
            string jsonOutput = string.Empty;
            context.Response.ContentType = "application/json";

            int region = Convert.ToInt32(context.Request.Form["region"]);
            var registros = manejador.GetRegistrosByRegion(region);

             jsonOutput = new JavaScriptSerializer().Serialize(registros);

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