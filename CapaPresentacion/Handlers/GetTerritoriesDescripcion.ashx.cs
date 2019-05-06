using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CapaNegocio;
using System.Web.Script.Serialization;


namespace CapaPresentacion.Handlers
{
    /// <summary>
    /// Descripción breve de GetTerritoriesDescripcion
    /// </summary>
    public class GetTerritoriesDescripcion : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();
            string jsonOutput = string.Empty;
            context.Response.ContentType = "application/json";

            string descripcion = Convert.ToString(context.Request.Form["descripcion"]);
            var registros = manejador.GetRegistrosByDescripcion(descripcion);

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