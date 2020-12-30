using NameApplication.Data.Models;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;

namespace NameApplication.Data.Repositories
{
    public class NameRepository<NameEntry> : IRepository<Models.NameEntry>
    {
        private readonly IQueryable<Models.NameEntry> _objects;

        public NameRepository()
        {
            var _content = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "names.json");
            var container = JsonConvert.DeserializeObject<NameEntryContainer>(_content);
            _objects = container.Names.AsQueryable();
        }

        public IQueryable<Models.NameEntry> GetAll()
        {
            return _objects;
        }

        public IQueryable<Models.NameEntry> GetByName(string name)
        {
            return _objects.Where(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
