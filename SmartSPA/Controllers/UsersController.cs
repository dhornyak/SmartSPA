namespace SmartSPA.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using Microsoft.AspNetCore.Mvc;

    public class UsersController : Controller
    {
        private static readonly List<UserViewModel> _users = new List<UserViewModel>
                                                                 {
                                                                     new UserViewModel { Id = 0, FirstName = "Adam", LastName = "West", Email = "adamwest@comedycentral.com", HisIdentifier = "999F757D" },
                                                                     new UserViewModel { Id = 1, FirstName = "Peter", LastName = "Griffin", Email = "petergriffin@comedycentral.com", HisIdentifier = "9DABDE30" },
                                                                     new UserViewModel { Id = 2, FirstName = "Lois", LastName = "Griffin", Email = "loisgriffin@comedycentral.com", HisIdentifier = "71502D48" },
                                                                     new UserViewModel { Id = 3, FirstName = "Stewie", LastName = "Griffin", Email = "stewiegriffin@comedycentral.com", HisIdentifier = "59E8996D" },
                                                                     new UserViewModel { Id = 4, FirstName = "Joe", LastName = "Swanson", Email = "joeswanson@comedycentral.com", HisIdentifier = "92144D47" }
                                                                 };

        [Route("api/[controller]")]
        public IEnumerable<UserViewModel> GetUsers()
        {
            return _users;
        }

        [Route("api/[controller]/{id}")]
        public ObjectResult GetUser(int id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound(id);

            return new ObjectResult(user);
        }

        [HttpPut]
        [Route("api/[controller]/{id}")]
        public IActionResult UpdateUser([FromBody] UserViewModel user)
        {
            if (user == null)
                return BadRequest();

            var userToUpdate = _users.FirstOrDefault(u => u.Id == user.Id);

            if (userToUpdate == null)
                return NotFound();

            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.HisIdentifier = user.HisIdentifier;

            return Ok();
        }

        [HttpDelete]
        [Route("api/[controller]/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound(id);

            _users.Remove(user);

            return Ok();
        }
    }
}