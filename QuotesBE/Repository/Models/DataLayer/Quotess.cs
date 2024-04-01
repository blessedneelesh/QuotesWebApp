﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    [Table("Quotess")]
    [Index("CategoryIdFk", Name = "IX_Quotess_category_id_fk")]
    public partial class Quotess
    {
        public Quotess()
        {
            Userrs = new HashSet<AspNetUser>();
        }

        [Key]
        [Column("quote_id")]
        public int QuoteId { get; set; }
        [Column("quote_content")]
        [StringLength(1550)]
        public string QuoteContent { get; set; } = null!;
        [Column("author")]
        [StringLength(300)]
        public string Author { get; set; } = null!;
        [Column("category_id_fk")]
        public int? CategoryIdFk { get; set; }

        [ForeignKey("CategoryIdFk")]
        [InverseProperty("Quotesses")]
        public virtual Category? CategoryIdFkNavigation { get; set; }

        [ForeignKey("QuoteId")]
        [InverseProperty("Quotes")]
        public virtual ICollection<AspNetUser> Userrs { get; set; }
    }
}
