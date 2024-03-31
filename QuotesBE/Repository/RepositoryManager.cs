using Contracts;
using Repository.Models.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryManager:IRepositoryManager
    {
        private readonly QuotesContext _dbContext;
        private readonly Lazy<IQuotesRepository> _quoteRepository;

        public RepositoryManager(QuotesContext dbContext)
        {
            _dbContext = dbContext;
            _quoteRepository = new Lazy<IQuotesRepository>(() => new QuotesRepository(_dbContext));
        }
        public IQuotesRepository Quote => _quoteRepository.Value;
    }
}
