namespace Bce.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public string Title {get;set;}
        public string Content {get;set;}
        public PaginationHeader(int currentPage, int itemsPerPage, int totalItems, int totalPages, string Title, string Content)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
            this.Title = Title;
            this.Content = Content;
        }
    }
}