using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;


namespace CapaPresentacion.Handlers
{
    /// <summary>
    /// Descripción breve de InsertarTerritorio
    /// </summary>
    public class InsertarTerritorio : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();

           string jsonOutput = string.Empty;
            context.Response.ContentType = "application/json";

            string id = Convert.ToString(context.Request.Form["id"]);
            string descripcion = Convert.ToString(context.Request.Form["descripcion"]);
            int region = Convert.ToInt32(context.Request.Form["regionId"]);
            var territorio = manejador.CrearTerritorie(id, descripcion, region);

            manejador.InsertarRegistro(territorio);
           jsonOutput = new JavaScriptSerializer().Serialize(territorio);
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