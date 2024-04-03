using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    [Table("Quotess")]
    public partial class Quotess
    {
        public Quotess()
        {
            UserQuotes = new HashSet<UserQuote>();
        }

        [Key]
        [Column("quote_id")]
        public int QuoteId { get; set; }
        [Required]
        [Column("quote_content")]
        [StringLength(1550)]
        public string QuoteContent { get; set; }
        [Required]
        [Column("author")]
        [StringLength(300)]
        public string Author { get; set; }
        [Column("category_id_fk")]
        public int? CategoryIdFk { get; set; }

        [ForeignKey(nameof(CategoryIdFk))]
        [InverseProperty(nameof(Category.Quotesses))]
        public virtual Category CategoryIdFkNavigation { get; set; }
        [InverseProperty(nameof(UserQuote.Quote))]
        public virtual ICollection<UserQuote> UserQuotes { get; set; }
    }
}
