using System.Linq;

namespace NameApplication.Data.Repositories
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetByName(string name);
    }
}