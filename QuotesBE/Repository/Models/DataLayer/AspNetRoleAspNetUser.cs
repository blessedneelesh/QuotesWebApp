using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Repository.Models.DataLayer
{
    [Table("AspNetRoleAspNetUser")]
    public partial class AspNetRoleAspNetUser
    {
        [Key]
        public string RoleId { get; set; } = null!;
        [Key]
        public string UserId { get; set; } = null!;
    }
}
