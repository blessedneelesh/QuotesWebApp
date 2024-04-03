using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    public partial class Category
    {
        public Category()
        {
            Quotesses = new HashSet<Quotess>();
        }

        [Key]
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("category_name")]
        [StringLength(50)]
        public string CategoryName { get; set; }

        [InverseProperty(nameof(Quotess.CategoryIdFkNavigation))]
        public virtual ICollection<Quotess> Quotesses { get; set; }
    }
}
