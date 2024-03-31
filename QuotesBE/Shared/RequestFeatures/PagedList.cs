using Shared.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.RequestFeatures
{
    public class PagedList<QuoteDTO>:List<QuoteDTO>
    {
        public MetaData MetaData { get; set; }

        public PagedList(List<QuoteDTO> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };

            AddRange(items);
        }
        public static PagedList<QuoteDTO> ToPagedList(IEnumerable<QuoteDTO> source, int pageNumber, int pageSize)
        {
            var count = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedList<QuoteDTO>(items, count, pageNumber, pageSize);
        }
    }
}
