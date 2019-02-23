namespace SmartSPA.Data
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    using SmartSPA.Data.Models;

    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            if (!dbContext.Users.Any())
            {
                CreateUsers(dbContext, roleManager, userManager)
                    .GetAwaiter()
                    .GetResult();
            }
        }

        private static async Task CreateUsers(DbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            const string ROLE_ADMINISTRATOR = "Administrator";
            const string ROLE_REGISTERED_USER = "RegisteredUser";
            
            // Create Roles (if they doesn't exist yet)
            if (!await roleManager.RoleExistsAsync(ROLE_ADMINISTRATOR))
            {
                await roleManager.CreateAsync(new IdentityRole(ROLE_ADMINISTRATOR));
            }

            if (!await roleManager.RoleExistsAsync(ROLE_REGISTERED_USER))
            {
                await roleManager.CreateAsync(new IdentityRole(ROLE_REGISTERED_USER));
            }

            // Create the "Admin" ApplicationUser account
            var userAdmin = new ApplicationUser
                                 {
                                     SecurityStamp = Guid.NewGuid().ToString(),
                                     UserName = "Admin",
                                     Email = "admin@smartspa.com"
                                 };

            // Insert "Admin" into the Database and assign the "Administrator" and "RegisteredUser" roles to him.
            if (await userManager.FindByNameAsync(userAdmin.UserName) == null)
            {
                await userManager.CreateAsync(userAdmin, "Pass4Admin");

                await userManager.AddToRoleAsync(userAdmin, ROLE_REGISTERED_USER);
                await userManager.AddToRoleAsync(userAdmin, ROLE_ADMINISTRATOR);

                // Remove Lockout and E-Mail confirmation.
                userAdmin.EmailConfirmed = true;
                userAdmin.LockoutEnabled = false;
            }

            await dbContext.SaveChangesAsync();
        }
    }
}
