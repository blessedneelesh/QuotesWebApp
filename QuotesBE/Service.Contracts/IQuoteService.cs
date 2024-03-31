using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Contracts
{
    public interface IQuoteService
    {
        List<QuoteDTO> GetQuote();
        (List<QuoteDTO> fighters, MetaData metaData) GetAllQuotes(QuoteParameters quoteParameters);
    }
}
