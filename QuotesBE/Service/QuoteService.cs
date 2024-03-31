using Contracts;
using Service.Contracts;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class QuoteService: IQuoteService
    {
        private readonly IRepositoryManager _repository;
        private readonly ILoggerManager _logger;
        public QuoteService(IRepositoryManager repository, ILoggerManager logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public List<QuoteDTO> GetQuote()
        {
            try
            {
                var getQuote = _repository.Quote.GetAllQuote();
                return getQuote;
            }
            catch (Exception ex)
            {
                _logger.LogError("Something went wrong in the " + nameof(GetQuote) + " service method " + ex);
                throw;
            }

        }

        public (List<QuoteDTO> fighters, MetaData metaData) GetAllQuotes(QuoteParameters quoteParameters)
        {
            try
            {
                var fightersWithMetadata = _repository.Quote.GetAllQuote(quoteParameters);

                // var fightersDto = _repository.Fighter.GetAllUFCFighters(fightersWithMetadata);
                return (quote: fightersWithMetadata, metaData: fightersWithMetadata.MetaData);
            }
            catch (Exception ex)
            {
                _logger.LogError("Something went wrong in the " + nameof(GetAllQuotes) + " service method " + ex);
                throw;
            }
        }
    }
}
