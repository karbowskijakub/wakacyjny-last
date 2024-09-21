using wakacyjny_last.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Threading;
using System.Threading.Tasks;

namespace wakacyjny_last.Application.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Domain.Models.User> Users { get; set; }
        DbSet<Post> Posts { get; set; }
        DbSet<PaymentHistory> PaymentHistories { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
    }
}
