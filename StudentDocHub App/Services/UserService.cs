using StudentDocHub_App.Model;

namespace StudentDocHub_App.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }
        public int GetStudentIdByUsername(string username)
        {
            // Query the database to find the StudentId associated with the username
            var user = _context.Students.SingleOrDefault(u => u.StudentId == username);

            if (user != null)
            {
                return user.Id; // Return the StudentId if the user exists
            }

            // Return a default value or throw an exception if the user is not found
            return -1;
        }

        public bool IsUserValid(string Studentid, string password)
        {

            var user = _context.Students.SingleOrDefault(u => u.StudentId == Studentid && u.Password == password);

            return user != null;
        }
    }
}
