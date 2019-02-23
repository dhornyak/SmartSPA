namespace SmartSPA.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Mapster;

    using Microsoft.AspNetCore.Mvc;

    using SmartSPA.Data;

    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public UsersController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [Route("api/[controller]")]
        public IEnumerable<UserViewModel> GetUsers()
        {
            return _dbContext.Users.Adapt<IEnumerable<UserViewModel>>();
        }

        [Route("api/[controller]/{id}")]
        public async Task<ObjectResult> GetUser(string id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
                return NotFound(id);

            return new ObjectResult(user.Adapt<UserViewModel>());
        }

        [HttpPut]
        [Route("api/[controller]")]
        public async Task<IActionResult> UpdateUser([FromBody] UserViewModel user)
        {
            if (user == null)
                return BadRequest();

            var userToUpdate = await _dbContext.Users.FindAsync(user.Id);

            if (userToUpdate == null)
                return NotFound();

            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;

            _dbContext.Users.Update(userToUpdate);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
                return NotFound(id);

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}