using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CapaNegocio;
using System.Web.Script.Serialization;

namespace CapaPresentacion
{
    /// <summary>
    /// Descripción breve de getRegistroID
    /// </summary>
    public class getRegistroID : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ManejadorTerritories manejador = new ManejadorTerritories();
            string jsonOutput = string.Empty;

            context.Response.ContentType = "application/json";

            string id = Convert.ToString(context.Request.Form["id"]);

            if (!manejador.ExisteRegistro(id))
            {
                var reg = manejador.CrearTerritorie("NoExiste", "NoExiste", "NoExiste", -1);

                jsonOutput = new JavaScriptSerializer().Serialize(reg);
                context.Response.Write(jsonOutput);

            }
            else
            {
                var registro = manejador.GetRegistroById(id);
                registro.Description = registro.Description.Trim();
                jsonOutput = new JavaScriptSerializer().Serialize(registro);
                context.Response.Write(jsonOutput);
            }


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