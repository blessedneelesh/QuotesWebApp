using Contracts;
using Repository.Models.DataLayer;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class QuotesRepository: IQuotesRepository
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
                       where n.CategoryIdFk==1
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
            }*/
           /* if (!string.IsNullOrWhiteSpace(fighterParameters.SearchTerm))
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

    }
}
