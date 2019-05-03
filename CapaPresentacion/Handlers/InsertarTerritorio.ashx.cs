using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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

            string id = Convert.ToString(context.Request.Form["id"]);
            string descripcion = Convert.ToString(context.Request.Form["descripcion"]);
            int region = Convert.ToInt32(context.Request.Form["regionId"]);
            var territorio = manejador.CrearTerritorie(id, descripcion, region);

            manejador.InsertarRegistro(territorio);


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