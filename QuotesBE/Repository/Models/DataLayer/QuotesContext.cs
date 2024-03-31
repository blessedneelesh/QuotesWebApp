using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Repository.Models.DataLayer
{
    public partial class QuotesContext : DbContext
    {
        public QuotesContext()
        {
        }

        public QuotesContext(DbContextOptions<QuotesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Quotess> Quotesses { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("name=QuoteContext");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).ValueGeneratedNever();
            });

            modelBuilder.Entity<Quotess>(entity =>
            {
                entity.HasKey(e => e.QuoteId)
                    .HasName("PK__Quotess__0D37DF0CAC99B8A5");

                entity.Property(e => e.QuoteId).ValueGeneratedNever();

                entity.HasOne(d => d.CategoryIdFkNavigation)
                    .WithMany(p => p.Quotesses)
                    .HasForeignKey(d => d.CategoryIdFk)
                    .HasConstraintName("FK__Quotess__categor__4222D4EF");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
