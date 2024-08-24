using Microsoft.EntityFrameworkCore;

namespace asp.net_DayShift.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 配置 User 和 Schedule 的关系
            modelBuilder.Entity<User>()
                .HasMany(u => u.Schedules)
                .WithOne(s => s.User)
                .HasForeignKey(s => s.UserId);
        }
    }
}
