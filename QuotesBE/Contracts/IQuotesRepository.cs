using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IQuotesRepository
    {
        List<QuoteDTO> GetAllQuote();
        PagedList<QuoteDTO> GetAllQuote(QuoteParameters quoteParameters);
        List<CategoryDTO> GetCategory();
        PagedList<QuoteDTO> SearchQuote(SearchParameter searchParameters);
    }
}
