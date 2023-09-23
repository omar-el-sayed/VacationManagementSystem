using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VacationManagementSystem.Db.Models;
using VacationManagementSystem.Db.Repositories;

namespace VacationManagementSystem.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardRepo _repo;
        private readonly IVacationRepo _vacationRepo;
        private readonly UserManager<Employee> _userManager;

        public DashboardController(IDashboardRepo repo, IVacationRepo vacationRepo, UserManager<Employee> userManager)
        {
            _repo = repo;
            _vacationRepo = vacationRepo;
            _userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getcounts")]
        public async Task<IActionResult> GetCountsAsync()
        {
            try
            {
                return Ok(await _repo.GetCountsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User")]
        [HttpGet("getusercounts")]
        public async Task<IActionResult> GetUserCountsAsync()
        {
            try
            {
                var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (username is null)
                    return BadRequest("Something went wrong");

                var user = await _userManager.FindByEmailAsync(username);

                if (user is null)
                    return BadRequest("Something went wrong");

                var result = await _vacationRepo.CheckEmployeeBalance(user.Id);

                var pendingRequests = await _repo.GetEmployeeCountsAsync(user.Id);

                return Ok(new EmployeeDashboardModel
                {
                    TotalBalanceCount = user.Balance,
                    UsedBalanceCount = result,
                    RemainedVacationCount = user.Balance - result,
                    PendingVacationRequestsCount = pendingRequests
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
