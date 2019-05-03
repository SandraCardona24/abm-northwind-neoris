using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CapaPresentacion.Handlers
{
    /// <summary>
    /// Descripción breve de ModificarRegistro
    /// </summary>
    public class ModificarRegistro : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hola a todos");
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