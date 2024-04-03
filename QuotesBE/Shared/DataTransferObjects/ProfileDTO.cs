using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public class ProfileDTO
    {
        public ProfileDTO(string id, string userName, string email)
        {
            Id = id;
            UserName = userName;
            Email = email;
        }

        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
