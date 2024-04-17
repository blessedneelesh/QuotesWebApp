using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RequestFeatures
{
    public class FavouriteParameters:RequestParameters
    {
        public string user_id { get; set; } 
        public int? category_id { get; set; }
    }
}
