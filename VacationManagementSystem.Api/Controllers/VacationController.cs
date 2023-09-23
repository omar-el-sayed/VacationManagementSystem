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
    public class VacationController : ControllerBase
    {
        private readonly IVacationRepo _repo;
        private readonly UserManager<Employee> _userManager;

        public VacationController(IVacationRepo repo, UserManager<Employee> userManager)
        {
            _repo = repo;
            _userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getall")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                return Ok(await _repo.GetAllAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User")]
        [HttpGet("getuservacations")]
        public async Task<IActionResult> GetUserVacations()
        {
            try
            {
                var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (username is null)
                    return BadRequest("Something went wrong");

                var user = await _userManager.FindByEmailAsync(username);

                if (user is null)
                    return BadRequest("Something went wrong");

                return Ok(await _repo.GetUserVacationsAsync(user.Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User")]
        [HttpPost("request/vacation")]
        public async Task<IActionResult> RequestVacationAsync([FromBody] Vacation vacation)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                if (vacation.StartDate > vacation.EndDate)
                    return BadRequest($"End Date must be greater than or equal to Start Date");

                var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (username is null)
                    return BadRequest("Something went wrong");

                var user = await _userManager.FindByEmailAsync(username);

                if (user is null)
                    return BadRequest("Something went wrong");

                var result = await _repo.CheckEmployeeBalance(user.Id);

                if (result > user.Balance)
                    return BadRequest($"Sorry, you exceeded your balance you have available only {user.Balance} days");

                TimeSpan difference = vacation.EndDate - vacation.StartDate;
                int vacationDays = difference.Days + 1;

                if ((vacationDays + result) > user.Balance)
                    return BadRequest($"Sorry, your vacation balance is not enough you have Total {user.Balance} and used {result} + new {vacationDays}");

                vacation.EmployeeId = user.Id;

                var createdVacation = await _repo.RequestVacation(vacation);

                return Created("", createdVacation);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("approve/vacation")]
        public async Task<IActionResult> ApproveVacationRequest([FromBody] int id)
        {
            try
            {
                var vacation = await _repo.GetByIdAsync(id);

                if (vacation is null)
                    return BadRequest("Something went wrong");

                var user = await _userManager.FindByIdAsync(vacation.EmployeeId);

                if (user is null)
                    return BadRequest("Something went wrong");

                var result = await _repo.CheckEmployeeBalance(user.Id);

                if (result > user.Balance)
                    return BadRequest($"Sorry, cannot approve this request employee balance not enough");

                TimeSpan difference = vacation.EndDate - vacation.StartDate;
                int vacationDays = difference.Days + 1;

                if ((vacationDays + result) > user.Balance)
                    return BadRequest($"Sorry, cannot approve this request employee balance not enough");

                vacation.IsApproved = true;
                await _repo.ApproveVacation(vacation);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
