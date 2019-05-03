using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace CapaPresentacion
{
    /// <summary>
    /// Descripción breve de GetTodosTerritories
    /// </summary>
    public class GetTodosTerritories : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();
            string jsonOutput = string.Empty;
            context.Response.ContentType = "application/json";
            
            var registros = manejador.GetTodosLosRegistros();

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