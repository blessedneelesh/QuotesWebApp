using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public class QuoteDTO
    {
        public int quote_id { get; set; }
        public string quote_content { get; set;}
        public string author { get; set; }
        public int? category_id { get; set; }
    }
}
