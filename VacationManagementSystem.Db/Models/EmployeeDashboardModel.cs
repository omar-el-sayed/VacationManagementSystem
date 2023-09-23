namespace VacationManagementSystem.Db.Models
{
    public class EmployeeDashboardModel
    {
        public int TotalBalanceCount { get; set; }
        public int UsedBalanceCount { get; set; }
        public int RemainedVacationCount { get; set; }
        public int PendingVacationRequestsCount { get; set; }
    }
}
