using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    [Table("UserQuote")]
    public partial class UserQuote
    {
        

        [Key]
        [Column("userr_id")]
        public string UserrId { get; set; }
        [Key]
        [Column("quote_id")]
        public int QuoteId { get; set; }

        [ForeignKey(nameof(QuoteId))]
        [InverseProperty(nameof(Quotess.UserQuotes))]
        public virtual Quotess Quote { get; set; }

        public UserQuote() { }

        public UserQuote(string userId, int quoteId) {
            UserrId = userId;
            QuoteId = quoteId;

        }
    }
}
