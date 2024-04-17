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
        (List<QuoteDTO> quote, MetaData metaData) GetAllQuotes(QuoteParameters quoteParameters);
        List<CategoryDTO> GetAllCategory();
        (List<QuoteDTO> quote, MetaData metaData) GetSearchResult(SearchParameter searchParameters);
       (List<UserQuoteDTO> quote, MetaData metaData) GetUserFavourite(FavouriteParameters favouriteParameters);
        UserQuoteDTO CreateUserQuote(UserQuoteCreationDTO value);
        void deleteFavourite(UserQuoteCreationDTO value);
    }
}
