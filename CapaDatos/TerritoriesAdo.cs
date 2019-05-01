using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    class TerritoriesAdo : IEntitysDAO<Territories>
    {

        //Listo
        public void ActualizarRegistro(Territories territory)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                var territorio = contexto.Territories.Where(terr => terr.TerritoryID.Equals(territory.RegionID)).First(); ;
                territorio.RegionID = territory.RegionID;
                territorio.TerritoryDescription = territory.TerritoryDescription;
                contexto.SaveChanges();
            }

        }
        //Listo
        public bool EliminarRegistro(string idParam)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                try
                {
                    var territorioABorrar = contexto.Territories.Where(terr => terr.TerritoryID.Equals(idParam)).First();
                    contexto.Territories.Remove(territorioABorrar);
                    contexto.SaveChanges();
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
        //Listo
        public void InsertarRegistro(Territories territory)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                contexto.Territories.Add(territory);
                contexto.SaveChanges();
            }
        }
        //Listo
        public bool ExisteRegistro(string id)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                var contador = contexto.Territories.Where(terr => terr.TerritoryID.Equals(idParam)).Count();
                return contador > 0;
            }
        }

      
        /*Getters de registros */

        public TerritoryEntity GetRegistroById(string idParam)
        {

            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                var territorie = contexto.Territories.Where(terr => terr.TerritoryID.Equals(idParam)).FirstOrDefault();
                TerritoryEntity registro = new TerritoryEntity();

                registro.Id = (territorie.TerritoryID);
                registro.Description = territorie.TerritoryDescription;
                registro.RegionId = territorie.RegionID;
                registro.RegionDescription = territorie.Region.RegionDescription;
                return registro;
            }
        }
        //Listo
        public IEnumerable<TerritoryEntity> GetTodosRegistros()
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                var territories = contexto.Territories;
                List<TerritoryEntity> listaTerritory = new List<TerritoryEntity>();
                foreach (Territories terr in territories)
                {
                    listaTerritory.Add(new TerritoryEntity
                    {
                        Id = (terr.TerritoryID),
                        Description = terr.TerritoryDescription,
                        RegionId = terr.RegionID,
                        RegionDescription = terr.Region.RegionDescription

                    });
                }
                return listaTerritory;
            }
        }
        //Listo
        public List<TerritoryEntity> GetRegistrosByDescripcion(String description)
        {
            using (NorthwindEntities contexto = new NorthwindEntities())
            {
                var territories = contexto.Territories.Where(terr => terr.TerritoryDescription.Equals(description));
                List<TerritoryEntity> listaTerritory = new List<TerritoryEntity>();
                foreach (Territories terr in territories)
                {
                    {
                        listaTerritory.Add(new TerritoryEntity
                        {
                            Id = (terr.TerritoryID),
                            Description = terr.TerritoryDescription,
                            RegionId = terr.RegionID,
                            RegionDescription = terr.Region.RegionDescription
                        });
                    }
                }
                return listaTerritory;
            }
        }


    }
}
