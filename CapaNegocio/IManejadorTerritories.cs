using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    interface IManejadorTerritories<T>
    {
        void ActualizarRegistro(T entitdad);
        void InsertarRegistro(T entidad);
        bool EliminarRegistro(String id);
        bool ExisteRegistro(String id);
    }
}
