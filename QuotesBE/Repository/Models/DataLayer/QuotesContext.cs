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

        public virtual DbSet<AspNetRole> AspNetRoles { get; set; } = null!;
        public virtual DbSet<AspNetRoleAspNetUser> AspNetRoleAspNetUsers { get; set; } = null!;
        public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; } = null!;
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; } = null!;
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; } = null!;
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; } = null!;
        public virtual DbSet<AspNetUserQuotess> AspNetUserQuotesses { get; set; } = null!;
        public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; } = null!;
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
            modelBuilder.Entity<AspNetRole>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");
            });

            modelBuilder.Entity<AspNetRoleAspNetUser>(entity =>
            {
                entity.HasKey(e => new { e.RoleId, e.UserId });
            });

            modelBuilder.Entity<AspNetUser>(entity =>
            {
                entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.HasMany(d => d.Quotes)
                    .WithMany(p => p.Userrs)
                    .UsingEntity<Dictionary<string, object>>(
                        "UserQuote",
                        l => l.HasOne<Quotess>().WithMany().HasForeignKey("QuoteId").OnDelete(DeleteBehavior.ClientSetNull),
                        r => r.HasOne<AspNetUser>().WithMany().HasForeignKey("UserrId").OnDelete(DeleteBehavior.ClientSetNull),
                        j =>
                        {
                            j.HasKey("UserrId", "QuoteId").HasName("PK__UserQuot__02488940651555EC");

                            j.ToTable("UserQuote");

                            j.HasIndex(new[] { "QuoteId" }, "IX_UserQuote_quote_id");

                            j.IndexerProperty<string>("UserrId").HasColumnName("userr_id");

                            j.IndexerProperty<int>("QuoteId").HasColumnName("quote_id");
                        });

                entity.HasMany(d => d.Roles)
                    .WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "AspNetUserRole",
                        l => l.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                        r => r.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                        j =>
                        {
                            j.HasKey("UserId", "RoleId");

                            j.ToTable("AspNetUserRoles");

                            j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                        });
            });

            modelBuilder.Entity<AspNetUserLogin>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });
            });

            modelBuilder.Entity<AspNetUserQuotess>(entity =>
            {
                entity.HasKey(e => new { e.QuoteId, e.UserrId });
            });

            modelBuilder.Entity<AspNetUserToken>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            });

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
