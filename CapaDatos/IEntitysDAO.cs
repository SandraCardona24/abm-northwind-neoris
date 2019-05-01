using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    interface IEntitysDAO<T>
    {
        void ActualizarRegistro(T entitdad);
        void InsertarRegistro(T entidad);
        Boolean EliminarRegistro(String id);
        void ExisteRegistro(String id);
        IEnumerable<T> GetTodosRegistros();
        T GetRegistroById(String id);
    }
}
