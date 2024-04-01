using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    [Table("AspNetUserQuotess")]
    public partial class AspNetUserQuotess
    {
        [Key]
        public int QuoteId { get; set; }
        [Key]
        public string UserrId { get; set; } = null!;
    }
}
