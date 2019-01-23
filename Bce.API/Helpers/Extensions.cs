using Bce.API.Dto;
using Bce.API.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Bce.API.Helpers
{
    public static class Extensions
    {
        public static void AddPagination(this HttpResponse response, 
        int currentPage, int itemsPerPage, int totalItems, int totalPages, string title, string content)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages, title, content);

            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader,
             camelCaseFormatter));
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");
        }
    }
}