using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CapaDatos;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class ManejadorTerritories : IManejadorTerritories<Territories>
    {
        TerritoriesAdo capaDatos;

        public ManejadorTerritories()
        {
            this.capaDatos = new TerritoriesAdo();
        }
        public void InsertarRegistro(Territories territoryEntity)
        {
            this.capaDatos.InsertarRegistro(territoryEntity);
        }
        public void ActualizarRegistro(Territories territoryEntity)
        {
            if (ExisteRegistro(territoryEntity.TerritoryID))
            {
                this.capaDatos.ActualizarRegistro(territoryEntity);
            }

        }
        public Boolean ExisteRegistro(string id)
        {
            return capaDatos.ExisteRegistro(id);
        }
        public Boolean EliminarRegistro(string id)

        {
            if (capaDatos.ExisteRegistro(id))
            {
                return this.capaDatos.EliminarRegistro(id);
            }
            return false;
        }


        //Getters TerritoryEntity(Territory+region)
        public TerritoryEntity GetRegistroById(string id)
        {

            return this.capaDatos.GetRegistroById(id);
        }
        public List<TerritoryEntity> GetTodosLosRegistros()
        {
            return this.capaDatos.GetTodosRegistros();
        }

        public List<TerritoryEntity> GetRegistrosByDescripcion(String description)
        {
            return this.capaDatos.GetRegistrosByDescripcion(description);
        }

        public List<TerritoryEntity> GetRegistrosByRegion(int region)
        {
            return this.capaDatos.GetRegistrosByRegion(region);
        }

        public TerritoryEntity CrearTerritorieEntity(string id, string description, string regionDescription, int regionid)
        {
            return new TerritoryEntity()
            {
                Id = id,
                Description = description,
                RegionDescription = regionDescription,
                RegionId = regionid
            };


        }

        public Territories CrearTerritorie(string id, string description, int region)
        {
            return new Territories()
            {
                TerritoryID = id,
                TerritoryDescription = description,
                RegionID = region
            };
        }

   }
}
