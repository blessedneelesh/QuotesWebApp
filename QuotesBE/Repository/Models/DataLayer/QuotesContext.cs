using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Repository.Models.DataLayer
{
    public partial class QuotesContext : IdentityDbContext<IdentityUser>
    {
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Quotess> Quotesses { get; set; }
        public virtual DbSet<UserQuote> UserQuotes { get; set; }

        public QuotesContext(DbContextOptions<QuotesContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).ValueGeneratedNever();
            });

            modelBuilder.Entity<Quotess>(entity =>
            {
                entity.HasKey(e => e.QuoteId)
                    .HasName("PK__Quotess__0D37DF0CD9248E82");

                entity.Property(e => e.QuoteId).ValueGeneratedNever();

                entity.HasOne(d => d.CategoryIdFkNavigation)
                    .WithMany(p => p.Quotesses)
                    .HasForeignKey(d => d.CategoryIdFk)
                    .HasConstraintName("FK__Quotess__categor__4CA06362");
            });

            modelBuilder.Entity<UserQuote>(entity =>
            {
                entity.HasKey(e => new { e.UserrId, e.QuoteId })
                    .HasName("PK__UserQuot__02488940799EC884");

                entity.HasOne(d => d.Quote)
                    .WithMany(p => p.UserQuotes)
                    .HasForeignKey(d => d.QuoteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserQuote__quote__5070F446");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
