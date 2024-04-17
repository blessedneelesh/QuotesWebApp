using Contracts;
using Repository.Models.DataLayer;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Repository
{
    public class QuotesRepository : IQuotesRepository
    {
        private readonly QuotesContext dbContext;

        public QuotesRepository(QuotesContext quotesContext)
        {
            dbContext = quotesContext;
        }

        public List<QuoteDTO> GetAllQuote()
        {
            // var query = UFCQuery.selectUFCFighterQuery;

            var lst = (from n in dbContext.Quotesses
                       where n.CategoryIdFk == 1
                       select new QuoteDTO   // where n.Division == fighterParameters.Division
                       {
                           quote_id = n.QuoteId,
                           quote_content = n.QuoteContent,
                           author = n.Author,
                           category_id = n.CategoryIdFk
                       }
                     ).ToList();
            return lst;
        }

        public PagedList<QuoteDTO> GetAllQuote(QuoteParameters quoteParameters)
        {
            IQueryable<Quotess> query = dbContext.Quotesses;
            if ((quoteParameters.categoryId).HasValue)
            {
                query = query.Where(div => div.CategoryIdFk == quoteParameters.categoryId);
            }
          /*  if (!string.IsNullOrEmpty(quoteParameters.Country))
            {
                query = query.Where(div => div.Country == quoteParameters.Country);
            }
            if (!string.IsNullOrWhiteSpace(fighterParameters.SearchTerm))
            {
                var lowerCaseTerm = fighterParameters.SearchTerm.ToLower();
                query = query.Where(e => e.Name.ToLower().Contains(lowerCaseTerm));
            }*/

            var lst = query.Select(n =>
             new QuoteDTO
             {
                 quote_id = n.QuoteId,
                 quote_content = n.QuoteContent,
                 author = n.Author,
                 category_id = n.CategoryIdFk
             });
            return PagedList<QuoteDTO>.ToPagedList(lst, quoteParameters.PageNumber, quoteParameters.PageSize);

        }

        public PagedList<QuoteDTO> SearchQuote(SearchParameter searchParameters)
        {
            IQueryable<Quotess> query = dbContext.Quotesses;

            if (!string.IsNullOrWhiteSpace(searchParameters.SearchTerm))
            {
                var lowerCaseTerm = searchParameters.SearchTerm.ToLower();
                query = query.Where(e =>
                    e.QuoteContent.ToLower().Contains(lowerCaseTerm)
                    ||
                    e.Author.ToLower().Contains(lowerCaseTerm));
            }

            var lst = query.Select(n =>
             new QuoteDTO
             {
                 quote_id = n.QuoteId,
                 quote_content = n.QuoteContent,
                 author = n.Author,
                 category_id = n.CategoryIdFk
             });
            return PagedList<QuoteDTO>.ToPagedList(lst, searchParameters.PageNumber, searchParameters.PageSize);

        }


        public List<CategoryDTO> GetCategory()
        {
            var categoryLst = (from n in dbContext.Categories
                               select new CategoryDTO
                               {
                                   category_id = n.CategoryId,
                                   category_name = n.CategoryName
                               }).ToList();
            return categoryLst;
        }

        public PagedList<UserQuoteDTO> GetFavourite(FavouriteParameters favouriteParameters)
        {
            //IQueryable<Quotess> query = dbContext.Quotesses;
            var lst = new List<UserQuoteDTO> { };

            if ((favouriteParameters.category_id).HasValue)
            {
                 lst = (from n in dbContext.UserQuotes
                           join m in dbContext.Quotesses on
                           n.QuoteId equals m.QuoteId
                           where n.UserrId == favouriteParameters.user_id && m.CategoryIdFk==favouriteParameters.category_id
                           select new UserQuoteDTO
                           {
                               userId = n.UserrId,
                               quoteId = n.QuoteId,
                               quoteContent = m.QuoteContent,
                               author=m.Author

                           }).ToList();
            }
            else
            {
                 lst = (from n in dbContext.UserQuotes
                           join m in dbContext.Quotesses on
                           n.QuoteId equals m.QuoteId
                           where n.UserrId == favouriteParameters.user_id
                           select new UserQuoteDTO
                           {
                               userId = n.UserrId,
                               quoteId = n.QuoteId,
                               quoteContent = m.QuoteContent,
                               author=m.Author
                           }).ToList();
            }

         
            return PagedList<UserQuoteDTO>.ToPagedList(lst, favouriteParameters.PageNumber, favouriteParameters.PageSize);
        }

        public void PostFavourite(UserQuoteCreationDTO value)
        {
            UserQuote userQuote = new UserQuote(value.user_id, value.quote_id);
            dbContext.UserQuotes.Add(userQuote);
            dbContext.SaveChanges();
        }

        public void DeleteFavourite(UserQuoteCreationDTO value)
        {
            var selectedQuote = (from quote in dbContext.UserQuotes
                                where quote.UserrId == value.user_id && quote.QuoteId == value.quote_id
                                select quote).Single();

            dbContext.UserQuotes.Remove(selectedQuote);
            dbContext.SaveChanges();
        }
             
    }
}
