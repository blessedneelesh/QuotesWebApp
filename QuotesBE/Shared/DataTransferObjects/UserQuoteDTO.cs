using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects
{
    public class UserQuoteDTO
    {
        public string userId { get;set; }
        public int quoteId { get; set; }
        public string quoteContent { get; set; }
        public string author { get; set; }
        public UserQuoteDTO() { }

        public UserQuoteDTO(string userId, int quoteId) {   
            this.userId = userId;
            this.quoteId = quoteId;
        }

        public UserQuoteDTO(string userId, int quoteId,string quoteContent,string author)
        {
            this.userId = userId;
            this.quoteId = quoteId;
            this.quoteContent = quoteContent;
            this.author = author;
        }
    }
}
