using Contracts;
using Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ServiceManager:IServiceManager
    {
        private readonly Lazy<IQuoteService> _quoteService;

        public ServiceManager(IRepositoryManager repositoryManager,
            ILoggerManager logger)
        {
            _quoteService = new Lazy<IQuoteService>(() =>
                   new QuoteService(repositoryManager, logger));
        }

        public IQuoteService QuoteService => _quoteService.Value;
    }
}
